export const messageInserter = (messages, userId) => (message) => {
  if (message.authorId !== userId) return [...messages, message];
  const myMessageIndex = messages.findIndex(
    ({ stamp }) => stamp === message.stamp
  );
  if (myMessageIndex !== -1) {
    return [
      ...messages.slice(0, myMessageIndex),
      {
        ...messages[myMessageIndex],
        isSynched: true,
      },
      ...messages.slice(myMessageIndex + 1),
    ];
  } else {
    console.error("multiple users of the same id detected");
    return [...messages, message];
  }
};
