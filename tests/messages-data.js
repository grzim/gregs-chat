function* authorGenerator() {
  while (true) yield* [2, 1, 1, 1, 2, 2, 1];
}
const author = authorGenerator();
const getAuthor = () => author.next().value;

module.exports = {
  generateMessages: (quantity) =>
    Array(quantity)
      .fill(undefined)
      .map((_, i) => ({
        id: i,
        authorId: getAuthor(),
        text: "some text ".repeat(i + 1),
        time: new Date(2011, 0, 1, 0, i + 1, i),
        isSynched: true,
      })),
};
