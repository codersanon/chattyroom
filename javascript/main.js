//Checks The Selected Element (For Enter Key Pressing)
document.addEventListener('click', function (event) {
	if (event.target.matches('#input')) {
		messageBoxClicked = true;
	} else {
		messageBoxClicked = false;
	}
})


//Checks For Too Many Messages Sent A Second
window.setInterval(function () {
	if (mesSentInOneSecond > 2) {
		disableMessaging = true;
		alert("You Have Sent Too Many Messages Too Fast. Refresh Page Or Wait 40 Seconds To Send Them Again.")
		window.setTimeout(function () {
			alert("You May Now Send Messages Again")
			disableMessaging = false;
		}, 40000)
	}
	mesSentInOneSecond = 0;
}, 1000)

//Grabs All The Messages From The Database And Loads Them In Each Update
function generateBoard(deleted) {
	if (loginComplete) {

		var messageArea = document.getElementById("messagearea");
		var autoScroll = false;
		var scrollH = 0;

		//If Deleting Messages Then Replace The Deleted Messages In Chatroom
		if (deleted == true && messageNumber != 0) {
			console.log("Redoing Main Area With Deletions")
			newMessageArea = "";
			for (i = 0; i < messageAreaArray.length; i++) {
				if (messageAreaArray[i] == null || messageAreaArray[i] == "" || messageAreaArray[i] == undefined) {

				} else if (deletedMessageArray.includes(i + "")) {
					console.log("Message " + i + " Deleted")
					newMessageArea += "<div class='message' style='padding: 17px 5px'><div class='name'>This Message Has Been Deleted</div></div>"
				} else {
					//console.log("Message " + i + " Added")
					newMessageArea += messageAreaArray[i];
				}
			}
			messageArea.innerHTML = newMessageArea;
		} else {






			if (messageNumber == 0) {
				newMessageArea == "";
				messageArea.innerHTML = "";
				messageAreaArray.length = 0;
				lastMessageNumber = 0;
				console.log("Clear Message Area Messagenumber")
			}


			//Test If User Has The Window Scrolled To Bottom
			if (main.scrollTop == main.scrollHeight - 600) {
				autoScroll = true;
			} else {
				scrollH = main.scrollTop;
			}



			//If You Just Joined In Only Download last 50 Messages
			if (messageNumber - 50 >= lastMessageNumber) {
				lastMessageNumber = messageNumber - 50;
			}

			//Variable Used More Tracking Message Load Number
			var x = 0;
			//Gather All Messages
			console.log("lastMessageNumber + 1: " + (lastMessageNumber + 1) + " messageNumber: " + messageNumber)
			for (i = lastMessageNumber + 1; i <= messageNumber; i++) {
				firestore.doc("Messages/" + i).get().then(function (doc) {
					if (doc && doc.exists) {
						const myData = doc.data();
						var mine = ""
						var msBackColor = mesBackColor;
						var mesID = myData.id;
						if (myData.user.toLowerCase() == user.toLowerCase()) {
							mine = " mine"
							msBackColor = yourMesBackColor;
						}

						//If Loading First Message Clear Message Area
						if (i == 2) {
							newMessageArea = "";

							console.log("Clear Message Area I");
						}

						//Changes Emojis Code To Emojis
						var changedMessage = EmoteCheck(myData.message);

						//Add Delete Button Or Not To The Message
						var trash = "";
						if (mine || admin) {
							trash = "<img class='trash' src='pics/trashcan.png' width='20' onclick='DeleteMessage(this)'>";
						}

						if (blockArray.includes(myData.user.toLowerCase()) == false) {
							//Adds The Message To New Message Area
							newMessageArea += messageAreaArray[mesID] = "<div class='message mn" + mesID + mine + "'><div class='name'>" + myData.user + "</div><p class='text'>" + changedMessage + "</p><p class='time'>" + myData.time + "</p>" + trash + "</div>";

						} else {
							console.log("Blocked Message By " + myData.user);
						}


						//If The Final Message Was Added To The New Message Area
						if (x + 1 == messageNumber - lastMessageNumber) {
							//Replace Current Messages With New Ones
							messageArea.innerHTML = newMessageArea;
							lastMessageNumber = messageNumber;

							//Scrolls To Bottom For New Messages
							if (autoScroll == true) {
								main.scrollTop = main.scrollHeight;
							} else {
								main.scrollTop = scrollH;
							}
						} else {
							//console.log("x is " + x + " while difference is " + (messageNumber - lastMessageNumber) + " lastMessageNumber: " + lastMessageNumber)
							x++;
						}
					} else {
						//If That Was The Final Message
						if (x + 1 == messageNumber - lastMessageNumber) {
							//Replace Current Messages With New Ones
							messageArea.innerHTML = newMessageArea;
							lastMessageNumber = messageNumber;
							console.log("set It Out")
							//Scrolls To Bottom For New Messages
							if (autoScroll == true) {

								main.scrollTop = main.scrollHeight;
							} else {
								main.scrollTop = scrollH;
							}
						}
						x++;
					}
				})
			}
		}
	}
}


//Updates Total Messages And Sends Message To Database
function sendMessage() {
	var input = document.getElementById("input").value;
	var fullDate = getFullDate();


	//Checks For Disabled Messaging
	if (disableMessaging) {
		alert("You Have Been Caught Spamming. Restart Your Page Or Wait 40 Seconds To Be Able To Send Them Again");
	} else {


		//Check To Make Sure Message Is Valid
		if (validateMessage(input) == true) {
			mesSentInOneSecond++;

			//Checks For Spamming Messages
			if (input == lastlastMessage && lastlastMessage == lastMessage) {
				alert("You Cannot Send The Same Message 3 Times In A Row")
			} else {

				//Wipe Input Area
				document.getElementById("input").value = "";

				//Increases Total Message Number
				messageNumber++;

				//Adds In New Message To Database
				firestore.doc("Messages/" + messageNumber).set({
					message: input,
					time: fullDate,
					user: user,
					id: messageNumber
				})

				//Updates Database For Messages Total
				totMesRef.set({
					totalmessages: messageNumber
				}).then(function () {
					console.log("Successfuly Uploaded New Message Number: " + messageNumber);
				}).catch(function (error) {
					console.log("error retrieved: " + error);
				})
				lastlastMessage = lastMessage;
				lastMessage = input;
			}
		}
	}
}

//Allows For Enter To Send Message Or Shift + Enter For New Line
document.addEventListener('keyup', doc_keyUp, false);

function doc_keyUp(e) {
	if (e.keyCode == 13 && !e.shiftKey && messageBoxClicked) {
		sendMessage();
	}
}



//Checks To Make Sure Message Is Valid
function validateMessage(mes) {
	if (mes == "" || mes == undefined || mes == null || mes == " ") {
		alert("You Need To Type In A Message To Send It");
		return false;
	} else if (mes == "\n") {
		alert("You Need To Type In A Message To Send It");
		document.getElementById("input").value = "";
		return false;
	} else if (mes.includes("{") || mes.includes("}") || mes.includes("<script")) {
		alert("No Brackets May Be Typed In");
		return false;
	} else if (mes.length >= 1000) {
		alert("Message Length Exceded Maximum");
		return false;
	} else if (mes.slice(0, 2) == "//") {
		checkCommand(mes);
		return false;
	} else {
		return true;
	}
}





//Gets The Full Date In A String
function getFullDate() {
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var morning = ""

	//Adds A Zero To Minute For Display If Necessary
	if (minute.toString().length == 1) {
		minute = "0" + minute
	}


	//Properly sets Hour and AA/PM
	if (hour > 12) {
		morning = "p"
		hour = hour - 12
	} else if (hour == 12) {
		morning = "p"
	} else if (hour == 0) {
		morning = "a"
		hour = 12;
	} else {
		morning = "a"
	}
	//console.log(month + "/" + day + " " + hour + ":" + minute + morning)
	var fullDate = (month + "/" + day + ", " + hour + ":" + minute + morning)
	return fullDate;
}

//Scrolls Chat Area To Bottom
function scrollBottom() {
	console.log("scrolling to bottom")
	main.scrollTop = main.scrollHeight
}


function DeleteMessage(trashElement) {
	elmnt = trashElement.parentElement;
	var idNum = elmnt.classList[1];
	idNum = parseInt(idNum.slice(2));
	console.log(idNum)
	if (deletedMessageString != "") {
		deletedMessageString += "/"
	}
	deletedMessageString += idNum;
	delMesRef.set({
		deletestring: deletedMessageString
	})
	firestore.doc("Messages/" + idNum).delete()
}




//Emote Check
function EmoteCheck(input) {

	//Lists Of All Emoticon Keywords and File Names
	var emotiKeyWords = ["smile", "frown", "shades", "laugh", "cry", "love", "happy", "meh", "smh", "crazy", "horror", "angry", "livid", "clown", "feelsbadman", "feelsgoodman", "pepeclown", "pepeshocked", "pepeshades", "pepewhy", ]
	var emotiFileName = ["smile.png", "frown.png", "shades.png", "laughing.png", "crying.png", "love.png", "happy.png", "meh.png", "disappoint.png", "crazy.png", "horror.png", "angry.png", "livid.webp", "clown.png", "feelsbadman.png", "feelsgoodman.png", "pepeclown.png", "pepeshocked.png", "pepesunglasses.png", "pepewhy.png"];

	for (i = 0; i < emotiKeyWords.length; i++) {
		while (input.includes("~" + emotiKeyWords[i] + "~")) {
			input = input.replace("~" + emotiKeyWords[i] + "~", "<img width='20px' src='pics/emotes/" + emotiFileName[i] + "'>")
		}
	}
	return input;
}
