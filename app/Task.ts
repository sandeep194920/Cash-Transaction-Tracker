// // app/Task.js

import { ObjectSchema } from 'realm'

import Realm, { BSON } from 'realm'

// export class Task extends Realm.Object {
//   _id
//   description
//   isComplete
//   createdAt

//   static primaryKey = '_id'
//   static schema = {
//     name: 'Task',
//     primaryKey: '_id',
//     properties: {
//       _id: 'uuid',
//       description: 'string',
//       createdAt: {
//         type: 'date',
//         default: new Date(),
//       },
//       isComplete: {
//         type: 'bool',
//         default: false,
//         indexed: true,
//       },
//     },
//   }

//   constructor(realm, description) {
//     console.log('in constructor')
//     super(realm, {
//       _id: new BSON.UUID(),
//       description,
//     })
//   }
// }

// Define your object model
export class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId
  name!: string
  static schema: ObjectSchema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  }
}
