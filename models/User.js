const Store = require('openrecord/store/postgres')

class User extends Store.BaseModel{
  static definition(){

    this.hasMany('messages', {to: 'user_id', autoSave: true})
    // this is the `definition scope`
    // this.validatesPresenceOf('first_name', 'last_name')
  }
}

module.exports = User