const socket = io("?botmasterUserId=wantedUserId");
const form = document.getElementById("form");
const textInput = document.getElementById("text-input");
const messages = document.getElementById("messages");

form.onsubmit = event => {
	event.preventDefault();
	if (!textInput.value) {
		return;
	}

	messages.insertAdjacentHTML(
		"beforeend",
		`<li class="user-message">${textInput.value}</li>`
	);

	const update = {
		message: {
			text: textInput.value
		}
	};

	socket.send(update);
	textInput.value = "";
};

socket.on("message", botmasterMessage => {
	var textMessage = botmasterMessage.message.text;

	messages.insertAdjacentHTML(
		"beforeend",
		`<li class="botmaster-message">${textMessage}</li>`
	);
});
