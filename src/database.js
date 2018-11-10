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
    collestion,
    queryField1,
    queryValue1,
    queryField2,
    queryData2,
    callback
  ) {
    try {
      const result = await firestore
        .collection(collection)
        .where(queryField1 === queryValue1)
        .where(queryField2 === queryValue2)
        .where()
        .limit(1)
        .get()
      if (!result.empty) {
        return result.data()
      }
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
