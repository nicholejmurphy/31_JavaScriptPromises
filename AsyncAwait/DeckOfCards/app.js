let baseURL = "https://deckofcardsapi.com/api/deck";

// Draw A Card
async function drawCard() {
  let promise = await axios.get(`${baseURL}/new/draw/`);
  let { suit, value } = promise.data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
drawCard();

// Draw Two Cards From Same Deck
async function drawTwoCards() {
  let promise = await axios.get(`${baseURL}/new/draw`);
  let deckId = promise.data["deck_id"];
  let card1 = promise.data.cards[0];
  let promise2 = await axios.get(`${baseURL}/${deckId}/draw`);
  let card2 = promise2.data.cards[0];
  [card1, card2].forEach(function (card) {
    console.log(`${card.value} of ${card.suit}`);
  });
}
drawTwoCards();

// Draw Cards From Btn
const $cardDiv = $("#card-div");
const $drawBtn = $("#draw-btn");
let deckId;

async function getDeckId() {
  let promise = await axios.get(`${baseURL}/new/draw`);
  deckId = promise.data["deck_id"];
  $drawBtn.show();
}

getDeckId();

$drawBtn.on("click", async function () {
  let promise = await axios.get(`${baseURL}/${deckId}/draw`);
  console.log("Cards remaining:", promise.data.remaining);
  let cardSrc = promise.data.cards[0].image;
  let img = document.createElement("img");
  img.src = cardSrc;
  $cardDiv.append(img);
  if (promise.data.remaining === 0) {
    $drawBtn.hide();
    console.log("Deck is now empty");
  }
});
