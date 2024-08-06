const { Readable, Writable } = require("stream");

const readableStream = new Readable({
  read(size) {
    this.push("Hello, World!");
    this.push(null);
  },
});

const writeableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Writing: ${chunk.toString()}`);
    setTimeout(callback, 1000);
  },
});

readableStream.pipe(writeableStream);

writeableStream.on("drain", () => {
  console.log("Drain event: Resuming readable stream");
  readableStream.resume();
});

readableStream.on("data", (chunk) => {
  const canContinue = writeableStream.write(chunk);
  if (!canContinue) {
    console.log("Pause readable stream");
    readableStream.pause();
  }
});

readableStream.on("end", () => {
  console.log("No more data to read");
  writeableStream.end();
});

writeableStream.on("finish", () => {
  console.log("All data written");
});
