require("dotenv").config();
const { Telegraf } = require("telegraf");
// const mongoose = require("mongoose");
// const { save_user } = require("./database/Users");
const bot = new Telegraf(process.env.BOT_TOKEN);
const {
  sendMessage,
  motivation,
  sendEndWords,
} = require("./bot/sendMessageToChanel");
const textBot = require("./bot/text");
const schedule = require("node-schedule");
bot.start(async (ctx) => {
  try {
    let { id, username, first_name } = ctx.from;
    // let saveUser = await save_user({ id, user_name: username, first_name });
    // if (!saveUser.success) {
    // ctx.reply("Произошла ошибка при сохранении пользователя");
    // }
    ctx.reply("Привет!");
  } catch (e) {
    console.log(e);
    ctx.reply("Что-то пошло не так!");
  }
});
async function sendToChanelFunction() {
  let sendToChanel = await sendMessage(bot);
  if (sendToChanel.success) {
    bot.telegram.sendMessage(
      process.env.CREATOR_ID,
      "Сообщение успешно отправлено"
    );
    return;
  }
  bot.telegram.sendMessage(
    process.env.CREATOR_ID,
    `Произошла ошибка при отправке сообщения: ${sendToChanel.message}`
  );
  return;
}
let job = schedule.scheduleJob("0 */3 * * *", function () {
  sendToChanelFunction(bot);
});
sendToChanelFunction(bot);

let job1 = schedule.scheduleJob("0 6 * * *", function () {
  motivation(bot);
  sendEndWords(bot);
});

// Расписание для 12 дня
let job2 = schedule.scheduleJob("0 12 * * *", function () {
  motivation(bot);
});

// Расписание для 20 вечера
let job3 = schedule.scheduleJob("0 17 * * *", function () {
  motivation(bot);
});

// Расписание для 22 ночи
let job4 = schedule.scheduleJob("0 22 * * *", function () {
  motivation(bot);
});
bot.use(textBot);
const start = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, {});
    // console.log("Подключение к базе данных успешно");

    await bot.launch();
    console.log("Бот запущен");
  } catch (err) {
    console.error(
      "Ошибка при подключении к базе данных или запуске бота:",
      err
    );
  }
};

start();
