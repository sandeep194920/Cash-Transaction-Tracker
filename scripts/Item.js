import Realm from 'realm'
import Item from '../models/ItemSchema'
import { AppConstants } from '../constants'

async function initializeData() {
  const app = new Realm.App({ id: AppConstants.APP_ID })
  const credentials = Realm.Credentials.anonymous()
  await app.logIn(credentials)

  const realm = await Realm.open({
    schema: [Item.schema],
    existingRealmFileBehavior: 'error', // or 'open'
  })

  try {
    realm.write(() => {
      realm.create('Item', {
        name: 'Sample Item 1',
        quantity: 10,
        price_per_item: 20.5,
      })
      realm.create('Item', {
        name: 'Sample Item 2',
        quantity: 5,
        price_per_item: 15.75,
      })
      // Add more items as needed
    })
  } finally {
    realm.close()
    await app.currentUser?.logOut()
  }
}

initializeData().catch(console.error)
