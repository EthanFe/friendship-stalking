module.exports = function migration2(){
  this.createTable('messages', function(){
    this.string('message')
    this.integer('user_id')
    this.integer('conversation_id')
  })
}