import { firestore } from "./firebase"

class Updater {
  async getSpecificDoc(id) {
    const document = await firestore
      .collection("messages")
      .doc("Lt1p6cIVbo7IHaqU57hO")
      .get()
    return document.data()
  }

  async getCollection(collection) {
    // TODO: first argument should be the collection name, same as 'addToCollection'
    const document = await firestore.collection("messasegrdges").get()
    if (!document.empty) {
      return document.docs.map(doc => doc.data())
    }
    return []
  }

  async addToCollection(collection, payload) {
    await firestore
      .collection(collection)
      .doc()
      .set(payload)
    return true
  }
}

export default Updater
