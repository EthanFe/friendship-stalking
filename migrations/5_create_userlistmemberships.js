module.exports = function migration5(){
  this.createTable('userlistmemberships', function(){
    this.integer('user_id')
    this.integer('userlist_id')
  })
}