import { firestore } from "./firebase"
const updater = {
  async getCurrentDoc() {
    const document = await firestore
      .collection("locations")
      .doc("I2r3viL9OZ8nvHEo4kct")
      .get()
    return document.data()
  },
  async updateDocument(nextCounter) {
    firestore
      .collection("locations")
      .doc("I2r3viL9OZ8nvHEo4kct")
      .set({
        counter: nextCounter
      })
  },
  async mockUpdateDocument(nextCounter) {
    console.log(nextCounter)
  },
  async start() {
    const { counter: currentCounter } = await this.getCurrentDoc()
    this.interval = setTimeout(() => {
      this.updateDocument(currentCounter + 1)
      this.start()
    }, 3000)
  },
  stop() {
    clearTimeout(this.interval)
  }
}

export default updater
