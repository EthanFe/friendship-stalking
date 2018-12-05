const Store = require('openrecord/store/postgres')

class User extends Store.BaseModel{
  static definition(){

    this.hasMany('messages', {to: 'user_id', autoSave: true})
    this.hasMany('userlistmemberships', {to: 'user_id', autoSave: true})
  }
}

module.exports = User