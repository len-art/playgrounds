import { firestore } from "./firebase"

class Updater {
  async getSpecificDoc(id) {
    const document = await firestore
      .collection("messages")
      .doc("Lt1p6cIVbo7IHaqU57hO")
      .get()
    return document.data()
  }

  async deleteFromCollection(collection, id) {
    try {
      await firestore
        .collection(collection)
        .doc(id)
        .delete()
      return true
    } catch (error) {
      return false
    }
  }

  async getCollection(collection) {
    const document = await firestore.collection(collection).get()
    if (!document.empty) {
      return document.docs.map(doc => doc.data())
    }
    return []
  }

  subscribeTo(collection, callback) {
    const listener = firestore
      .collection(collection)
      .orderBy("ts", "desc")
      .limit(5)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          callback(snapshot.docs.map(doc => doc.data()))
        }
      })
    return listener
  }

  async doubleQueryEquals(
    collection,
    { field: field1, value: value1 },
    { field: field2, value: value2 }
  ) {
    try {
      const result = await firestore
        .collection(collection)
        .where(field1, "==", value1)
        .where(field2, "==", value2)
        .limit(1)
        .get()
      if (!result.empty) {
        return result.docs[0].data()
      }
      return undefined
    } catch (error) {
      console.error(error)
    }
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
