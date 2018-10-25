import { firestore } from "./firebase"

class Updater {
  async getSpecificDoc(id) {
    const document = await firestore
      .collection("locations")
      .doc(id)
      .get()
    return document.data()
  }

  getRandomDocId = () =>
    this.documents.length &&
    this.documents[Math.floor(Math.random() * this.documents.length)]

  async updateDocument(id, nextCounter) {
    firestore
      .collection("locations")
      .doc(id)
      .set({
        counter: nextCounter
      })
  }

  async mockUpdateDocument(id, nextCounter) {
    console.log(id, nextCounter)
  }

  async init() {
    const docSnapshot = await firestore.collection("locations").get()
    if (!docSnapshot.empty) {
      this.documents = docSnapshot.docs.map(s => s.id)
      this.start()
    }
  }

  async delayUpdateRandomDoc() {
    this.interval = setTimeout(async () => {
      const id = this.getRandomDocId()
      const { counter: currentCounter } = await this.getSpecificDoc(id)
      this.updateDocument(id, (currentCounter + 1) % 10)
      this.delayUpdateRandomDoc()
    }, 1000)
  }

  start() {
    this.delayUpdateRandomDoc()
  }

  stop() {
    clearTimeout(this.interval)
    return true
  }
}

export default Updater
