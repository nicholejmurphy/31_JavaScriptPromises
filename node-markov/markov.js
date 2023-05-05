/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let nextWord = this.words[i + 1] || null;
      if (chain.has(this.words[i])) {
        chain.get(this.words[i]).push(nextWord);
      } else {
        chain.set(this.words[i], [nextWord]);
      }
    }
    this.chain = chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chain.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      let nextKey = this.chain.get(key);
      key = nextKey[Math.floor(Math.random() * nextKey.length)];
    }
    return output.join(" ");
  }
}

module.exports = { MarkovMachine };
