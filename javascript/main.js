//Checks The Selected Element (For Enter Key Pressing)
document.addEventListener('click', function (event) {
    if (event.target.matches('#input')) {
        messageBoxClicked = true;
    } else {
        messageBoxClicked = false;
    }
    if(event.target.matches('#minimenubutton') == false && miniMenuOpen){
        MiniMenu();
    }
})


//Checks For Too Many Messages Sent A Second
window.setInterval(function () {
    if (mesSentInOneSecond > 2) {
        disableMessaging = true;
        CallAlertBox("You Triggered Spam Protection","You Have Sent Too Many Messages Too Fast. Refresh Page Or Wait 40 Seconds To Send Them Again.")
        window.setTimeout(function () {
            CallAlertBox("FREEDOM!","You May Now Send Messages Again")
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


                        var censor = true;
                        censoredMessage = myData.message;
                        censoredUsername = myData.message;
                        if (censor) {
                            censoredMessage = ProfanityCheck(myData.message)
                            censoredUsername = ProfanityCheck(myData.user)
                        }

                        //Changes Emojis Code To Emojis
                        var changedMessage = EmoteCheck(censoredMessage);

                        changedMessage = TextCommandCheck(changedMessage);

                        //Add Delete Button Or Not To The Message
                        var trash = "";
                        if (mine || admin) {
                            trash = "<img class='trash' src='pics/trashcan.png' width='20' onclick='DeleteMessage(this)'>";
                        }


                        //Adds The Message To New Message Area
                        newMessageArea += messageAreaArray[mesID] = "<div class='message mn" + mesID + mine + "'><div class='name'>" + censoredUsername + "</div><p class='text'>" + changedMessage + "</p><p class='time'>" + myData.time + "</p>" + trash + "</div>";


                        //Read Message If You Should
                        if (readMessagesAllowed) {
                            if (myData.message.length <= 200) {
                                textToSpeech(censoredUsername + " Says " + censoredMessage);
                            } else {
                                textToSpeech(myData.user + " Said Something Too long To Read")
                            }
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
        CallAlertBox("Spam Prevention", "You Have Been Caught Spamming. Restart Your Page Or Wait 40 Seconds To Be Able To Send Them Again");
    } else {


        //Check To Make Sure Message Is Valid
        if (validateMessage(input) == true) {
            mesSentInOneSecond++;

            //Checks For Spamming Messages
            if (input == lastlastMessage && lastlastMessage == lastMessage) {
                CallAlertBox("Spam Prevention", "You Cannot Send The Same Message 3 Times In A Row")
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
        CallAlertBox("Message Error", "You Need To Type In A Message To Send It");
        return false;
    } else if (mes == "\n") {
        CallAlertBox("Message Error", "You Need To Type In A Message To Send It");
        document.getElementById("input").value = "";
        return false;
    } else if (mes.includes("{") || mes.includes("}") || mes.includes("<script")) {
        CallAlertBox("Message Error", "No Brackets May Be Typed In");
        return false;
    } else if (mes.length >= 2000) {
        CallAlertBox("Message Error", "Message Length Exceeded Maximum");
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
            input = input.replace("~" + emotiKeyWords[i] + "~", "<img class='emoticon' src='pics/emotes/" + emotiFileName[i] + "'>")
        }
    }
    return input;
}

//Example of text command /[command]~[text]~ better example /b~hello world~
function TextCommandCheck(OrigInput) {
    var commandsb = ["b", "g", "i", "k"];
    var firstPart = ["<span style='font-weight:bolder'>", "<span style='text-shadow:0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white'>", "<span style='font-style:italic'>", "<a href='"]
    var secondPart = ["</span>", "</span>", "</span>", "'>Krunker Link</a>"]
    var input = OrigInput;

    for (v = 0; v < commandsb.length; v++) {
        while (input.includes("/" + commandsb[v] + "~")) {
            input = input.replace("/" + commandsb[v], firstPart[v])

            var startLocation = input.indexOf("~") + 1;
            var sliced = input.slice(startLocation)
            var begginning = input.slice(0, startLocation)
            console.log(sliced)
            sliced = sliced.replace("~", secondPart[v])

            input = begginning.slice(0, -1) + sliced;

        }
    }
    return input;
}

//Scans Through And Replaces Censored Words With Beep and a Censor Bar
function ProfanityCheck(input) {
    var lowerCaseInput = input.toLowerCase();
    var censorList = ["motherfuck", "fuck", "bitch", "cunt", "pussy", "faggot", "nigger", "nigga", "titty", "titties", "vagina", "asshole", " ass", "dick", "whore", "clit", "shit", "fag", "futa", "bastard", "anus", " cum","biatch","dyke","jizz","slut","twat"];

    for (i = 0; i < censorList.length; i++) {
        while (lowerCaseInput.includes(censorList[i])) {
            var position = lowerCaseInput.indexOf(censorList[i]);
            var length = censorList[i].length;
            var pattern = new RegExp(censorList[i], 'ig')
            if (theme == 6) {
                input = input.replace(pattern, '<span style="background-color:black;color:black;">china</span>');
            } else if(theme == 7){
                input = input.replace(pattern, '<span style="background-color:black;color:black;">walnut</span>')
            } else {
                input = input.replace(pattern, '<span style="background-color:black;color:black;">beep</span>');
            }
            lowerCaseInput = lowerCaseInput.replace(censorList[i], "beep");
            //console.log(lowerCaseInput);
            //console.log("censoring");
        }
    }
    return input;
}

//Opens Or Closes The Mini Chat Menu
function MiniMenu() {
    var dropdown = document.getElementById("myDropdown");
    if(miniMenuOpen){
        dropdown.style.opacity = "1";
        window.setTimeout(function () {
            dropdown.style.opacity = "0";
        })
        window.setTimeout(function () {
            dropdown.style.display = "none"
        }, 150)
        miniMenuOpen = false;
        console.log("closing")
    } else {
        dropdown.style.display = 'block';
        dropdown.style.opacity = "0";
        window.setTimeout(function () {
            dropdown.style.opacity = "1";
        })
        miniMenuOpen = true;
        console.log("opening")
    }
}

//Custom Alert Box 
function CallAlertBox(headerTxt, mainTxt, large){
    var menu = document.getElementById("login");
    var login = document.getElementById("logincover");

    menu.style.width = "300px";
    menu.style.height = "200px";
    menu.style.marginTop = "-100px";
    menu.style.marginLeft = "-150px";
    menu.style.borderRadius = "10px";

    menu.innerHTML = "<h2 class='headercolor' style='text-align:center;margin-top:10px;'>" + headerTxt + "</h2><p style='text-align:center;margin-top:20px;' class='desctext'>" + mainTxt + "</p><div class='button' id='closealertboxbutton' style='position:absolute;margin:auto;clear:both;top:150px;left:75px;' onclick='CloseAlertBox();'>Ok</div>";
        
    if(large){
        menu.style.width = "500px";
        menu.style.marginLeft = "-250px"
        menu.innerHTML = "<h2 class='headercolor' style='text-align:center;margin-top:10px;'>" + headerTxt + "</h2><p style='text-align:center;margin-top:20px;' class='desctext'>" + mainTxt + "</p><div class='button' id='closealertboxbutton' style='position:absolute;margin:auto;clear:both;top:150px;left:175px;' onclick='CloseAlertBox();'>Ok</div>";
    }
    
    
    menu.style.display = "block";
    login.style.display = "block";
}


function CloseAlertBox(){
    setupThemeMenu()
}

