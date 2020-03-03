var adminList = ["buckybrust", "korin", "hmccabemusic", "elmas"]
var admin = false;

function GrantAdmin() {
    admin = true;
    var deleteAll = document.createElement("A");
    deleteAll.innerHTML = "Delete All";
    deleteAll.onclick = "removeAllMessages();"
    deleteAll.id = "deleteallbutton"
    document.getElementById("myDropdown").appendChild(deleteAll)
    deleteAll.addEventListener("click", removeAllMessages)
    //document.getElementById("buttondiv").innerHTML += '<div onclick="removeAllMessages();" class="button" style="top:112px;right:5px;left:auto;">Clear All Messages</div> '
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

            CallAlertBox("Delete Notice", "Give Time For The Messages To Delete");

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

function checkCommand(command) {

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

    //Theme Command
    if (commandArray[0] == "theme") {
        console.log(parseInt(command.slice(6, 7)))
        if (parseInt(command.slice(6, 7)) != NaN) {
            ThemeStorage(command.slice(6, 7))
        } else {
            CallAlertBox("Command Error", "Not A Number")
        }



        //Command To Delete Messages Individually
    } else if (commandArray[0].toLowerCase() == "delete") {
        if (admin == true) {
            if (commandArray[1] != null && commandArray[1] != undefined && commandArray[1] != "") {
                var elmnt = document.getElementsByClassName("mn" + commandArray[1]);
                trashElmnt = elmnt.children[3];
                document.getElementById("input").value = "";
                DeleteMessage(trashElmnt);
            } else {
                CallAlertBox("Command Error", "You Need To Specify Message Number '//delete (Message number)'")
            }
        } else {
            CallAlertBox("Command Error", "You Do Not Have Permission To Use This Command")
        }



        //Command To Delete Messages By Username
    } else if (commandArray[0].toLowerCase() == "deletebyuser") {
        if (admin == true) {
            if (commandArray[1] != "" && commandArray[1] != undefined && commandArray[1] != null) {
                CallAlertBox("Notice", "Deleting All Messages By The User " + commandArray[1])
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
                CallAlertBox("Command Error", "You Must Include The Username For You To Delete Its Messages")
            }
        } else {
            CallAlertBox("Command Error", "You Do Not Have Permission To Use This Command")
        }
        //Command Help Page
    } else if (commandArray[0] == "help") {
        if (admin) {
            CallAlertBox("Help Menu", '"//delete (Message Number)" - Deletes Message By Its Number\n"//deleteByUser (Username)" - Deletes All Messages By A User\n"//block {add/remove} (username)" - Adds Or Removes User From Your Local Blocked List\n"//block read" - Reads The Blocklist\n"//help" - Shows Commands And Function\n"//speak" - Enables/Disables Message Reading', true);
        } else {
            CallAlertBox("Help Menu", '"//block {add/remove} (username)" - Adds Or Removes User From Your Local Blocked List\n"//block read" - Reads The Blocklist\n"//help" - Shows Commands And Function\n"//speak" - Enables/Disables Message Reading', true);
        }



        //Command For Speach
    } else if (commandArray[0] == "speak") {
        if (readMessagesAllowed == false) {
            var speech = "Speech Reading Enabled"
            // list of languages is probably not loaded, wait for it
            if (window.speechSynthesis.getVoices().length == 0) {
                window.speechSynthesis.addEventListener('voiceschanged', function () {
                    textToSpeech(speech);
                });
            } else {
                // languages list available, no need to wait
                textToSpeech(speech)
            }
            input.value = "";
            readMessagesAllowed = true;
        } else {
            window.speechSynthesis.cancel();
            console.log("Speaking Off")
            textToSpeech("Speech Reading Disabled")
            readMessagesAllowed = false;
            input.value = "";
        }

        //If Command Doesnt Exist
    } else {
        CallAlertBox("Command Error", "Command Is Undefined: " + commandArray[0]);
        console.log(command);
        console.log(commandArray[0]);
    }

}


function CopyChatlog() {
    var string = "";
    for (i = 0; i < messageAreaArray.length; i++) {
        if (messageAreaArray[i] != undefined) {
            var currentString = messageAreaArray[i]

            //Get User Name
            var indexNum = currentString.indexOf("<div class='name'>");
            currentString = currentString.slice(indexNum + 18);
            indexNum = currentString.indexOf("</div>");
            var name = currentString.slice(0, indexNum);


            //Get Post
            indexNum = currentString.indexOf("<p class='text'>");
            currentString = currentString.slice(indexNum + 16);
            indexNum = currentString.indexOf("</p><p class='time'>")
            var post = currentString.slice(0, indexNum)





            string += name + ":\n" + post + "\n"

        }
    }
    console.log(string)
    outputChat = document.getElementById("outputchatlogbox");
    outputChat.innerHTML = string;
    outputChat.select();
    outputChat.setSelectionRange(0, 99999); /*For mobile devices*/
    CallAlertBox("Notice","Text Copied")

    /* Copy the text inside the text field */
    document.execCommand("copy");
}
