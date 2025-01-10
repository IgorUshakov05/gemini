const { chaenl, montivationOnDay, engWord } = require("../ai/gemini");
const generate = require("../bot/themes");
const sendMessage = async (bot) => {
  try {
    let themas = await generate();
    let gimini = await chaenl(themas);
    let sendMessage = await bot.telegram.sendMessage(
      process.env.CHANEL_ID,
      gimini.message
    );
    console.log(sendMessage);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

const motivation = async (bot) => {
  try {
    let gimini = await montivationOnDay();
    let sendMessage = await bot.telegram.sendMessage(
      process.env.CHANEL_ID,
      gimini.message
    );
    console.log(sendMessage);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

const sendEndWords = async (bot) => {
  try {
    let gimini = await engWord();
    const message = gimini.message.words
      .map(
        (item, index) => `${index + 1}. *${item.word}* — ${item.translation}`
      )
      .join("\n");

    let sendMessage = await bot.telegram.sendMessage(
      process.env.CHANEL_ID_END,
      message,
      { parse_mode: "Markdown" }
    );
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

module.exports = { sendMessage, motivation, sendEndWords };
