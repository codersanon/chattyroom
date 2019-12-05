var adminList = ["buckybrust", "korin", "hmccabemusic", "elmas"]
var admin = false;

function GrantAdmin() {
	admin = true;
	document.getElementById("buttondiv").innerHTML += '<div onclick="removeAllMessages();" class="button" style="top:112px;right:5px;left:auto;">Clear All Messages</div> '
}

function removeAllMessages() {
	var answer = prompt("Are You Sure?")
	if (answer.toLowerCase() == "yes") {
		if (user.toLowerCase() != "korin") {
			totMesRef.set({
				totalmessages: 0
			})
			delMesRef.set({
				deletestring: ""
			})
			for (i = 1; i <= messageNumber; i++) {
				firestore.doc("Messages/" + i).delete()
			}

			alert("Give Time For The Messages To Delete");

			//Prank On Gauge To Make Him Think He is Wiping Chat When He Isn't
		} else {
			console.log("korintariko")
			var messageArea = document.getElementById("messagearea")
			newMessageArea == "";
			messageArea.innerHTML = "";
			messageAreaArray.length = 0;
			lastMessageNumber = messageNumber;
			generateBoard(true);
		}
	} else {
		console.log("Incorrect Answer: " + answer);

	}
}


var resizeSize = 0;
var main = document.getElementById("main");

function ResizeChat() {
	console.log(resizeSize);
	console.log(main);
	if (resizeSize == 0) {
		resizeSize++;
		main.style.width = "1200px";
	} else if (resizeSize == 1) {
		resizeSize++;
		main.style.height = "800px";
	} else if (resizeSize == 2) {
		resizeSize = 0;
		main.style.width = "400px";
		main.style.height = "600px";
	}
}

function checkCommand(command) {
	if (admin) {
		command = command.slice(2);
		var commandArray = [];

		//Fix Hitting Enter Preventing Commands
		while (command.includes("\n")) {
			command = command.replace("\n", "");
		}


		if (command.includes(" ")) {
			commandArray = command.split(" ");
		} else {
			commandArray[0] = command;
		}

		//If Command Is Theme
		if (commandArray[0] == "theme") {
			console.log(parseInt(command.slice(6, 7)))
			if (parseInt(command.slice(6, 7)) != NaN) {
				ThemeStorage(command.slice(6, 7))
			} else {
				alert("Not A Number")
			}

			//Command To Delete Messages Individually
		} else if (commandArray[0].toLowerCase() == "delete") {
			console.log(parseInt(command.slice(7)));
			var elmnt = document.getElementsByClassName("mn" + command.slice(7))[0];
			trashElmnt = elmnt.children[3];
			document.getElementById("input").value = "";
			DeleteMessage(trashElmnt);


			//Command To Delete Messages By Username
		} else if (commandArray[0].toLowerCase() == "deletebyuser") {
			if (commandArray[1] != "" && commandArray[1] != undefined && commandArray[1] != null) {
				alert("Deleting All Messages By The User " + commandArray[1])
				document.getElementById("input").value = "";
				for (x = 0; x < document.getElementsByClassName("name").length; x++) {
					var elmntName = document.getElementsByClassName("name")[x];
					var elmnt = elmntName.parentElement;
					if (elmntName.innerHTML.toLowerCase() == commandArray[1].toLowerCase()) {
						console.log("deleting")
						DeleteMessage(elmnt.children[3]);
					}
				}
			} else {
				alert("You Must Include The Username For You To Delete Its Messages")
			}


			//Block Array Command To Add or Remove Blocking List for People Locally
		} else if (commandArray[0].toLowerCase() == "block") {
			if (commandArray[1] != "" && commandArray[1] != null && commandArray[1] != undefined) {
				//if it is Add
				if (commandArray[1].toLowerCase() == "add") {
					if (commandArray[2] != "" && commandArray[2] != null && commandArray[2] != undefined) {
						if (blockArray.includes(commandArray[2]) == false) {
							blockArray.push(commandArray[2].toLowerCase());
							alert(commandArray[2] + " is now blocked")
						} else {
							alert("You Have Already Blocked Them")
						}
					} else {
						alert("You Must Have A Name In The Third Space For The Blockee")
					}

					//If it is Remove
				} else if (commandArray[1].toLowerCase() == "remove") {
					if (blockArray.length == 0 || blockArray == undefined || blockArray == "" || blockArray == null) {
						alert("Block Array is Currently Empty. Do '//block add (username)' to block someone")
					} else {
						if (commandArray[2] != "" && commandArray[2] != null && commandArray[2] != undefined) {
							if (blockArray.includes(commandArray[2].toLowerCase())) {
								function testExist(val) {
									if (val != commandArray[2]) {
										console.log("val: " + val + " commandarray[2]: " + commandArray[2])
										return true;
									} else {
										return false;
									}
								}
								console.log(blockArray + " 1");
								blockArray = blockArray.filter(testExist);
								console.log(blockArray);
								alert("Successfully unblocked " + commandArray[2]);
							} else {
								alert("User Is Not Blocked");
							}
						} else {
							alert("You Must Enter A Username To Unblock");
						}
					}

					//If it is Read
				} else if (commandArray[1].toLowerCase() == "read") {
					if (blockArray.length == 0 || blockArray == undefined || blockArray == "" || blockArray == null) {
						alert("Block Array is Currently Empty. Do '//block add (username)' to block someone")
					} else {
						alert("Blocked: " + blockArray);
					}
				} else {
					alert("The Second Input Must Be 'add', 'remove' or 'read'");
				}
			} else {
				alert("You Must Have A Second Input, 'add', 'remove', or 'read'");
			}









		} else {
			alert("Command Is Undefined: " + commandArray[0])
			console.log(command);
			console.log(commandArray[0]);
		}

	} else {
		alert("You Do Not Have Admin Access To Send Commands");
	}
}
