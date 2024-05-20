const { Telegraf } = require("telegraf");
const TOKEN = "7103239252:AAGWgpUFoZJUCYK4c-8BY8ymy2ZLyMCL1ik";
const bot = new Telegraf(TOKEN);

const web_link = "https://smile-to-earn.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();