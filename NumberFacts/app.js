const url = "http://numbersapi.com";
const factDiv = document.getElementById("number");

// One Fact
let promise = axios.get(`${url}/24/trivia`);
promise.then((resp) => appendFact(resp.data));

// Multiple Facts
let promise2 = axios.get(`${url}/1..4`);
promise2.then((resp) => buildFactLis(resp.data));

// 4 Facts on Favorite Number
let fourNumFactsPromises = [];
for (let i = 0; i < 4; i++) {
  fourNumFactsPromises.push(axios.get(`${url}/24`));
}
Promise.all(fourNumFactsPromises).then((factsArr) =>
  retrieveFactsFromData(factsArr)
);

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
