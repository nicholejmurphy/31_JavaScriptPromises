let baseURL = "https://deckofcardsapi.com/api/deck";

// Draw A Card
$.getJSON(`${baseURL}/new/draw/`).then((resp) => {
  let { suit, value } = resp.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

// Draw Two Cards From Same Deck
let card1;
$.getJSON(`${baseURL}/new/draw`)
  .then((resp) => {
    let deckId = resp["deck_id"];
    card1 = resp.cards[0];
    return $.getJSON(`${baseURL}/${deckId}/draw`);
  })
  .then((resp) => {
    let card2 = resp.cards[0];
    [card1, card2].forEach(function (card) {
      console.log(`${card.value} of ${card.suit}`);
    });
  });

// Draw Cards From Btn
const $cardDiv = $("#card-div");
const $drawBtn = $("#draw-btn");
let deckId;

$.getJSON(`${baseURL}/new/draw`).then((resp) => {
  deckId = resp["deck_id"];
  $drawBtn.show();
});

$drawBtn.on("click", function () {
  $.getJSON(`${baseURL}/${deckId}/draw`).then((resp) => {
    let cardSrc = resp.cards[0].image;
    let img = document.createElement("img");
    img.src = cardSrc;
    $cardDiv.append(img);
    if (resp.remaining === 0) {
      $drawBtn.hide();
    }
  });
});
