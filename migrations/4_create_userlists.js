module.exports = function migration4(){
  this.createTable('userlists', function(){
    this.string('title')
  })
}