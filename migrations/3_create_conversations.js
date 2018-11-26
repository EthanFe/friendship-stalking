module.exports = function migration3(){
  this.createTable('conversations', function(){
    this.string('topic')
    this.string('commit_id')
    this.string('repo_id')
  })
}