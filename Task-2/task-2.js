const fs = require("fs");
const { Transform } = require("stream");

const sourcePath = "source.json";
const destinationPath = "destination.json";

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    let objArray;

    try {
      objArray = JSON.parse(chunk);
    } catch (error) {
      return callback(new Error("Invalid JSON"));
    }

    if (!Array.isArray(objArray)) {
      return callback(new Error("Expected an array of JSON objects"));
    }

    const resultArray = objArray.map((obj) => {
      obj.timestamp = new Date().toISOString();
      return obj;
    });

    const resultString = JSON.stringify(resultArray, null, 2);

    callback(null, resultString);
  },
});

const source = fs.createReadStream(sourcePath, { encoding: "utf-8" });
const destination = fs.createWriteStream(destinationPath);

source
  .pipe(transformStream)
  .pipe(destination)
  .on("finish", () => {
    console.log("File transformation completed.");
  });

source.on("error", (err) => {
  console.error("Error reading the file:", err);
});

destination.on("error", (err) => {
  console.error("Error writing to the file:", err);
});

transformStream.on("error", (err) => {
  console.error("Error during transformation:", err);
});
