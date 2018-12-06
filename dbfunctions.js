const {store, createOrFindBy} = require('./db.js')

async function getConversationsWithMessages(conversations) {
  return await Promise.all(conversations.map(async conversation => {
    const messages = await getMessagesOfConversation(conversation)
    return {
        messages: await Promise.all(messages.map(async message => {
          const user = await message.user
          return {message: message.message, sender: user.name}
        })),
        repoID: await conversation.repo_id
    }
  }))
}

async function getAllConversations() {
  const conversations = await store.Model('Conversation')
  return conversations
}

const getMessagesOfConversation = async (conversation) => {
  return await store.Model('Message').where({conversation_id: conversation.id})
}

const getUserMembershipsOfUser = async (user) => {
  return await store.Model('Userlistmembership').where({user_id: user.id})
}

const getUsersForList = async (list) => {
  const memberships = await store.Model('Userlistmembership').where({userlist_id: list.id})
  const users = await Promise.all(memberships.map(async membership => await membership.user))
  return users
}

const getListWithUsers = async (list) => {
  const users = await getUsersForList(list)
  usernames = users.map(user => user.name)
  return {title: list.title, users: usernames, id: list.id}
}

const getUserListsIncludingUserByName = async (username) => {
  const user = await createOrFindBy("User", {name: username})
  const memberships = await getUserMembershipsOfUser(user)
  const userlists = await Promise.all(memberships.map(async membership => await membership.userlist))
  const listsWithUsers = await Promise.all(userlists.map(async list => getListWithUsers(list)))
  return listsWithUsers
}

const getUsersForListID = async (listID) => {
  const list = await store.Model("Userlist").find(listID)
  return await getUsersForList(list)
}

const getConversationsWithMessagesForRepos = async (repo_ids) => {
  let conversations = await Promise.all(repo_ids.map(async repo_id => await store.Model("Conversation").where({repo_id: repo_id}).first()))
  conversations = conversations.filter(conversation => conversation !== undefined)
  const conversationsWithMessages = await getConversationsWithMessages(conversations)
  return conversationsWithMessages
}

module.exports=  {
  getConversationsWithMessages,
  getUserMembershipsOfUser,
  getUserListsIncludingUserByName,
  getUsersForListID,
  getListWithUsers,
  getConversationsWithMessagesForRepos
}