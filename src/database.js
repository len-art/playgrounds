import { firestore } from "./firebase"

class Database {
  async getSpecificDoc(collection, id) {
    /* gets a specific doc from the collection */
    const document = await firestore
      .collection(collection)
      .doc(id)
      .get()
    return document.data()
  }

  async deleteFromCollection(collection, id) {
    /* deletes a specific document from the collection */
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
    /* gets a whole collection of data
      WARNING: this might be a huge amount of data on the larger collections */
    const document = await firestore.collection(collection).get()
    if (!document.empty) {
      return document.docs.map(doc => doc.data())
    }
    return []
  }

  subscribeTo(collection, callback) {
    /* subscribes to changes on the collection,
      uses callback to return data and returns listener */
    const listener = firestore
      .collection(collection)
      .orderBy("ts", "desc")
      .limit(10)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          callback(snapshot.docs.map(doc => doc.data()))
        }
      })
    return listener
  }

  async doesUsernameExist(username) {
    try {
      const result = await firestore
        .collection("users")
        .where("username", "==", username)
        .limit(1)
        .get()
      if (!result.empty) {
        return result.docs[0].data()
      } else {
        return undefined
      }
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  async doubleQueryEquals(
    collection,
    { field: field1, value: value1 },
    { field: field2, value: value2 }
  ) {
    /* does a dobule query on the collection,
      queries with field and value properties on 2nd and 3rd arguments */
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
      return undefined
    }
  }

  async addToCollection(collection, payload) {
    /* adds a new doc to collection */
    await firestore
      .collection(collection)
      .doc()
      .set(payload)
    return true
  }

  async modifyDocument(collection, id, payload) {
    /* modifies a document in collection
      overwrites same properties and adds new ones, keeps the rest */
    await firestore
      .collection(collection)
      .doc(id)
      .set(payload, { merge: true })
  }
}

export default Database
