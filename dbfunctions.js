const {store, createOrFindBy} = require('./db.js')

async function getConversationsWithMessages() {
  const conversations = await getAllConversations()
  return await Promise.all(conversations.map(async conversation => {
    const messages = await getMessagesOfConversation(conversation)
    return {
        messages: await Promise.all(messages.map(async message => {
          const user = await message.user
          return {message: message.message, sender: user.name}
        })),
        repoID: conversation.repo_id
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
  return {title: list.title, users: usernames}
}

const getUserListsIncludingUserByName = async (username) => {
  const user = await createOrFindBy("User", {name: username})
  const memberships = await getUserMembershipsOfUser(user)
  const userlists = await Promise.all(memberships.map(async membership => await membership.userlist))
  const listsWithUsers = await Promise.all(userlists.map(async list => getListWithUsers(list)))
  return listsWithUsers
}

module.exports=  {
  getConversationsWithMessages,
  getUserMembershipsOfUser,
  getUserListsIncludingUserByName
}