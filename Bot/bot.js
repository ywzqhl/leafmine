const { Telegraf } = require("telegraf");
const TOKEN = "6820674346:AAGXI04qSIvcqeCr_6coRs_rO7tBt1vya48";
const bot = new Telegraf(TOKEN);

const web_link = "https://duangkitty-nine.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
