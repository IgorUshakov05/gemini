const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const { say } = require("../ai/gemini");

bot.on("text", async (ctx) => {
  try {
    let message = ctx.message.text;
    let gemini = await say(message);
    console.log(`${ctx.from.username}: ${message}
          Бот: ${gemini.message}
        `);
    await ctx.replyWithHTML(gemini.message);
  } catch (e) {
    console.log(e);
    ctx.reply("Что-то пошло не так!");
  }
});

module.exports = bot;
