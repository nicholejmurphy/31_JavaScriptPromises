/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");

const { MarkovMachine } = require("./markov");

function createTextFromFile(source) {
  fs.readFile(source, "utf8", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    }
    const mm = new MarkovMachine(data);
    mm.makeChains();
    console.log(mm.makeText());
  });
}

async function createTextFromURL(source) {
  try {
    const resp = await axios.get(source);
    const mm = new MarkovMachine(resp.data);
    mm.makeChains();
    console.log(mm.makeText());
  } catch (err) {
    console.log("Error fetching source: ", source, "/n Error: ", err);
  }
}

function buildTextFromSource(type, source) {
  if (type === "file") {
    createTextFromFile(source);
  } else if (type === "url") {
    createTextFromURL(source);
  } else {
    console.log("Unable to read the source type: ", type);
  }
}

buildTextFromSource(process.argv[2], process.argv[3]);
