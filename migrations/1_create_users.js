module.exports = function migration1(){
  this.createTable('users', function(){
    this.string('name')
  })
}