const {store, createOrFindBy, startDB} = require('../db.js')

var express = require('express');
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
  const testUser = "Droney"
  repoID = String(repoID)
  
  const conversation = await createOrFindBy("Conversation",
                                      {"repo_id": repoID},
                                      {topic: topic, repo_id: repoID})
  
  const user = await createOrFindBy("User", {name: testUser})

  console.log(conversation.id, user.id)
  console.log(repoID, commentContent, topic, testUser)
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

  const allConversationMessages = await store.Model('Message').where({conversation_id: conversation.id})
  // const allConversationMessages = await conversation.messages
  res.send({message: message, user: user, message: message, conversation: allConversationMessages.map(convoMessage => convoMessage.message)})
})

async function getGithubData() {
  console.log("help")
  const users = [
    {username: "kapham2", id: "369995"},
    {username: "nickluong", id: "286291"},
    {username: "gwatson86", id: "367270"},
    {username: "spraguesy", id: "304978"},
    {username: "HeadyT0pper", id: "316733"},
    {username: "V10LET", id: "371896"},
    {username: "mwilliamszoe", id: "268776"},
    {username: "NaebIis", id: "325649"},
    {username: "sparkbold-git", id: "42003"},
    {username: "chelsme", id: "360601"},
    {username: "EthanFe", id: "318688"},
  ]

  const userData = []

  for (const user of users) {
    userData.push({name: user.username, data: await getGithubDataForUser(user.username)})
  
    console.log(`got data for user ${user.username}`)
  }

  console.log("Finished!")
  return userData
}

async function getGithubDataForUser(username) {

  const apiKey = "e01528635c1a894aad7d4b1972b45697f41df862"
  const page = 1
  
  const response = await fetch(`https://api.github.com/users/${username}/events?page=${page}&access_token=${apiKey}`)
  const json = await response.json()
  return json.filter(event => event.type === "PushEvent")[0]
}

async function setupSockets(game) {

  const http = require('http').Server(express);
  // const io = require('socket.io')(http);

  const server = http.listen(3000, function(){
    console.log('listening on *:3000');
  });
  const io = require('socket.io').listen(server);

  io.on('connection', async (socket) => {
    console.log(`registering for message updates to ${socket.id}`)
    // io.to(socket.id).emit('initialLoadData', game.currentState)

    console.log('a user connected');
    const conversations = await getConversationsWithMessages()
    socket.emit('initialLoadData', {conversations: conversations/*, socketId: socket.id*/})

    socket.on('addComment', function(repoID, commentContent, topic){
      addComment(repoID, commentContent, topic)
      io.emit('commentAdded', {repoID, commentContent})
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  console.log("Socket prepared")
}

async function getConversationsWithMessages() {
  const conversations = await getAllConversations()
  return await Promise.all(conversations.map(async conversation => {
    const messages = await getMessagesOfConversation(conversation)
    return {messages: messages.map(message => message.message), repoID: conversation.repo_id}
  }))
}

async function getAllConversations() {
  const conversations = await store.Model('Conversation')
  return conversations
}

const getMessagesOfConversation = async (conversation) => {
  return await store.Model('Message').where({conversation_id: conversation.id})
}

module.exports = router;

const start = async () => {
  startDB(setupSockets)
}

start()