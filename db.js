const { catchAsync } = require('./funtimes')

const Store = require('openrecord/store/postgres')

const store = new Store({
  host: 'localhost',
  database: 'friendship-stalking',
  autoLoad: true,
  migrations: [
    require('./migrations/1_create_users.js'),
    require('./migrations/2_create_messages.js'),
    require('./migrations/3_create_conversations.js'),
    require('./migrations/4_create_userlists.js'),
    require('./migrations/5_create_userlistmemberships.js'),
    require('./migrations/seed.js'),
  ],
  models: [
    require('./models/User.js'),
    require('./models/Message.js'),
    require('./models/Conversation.js'),
    require('./models/Userlist.js'),
    require('./models/Userlistmembership.js')
  ]
})

const startDB = (callback) => {
  store.ready(async () => {
    console.log("Store is ready.")
    callback()
  })
}

const createOrFindBy = async (model, find_keyvalues, create_keyvalues) => {
  create_keyvalues = create_keyvalues || find_keyvalues

  let instance = await store.Model(model).where(find_keyvalues).first()
  if (instance === undefined) {
    console.log("no existing instance")
    const [error, result] = await catchAsync(store.Model(model).create(create_keyvalues))
    if (error !== null) {
      console.log(error)
    } else {
      instance = result
    }
  }
  return instance
}

module.exports = {store, createOrFindBy, startDB};



// var pgp = require('pg-promise')(/*options*/)
// var db = pgp('postgres://localhost:5432/friendship-stalking')

// db.one('SELECT $1 AS value', 123)
//   .then(function (data) {
//     console.log('DATA:', data.value)
//   })
//   .catch(function (error) {
//     console.log('ERROR:', error)
//   })




// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));


// const conversationSchema = new mongoose.Schema({
//   topic: Number,
//   commitID: Number,
//   repoID: Number,
//   messages: Object,
//   buildings: Object,
//   dimensions: Object
// });

// savedGameSchema.methods = {

//   events: new EventEmitter,

//   ready: function() {
//     this.productionIntervals = []
//     for (const building of this.buildings) {
//       this.startResourceTimer(building)
//     }
//   },

//   get when(){
//     return this.events.on.bind(this.events)
//   },

//   get trigger(){
//     return this.events.emit.bind(this.events)
//   },

//   startResourceTimer: function(building) {
//     const productionData = buildingTypesByName[building.type].production
//     for (const producedResource in productionData) {
//       const resourceData = productionData[producedResource]
//       this.productionIntervals.push(setInterval(
//         () => this.generateResource(resourceData.resource, resourceData.amount * 100, building.position),
//         resourceData.time * 1000))
//     }
//   },

//   generateResource: function(resourceType, amount, origin) {
//     // console.log(`Generating ${amount} ${resourceType} from ${origin.x}, ${origin.y}`)
//     this.resources.find(resource => resource.type === resourceType).amount += amount
//     this.save()
//     this.trigger('resourceGained', {resourceType: resourceType, amount: amount, origin: origin, totalResources: this.resources})
//   },

//   buildBuilding: function(position, buildingType) {
//     // build da building
//     const newBuilding = {position: position, type: buildingType}
//     this.buildings.push(newBuilding)
//     // spend da resources
//     const costs = buildingTypesByName[buildingType].cost
//     for (const spentResource in costs) {
//       this.resources.find(resource => resource.type === spentResource).amount -= costs[spentResource]
//     }

//     this.save()

//     // start producing resources from new building
//     this.startResourceTimer(newBuilding)
//     // update clients
//     this.trigger('buildingBuilt', {buildings: this.buildings, resources: this.resources})
//   }
// } 

// const SavedGame = mongoose.model('savedGame', savedGameSchema);

// module.exports=  {
//   SavedGame
// }