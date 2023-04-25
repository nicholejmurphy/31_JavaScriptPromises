console.log("connected");
const url = "http://numbersapi.com";
const factDiv = document.getElementById("number");

// One Fact
async function oneFact() {
  let promise = await axios.get(`${url}/24/trivia`);
  appendFact(promise.data);
}
oneFact();

// Multiple Facts
async function multipleFacts() {
  let promise2 = await axios.get(`${url}/1..4`);
  buildFactLis(promise2.data);
}
multipleFacts();

// 4 Facts on Favorite Number
async function fourFavNumFacts() {
  let promises = await Promise.all([
    axios.get(`${url}/24`),
    axios.get(`${url}/24`),
    axios.get(`${url}/24`),
    axios.get(`${url}/24`),
  ]);
  retrieveFactsFromData(promises);
}
fourFavNumFacts();

// Create HTML for facts
function appendFact(fact) {
  const factLi = document.createElement("li");
  factLi.innerText = fact;
  factDiv.append(factLi);
}

function buildFactLis(facts) {
  Object.keys(facts).forEach(function (key) {
    appendFact(facts[key]);
  });
}

function retrieveFactsFromData(facts) {
  for (key in facts) {
    appendFact(facts[key].data);
  }
}
