const Store = require('openrecord/store/postgres')

class Userlist extends Store.BaseModel{
  static definition(){

    this.hasMany('userlistmemberships', {to: 'userlist_id', autoSave: true})
  }
}

module.exports = Userlist