export const getSender = (loggedUser, users) => (
  users[0]._id === loggedUser.id ? users[1].fullName : users[0].fullName
);

export const getSenderFull = (loggedUser, users) => (
  users[0]._id === loggedUser.id ? users[1] : users[0]
);

export const isSameSender = (messages, msg, idx, userId) => (
  idx < messages.length - 1
        && (messages[idx + 1].sender._id !== msg.sender._id
            || messages[idx + 1].sender._id === undefined) && (
    messages[idx].sender._id !== userId
  )
);

export const isLastMessage = (messages, idx, userId) => {
  const len = messages.length;
  return (
    idx === len - 1
      && messages[len - 1].sender._id !== userId
      && messages[len - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, msg, idx, userId) => {
  // console.log(i === messages.length - 1);

  if (
    idx < messages.length - 1
      && messages[idx + 1].sender._id === msg.sender._id
      && messages[idx].sender._id !== userId
  ) { return 33; }
  if (
    (idx < messages.length - 1
        && messages[idx + 1].sender._id !== msg.sender._id
        && messages[idx].sender._id !== userId)
      || (idx === messages.length - 1 && messages[idx].sender._id !== userId)
  ) { return 0; }
  return 'auto';
};

export const isSameUser = (messages, msg, idx) => (
  idx > 0 && messages[idx - 1].sender._id === msg.sender._id
);
