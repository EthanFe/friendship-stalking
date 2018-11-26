const Store = require('openrecord/store/postgres')

class Message extends Store.BaseModel{
  static definition(){

    this.belongsTo('user', {model: 'User'})
    this.belongsTo('conversation', {model: 'Conversation'})
    // this is the `definition scope`
    // this.validatesPresenceOf('first_name', 'last_name')
  }
}

module.exports = Message