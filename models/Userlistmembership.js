const Store = require('openrecord/store/postgres')

class Userlistmembership extends Store.BaseModel{
  static definition(){

    this.belongsTo('user', {model: 'User'})
    this.belongsTo('userlist', {model: 'Userlist'})
  }
}

module.exports = Userlistmembership