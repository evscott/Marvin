const express = require("express");
const app = express();
const Botmaster = require("botmaster");
const SocketioBot = require("botmaster-socket.io");
const port = process.env.PORT || 3000;
const { Wit, log, interactive } = require("node-wit");
const client = new Wit({
	accessToken: "DOBCAP2OLGE3X7H3NC4HKHIL5HBMH77B"
});

app.use(express.static(__dirname + "/public"));

const server = app.listen(port, "0.0.0.0", () =>
	console.log("Example app listening on port %d", port)
);

const botmaster = new Botmaster({
	server
});

const socketioBot = new SocketioBot({ id: "Marvin", server });

botmaster.addBot(socketioBot);

botmaster.use({
	type: "incoming",
	name: "my-middleware",
	controller: (bot, update) => {
		client.message(update.message.text, {}).then(data => {
			return bot.reply(update, JSON.stringify(data));
		});
	}
});

botmaster.on("error", (bot, err) => {
	console.log(err.stack);
});
