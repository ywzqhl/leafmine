const { Telegraf } = require("telegraf");
const TOKEN = "7041763974:AAHRVMVsFza1HneXfKDifYY2or2ydoX93S8";
const bot = new Telegraf(TOKEN);

const web_link = "https://leafmine.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();