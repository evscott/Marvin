const express = require("express");
const app = express();
const Botmaster = require("botmaster");
const SocketioBot = require("botmaster-socket.io");
const port = process.env.PORT || 3000;
const apiai = require("apiai");
const client = apiai("f50331d79d79462daa086007759cd014");

app.use(express.static(__dirname + "/public"));

const server = app.listen(port, "0.0.0.0", () =>
	console.log("Example app listening on port %d", port)
);

const botmaster = new Botmaster({
	server
});

const socketioBot = new SocketioBot({ id: "Marvin", server });

botmaster.addBot(socketioBot);

let query;

botmaster.use({
	type: "incoming",
	name: "my-middleware for Marvin",
	controller: (bot, update) => {
		query = client.textRequest(update.message.text, {
			sessionId: "1"
		});

		query.on("response", response => {
			if (response.result.fulfillment.speech != "") {
				return bot.reply(update, response.result.fulfillment.speech);
			}
		});

		query.end();
	}
});

botmaster.on("error", (bot, err) => {
	console.log(err.stack);
});
