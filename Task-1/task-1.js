const fs = require("fs");

const sourcePath = "source.txt";
const destinationPath = "destination.txt";

const source = fs.createReadStream(sourcePath);
const destination = fs.createWriteStream(destinationPath);

source.on("data", function (chunk) {
  destination.write(chunk);
});

source.on("end", function () {
  destination.end();
  console.log("Finished writing to the file.");
});

source.on("error", (err) => {
  console.error("An error occurred while reading the file:", err.message);
});

destination.on("error", (err) => {
  console.error("An error occurred while writing to the file:", err.message);
});
