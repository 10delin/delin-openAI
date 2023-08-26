export const saveDataInLocalStorage = (chatData, setStorageItem) => {
  const previousChat = localStorage.getItem("chat");
  const chatArray = previousChat ? JSON.parse(previousChat) : [];

  const newChatArray = chatArray.map((item) => {
    if (item.length > 0 && item[0].id === chatData[0].id) {
      return chatData;
    }
    return item;
  });

  if (!newChatArray.some((item) => item[0].id === chatData[0].id)) {
    newChatArray.push(chatData);
  }

  const updatedChat = JSON.stringify(newChatArray);
  setStorageItem(updatedChat);
  localStorage.setItem("chat", updatedChat);
};
