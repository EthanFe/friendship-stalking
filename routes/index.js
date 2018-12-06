const {store, createOrFindBy, startDB} = require('../db.js')
const {getConversationsWithMessages,
        getUserMembershipsOfUser,
        getUserListsIncludingUserByName,
        getUsersForListID,
        getListWithUsers,
        getConversationsWithMessagesForRepos} = require('../dbfunctions.js')

var express = require('express');
const app = express()
app.use('/', express.static('build'))

var router = express.Router();

const fetch = require('node-fetch');

const { catchAsync } = require('../funtimes')

router.get('/', async function(req, res, next) {

  const conversations = await store.Model('Conversation')
  // console.log(conversations)
  res.send(JSON.stringify(conversations))

  // const userData = await getGithubData()
  // res.send(userData)
});

router.post('/addComment', async function (req, res) {
  let {repoID, commentContent, topic} = req.body
  addComment(repoID, commentContent, topic)

  const allConversationMessages = await store.Model('Message').where({conversation_id: conversation.id})
  // const allConversationMessages = await conversation.messages
  res.send({message: message, user: user, message: message, conversation: allConversationMessages.map(convoMessage => convoMessage.message)})
})

// const defaultUsers = [
//   {username: "kapham2", id: "369995"},
//   {username: "nickluong", id: "286291"},
//   {username: "gwatson86", id: "367270"},
//   {username: "spraguesy", id: "304978"},
//   // {username: "HeadyT0pper", id: "316733"},
//   {username: "jstricklin89"},
//   {username: "V10LET", id: "371896"},
//   {username: "mwilliamszoe", id: "268776"},
//   {username: "NaebIis", id: "325649"},
//   {username: "sparkbold-git", id: "42003"},
//   {username: "chelsme", id: "360601"},
//   {username: "EthanFe", id: "318688"},
// ]

async function getGithubData(users, accessToken) {
  console.log(`Fetching github data for ${users.length} users`)
  const userData = await Promise.all(users.map(user => getGithubDataForUser(user.name, accessToken)))
  console.log("Finished fetching github data!")
  return userData
}

async function getGithubDataForUser(username, accessToken) {
  let page = 1
  let event = null
  // this will break after a few pages because of github's pagination restrictions. should probably make it more resilient
  while (event === null) {
    const response = await fetch(`https://api.github.com/users/${username}/events?page=${page}&access_token=${accessToken}`)
    const json = await response.json()
    console.log(json)
    const pushEvents = json.filter(event => event.type === "PushEvent")
    if (pushEvents.length > 0)
      event = pushEvents[0]
    else
      page++
  }
  return {name: username, data: event}
}

async function addComment(repoID, commitURL, commentContent, topic, username, accessToken) {
  const testUser = username || "DefaultUser"
  repoID = String(repoID)
  
  const conversation = await createOrFindBy("Conversation",
                                      {"repo_id": repoID},
                                      {topic: topic, repo_id: repoID})
  
  const user = await createOrFindBy("User", {name: testUser})
  
  const [error, message] = await catchAsync(store.Model('Message').create({
    message: commentContent,
    user_id: user.id,
    conversation_id: conversation.id
  }))
  if (error !== null) {
    console.log(error)
  } else {
    conversation.messages.add(message)
    await conversation.save()
    user.messages.add(message)
    await user.save()
    console.log("successfully created message")
  }

  postCommentToGithub(commitURL, commentContent, accessToken)

  return message
}

function postCommentToGithub(commitURL, commentContent, accessToken) {
  const requestURL = commitURL.replace("https://github.com", "https://api.github.com/repos")
  .replace("/commit/", "/commits/") + "/comments"
  fetch(
    requestURL,
    {
      method: 'post',
      headers: {
        Authorization: `token ${accessToken}`
      },
      body: JSON.stringify({
        body: commentContent
      })
    }
  )
}

async function setupSockets(game) {

  const http = require('http').Server(app);
  // const io = require('socket.io')(http);

  const port = 80
  const server = http.listen(port, function(){
    console.log(`listening on *:${port}`);
  });
  const io = require('socket.io').listen(server);

  io.on('connection', async (socket) => {
    console.log(`registering for message updates to ${socket.id}`)
    // io.to(socket.id).emit('initialLoadData', game.currentState)

    console.log('a user connected');

    socket.on('addComment', async function({repoID, commitURL, commentContent, topic, username, accessToken}){
      const message = await addComment(repoID, commitURL, commentContent, topic, username, accessToken)
      const user = await message.user
      io.emit('commentAdded', {repoID, commentContent, username: user.name})
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on("authWithGithub", async (data) => {
      authWithGithub(data, socket)
    })

    // socket.on("requestRepoData", async () => {
    //   const conversations = await getConversationsWithMessages()
    //   const userData = await getGithubData()
    //   socket.emit('repoData', {users: userData, conversations: conversations})
    // })

    socket.on("createNewList", ({name, username}) => {
      createUserList(name, username, socket)
    })

    socket.on("requestReposForList", async ({listID, accessToken}) => {
      const users = await getUsersForListID(listID)
      const userData = await getGithubData(users, accessToken)
      const repo_ids = userData.map(user => user.data.repo.id)
      const conversations = await getConversationsWithMessagesForRepos(repo_ids)
      socket.emit("userDataForDisplay", {userData, conversations})
    })

    socket.on("addUserToList", async ({listID, username, accessToken}) => {
      const usernameIsValid = await userIsValidGithubName(username, accessToken)
      if (usernameIsValid) {
        const user = await createOrFindBy("User", {name: username})
        const existingMemberships = await store.Model("Userlistmembership").where({user_id: user.id, userlist_id: listID})
        const existingMembership = await existingMemberships.length
        if (!existingMembership) {
          const list = await store.Model("Userlist").find(listID)
          addUserToList(list, user)
          io.emit("userAddedToList", {listID, username})
        } else {
          socket.emit("addUserToListResponse", {message: "user already present"})
        }
      } else {
        socket.emit("addUserToListResponse", {message: "user not github member"})
      }
    })

    socket.on("requestDataForUserlist", async ({listID}) => {
      const list = await store.Model("Userlist").find(listID)
      const listData = await getListWithUsers(list)
      socket.emit("dataForUserlistResponse", {listData})
    })

    // socket.on("logout", ({accessToken}) => {
    //   removeAuthWithGithub(accessToken)
    // })
  });

  console.log("Socket is ready.")
}

const createUserList = async (listName, username, socket) => {
  const user = await createOrFindBy("User", {name: username})

  const [error, newList] = await catchAsync(store.Model("userlist").create({title: listName}))
  if (error !== null) {
    console.error(error)
  } else {
    await addUserToList(newList, user)
    const listData = await getListWithUsers(newList)
    socket.emit("createdNewList", {listData})

    // const thisUsersMemberships = await getUserMembershipsOfUser(user)
    // console.log("made a new list")
    // console.log(thisUsersMemberships.length)
    // console.log(newList.userlistmemberships.length)
    // console.log(listMembership)
  }
}

const addUserToList = async (list, user) => {
  const [error, listMembership] = await catchAsync(store.Model("userlistmembership").create())
  list.userlistmemberships.add(listMembership)
  await list.save()
  user.userlistmemberships.add(listMembership)
  await user.save()
}

const userIsValidGithubName = async (username, accessToken) => {
  const result = await fetch(`https://api.github.com/users/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept:'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const userData = (await result.json())
  return userData.login !== undefined
}

// const removeAuthWithGithub = (accessToken) => {
//   const response = await fetch(`https://github.com/authorizations/${accessToken}`, {
//     method: 'DELETE',
//     body: JSON.stringify({
//       client_id: clientID,
//       client_secret: clientSecret,
//       code: accessCode
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept:'application/json'
//     }
//   })
//   console.log(response)
// }

const authWithGithub = async (data, socket) => {
  // this is some pretty janky code flow.
  let accessToken = data.token || await authWithGithubUsingCode(data.code)
  let basicUserData = await fetchUserData(accessToken)

  if (basicUserData.message === "Bad credentials") {
    accessToken = await authWithGithubUsingCode(data.code)
    basicUserData = await fetchUserData(accessToken)
  }

  if (basicUserData.message === "Bad credentials") {
    socket.emit("authenticationFailure")
  } else {
    // dig stuff out of the db to send to users now that they're connected and logged in
    // jk. do this on list selection/display instead
    // const conversations = await getConversationsWithMessages()
    // const userData = await getGithubData()
    const userLists = await getUserListsIncludingUserByName(basicUserData.login)
    // socket.emit("authenticationSuccess", {loginData: {accessToken, basicUserData},
    //                                       reposData: {users: userData, conversations: conversations},
    //                                       userlistsData: userLists})
    socket.emit("authenticationSuccess", {
                                          loginData: {accessToken, basicUserData}, 
                                          userlistsData: userLists
                                        })
  }
}

authWithGithubUsingCode = async (code) => {
  const clientID = "37ec24a03b485597e01b"
  const clientSecret = process.env.GITHUB_SECRET_ID
  console.log("Authenticating with access code: " + code)
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: 'POST',
    body: JSON.stringify({
      client_id: clientID,
      client_secret: clientSecret,
      code: code
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept:'application/json'
    }
  })
  return (await response.json()).access_token
}

fetchUserData = async (token) => {
  // get basic info on the user from github
  const result = await fetch("https://api.github.com/user", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept:'application/json',
      Authorization:`Bearer ${token}`
    }
  })
  return await result.json()
}

module.exports = router;

const start = async () => {
  startDB(setupSockets)
}

start()