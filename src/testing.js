/* quasi worker */
const worker = payload => {
  /* does work and sends message back */
  const { id, type, data } = payload;
  setTimeout(
    () => receiveMessage({ id, type, payload: data }),
    Math.random() * 2000
  );
};

/* current requests */
let requests = [];
/* send message to worker */
const sendMessage = data => {
  const id = Math.round(Math.random() * 100);
  const callback = new Promise(res => {
    requests.push({ id, res });
  });
  worker({ id, type: "foo", data });
  return callback;
};

/* receive message from worker */
const receiveMessage = ({ id, type, payload }) => {
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) {
    console.log(index, "not found");
    return;
  }
  requests[index].res(payload);
  requests = requests.filter((_, i) => i !== index);
};

/* tests */

Array.from(new Array(50), (_, i) => ({ i })).reduce(async (acc, val) => {
  await acc;
  Array.from(new Array(5), (_, i) =>
    sendMessage({ val, a: i }).then(f => console.log(f))
  );
  return new Promise(res => setTimeout(res, Math.random() * 300));
}, Promise.resolve());

Array.from(new Array(5), (_, i) =>
  sendMessage({ a: i }).then(f => console.log(f))
);

Promise.all(Array.from(new Array(5), (_, i) => sendMessage({ a: i }))).then(f =>
  console.log(f)
);
