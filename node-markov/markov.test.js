const { MarkovMachine } = require("./markov");

describe("Testing Markov Machine", function () {
  test("Make Chains creates a map", function () {
    let mm = new MarkovMachine("the cat in the hat");
    mm.makeChains();
    expect(mm.chain.size).toEqual(4);
  });
  test("Make text creates text output", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let story = mm.makeText(4);
    expect(story.split().length).toBeLessThanOrEqual(4);
  });
});
