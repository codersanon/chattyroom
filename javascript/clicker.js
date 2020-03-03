//Variables For Clicker Game
var cClicks = 0;
var points = 0;
var costArray = [100, 1000, 10000, 100000, 1000000, 50];
var levelArray = [0, 0, 0, 0, 0, 0];
var mps = 0;
var clickValue = 1;
var oldPoints = 0;

//Start Game If C Is Clicked 3 Times
function checkGame() {
    if (cClicks == 2) {
        //Change Head
        document.getElementById("head").innerHTML = "<div id='mpscounter' style='text-align:left;display:inline-block;width:100%;padding-left:50px;'>MPS: 0</div><div style='position:fixed; top:0px;width:100%;'>Chatty Clicker</div><div id='scorecounter' style='position:fixed; top:0px;right:50px;left:auto;'>Messages: 0</div>";
        document.getElementById("titletag").innerHTML = "Chatty Clicker"

        //Define Variable
        var main = document.getElementById("main");

        //Update Score Counter
        window.setInterval(function () {
            document.getElementById("scorecounter").innerHTML = "Messages: " + points;
            document.getElementById("mpscounter").innerHTML = "MPS: " + mps;
        }, 5);


        window.setInterval(function () {
            if (points - oldPoints >= 0) {
                mps = points - oldPoints;
            }
            oldPoints = points;
        }, 1000)
        //Change Styles
        document.getElementById("gamestyle").innerHTML = '#main{cursor:pointer;}#drag:hover{;opacity:0.8;transition:all 120ms}#drag:active{opacity:0.7;transform:scale(1.05)}.smalltext{font-size:13px; opacity: 0.7;margin:0;}.fakemessage{max-width:300px; padding-bottom:20px;opacity:0.6; position:fixed; display:block;transition:top 9000ms, opacity 500ms;border-radius:5px 20px 20px 5px;border:1px solid black;}'

        //Clck Function
        main.addEventListener("click", function () {
            points += clickValue;
            GenerateFakeMessage(user);
        });

        //Load Game
        LoadGame();


        //Create Store
        document.getElementById("buttondiv").innerHTML += "<div style='width:150px; position:fixed; left:5px; top:100px;border: 2px solid black;border-radius:10px;' id='shop'><h3 style='text-align:center;' class='headercolor'>Store</h3><div class='button' style='position:static;margin:10px 0;' onclick='DoubleClicks();' id='easterdblbutton' title='*2 Click Effectiveness'>Double Click Value<br><span class='smalltext'>" + costArray[5] + "<br>Level: " + levelArray[5] + "</span></div><div class='button' style='position:static;margin:10px 0;' onclick='BuyBlogger();' id='easterbloggerbutton' title='+1 Message Per Second'>Blogger<br><span class='smalltext'>" + costArray[0] + "<br>Level: " + levelArray[0] + "</span></div><div class='button' style='position:static;margin:10px 0;' onclick='BuyChatter();' id='easterchatterbutton' title='+10 Messages Per Second'>Chatter<br><span class='smalltext'>" + costArray[1] + "<br>Level: " + levelArray[1] + "</span></div><div class='button' style='position:static;margin:10px 0;' onclick='BuySpammer();' id='easterspammerbutton' title='+100 Messages Per Second'>Spammer<br><span class='smalltext'>" + costArray[2] + "<br>Level: " + levelArray[2] + "</span></div><div class='button' style='position:static;margin:10px 0;' onclick='BuySpamBot();' id='easterspambotbutton' title='+1,000 Messages Per Second'>Spam Bot<br><span class='smalltext'>" + costArray[3] + "<br>Level: " + levelArray[3] + "</span></div><div class='button' style='position:static;margin:10px 0;' onclick='BuySpamNetwork();' id='easterspamnetworkbutton' title='+10,000 Messages Per Second'>Spam Network<br><span class='smalltext'>" + costArray[4] + "<br>Level: " + levelArray[4] + "</span></div></div><div style='top:0px;right:5px;left:auto;' class='button' onclick='ResetGame();' title='(Warning) This Will Also Reload The Page'>Reset Game</div>"


        //Save Game
        window.setInterval(SaveGame, 10000);



        cClicks++;
    } else {
        cClicks++;
    }
}

//All The Possible Messages
var randomMessageArray = ["THIS IS FUN", "MESSAGE FOR RESTAGE", "UNO CLUB FOR LIFE", "I believe this is still an under developed product", "why even send messages?", "reeeeee", "Chatty CLicker 11/10", "<img src='pics/unoreversecard.png' width='150'>", "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start", "🤡", "Press F To Pay Respects", "E EEEEEEE", "SANS IN SMASH", "ONLY ___ DAYS TILL I CANT PLAY BORDERLANDS 3", "Subscribe To Pewdiepie", "Subscribe To T-Series", "I am a spam bot. beep.", "My Mommy's Message Mailer Makes Me Mad", "RIP JamesDiePie", "MEME WARS 5 CONFIRMED", "Do not fear a man that spams 1000 memes, instead fear a man that spams a meme 1000 times - Confusious", "666", "Meme Wars Is CRINGE", "Tastes like someone ---- on top of my pizza.", "This chat has been privatized by ENCAP GANG", "<img src='pics/jsonerror.png' width='250'>", "<marquee direction='down' width='150' height='150' behavior='alternate' style='border:solid'><marquee behavior='alternate'><img width='20px' src='pics/emotes/clown.png'></marquee></marquee>"];

//Generates The Messages And Pushes Them Up
function GenerateFakeMessage(sender) {
    //50% Chance Of Message Creation
    if (Math.floor(Math.random() * 100) > 50) {

        //Creates A New Element
        var p = document.getElementById("body");
        var newElement = document.createElement("div");
        newElement.setAttribute('id', "thisid");
        newElement.setAttribute('class', "fakemessage");

        //Position Randomly Calculated
        var randomMessageNumber = Math.floor(Math.random() * 100) + 1 + (messageNumber - 100);
        
        //Message Randomly Decided From Pool And Chatroom
        var randomMessage;
        if (document.getElementsByClassName("mn" + randomMessageNumber).length == 1 && Math.floor(Math.random() * 100) > 10) {
            console.log("Message Number: " + randomMessageNumber);
            randomMessage = document.getElementsByClassName("mn" + randomMessageNumber)[0].children[1].innerHTML;
        } else {
            randomMessage = randomMessageArray[Math.floor(Math.random() * (randomMessageArray.length))];
            console.log("preset");
        }
        var randomtop = Math.floor(Math.random() * 550 + 700) + "px";
        var randomleft = Math.floor(Math.random() * window.innerWidth - 80) + "px";
        var randomzindex = Math.floor(Math.random() * 10 - 20);

        //Apply Positioning
        newElement.style.top = randomtop;
        newElement.style.left = randomleft;
        newElement.style.zIndex = randomzindex;

        //Fill In Elements Content
        newElement.innerHTML = "<div class='name'>" + sender + "</div><p class='text'>" + randomMessage; + "</p>"

        //Make It Appear And Move Upwards
        newElement.style.opacity = 0;
        p.appendChild(newElement);
        window.setTimeout(function () {
            newElement.style.top = "-1500px";
            newElement.style.opacity = 0.8;
        })

        //Delete Message Off Screen
        window.setTimeout(function () {
            newElement.parentNode.removeChild(newElement);
        }, 4500)
    }
}

//Shop Functions
function BuyBlogger() {
    BuyItem(0, 1.1, "easterbloggerbutton", "Blogger", 1);
}

function BuyChatter() {
    BuyItem(1, 1.1, "easterchatterbutton", "Chatter", 10);
}

function BuySpammer() {
    BuyItem(2, 1.1, "easterspammerbutton", "Spammer", 100);
}

function BuySpamBot() {
    BuyItem(3, 1.1, "easterspambotbutton", "Spam Bot", 1000);
}

function BuySpamNetwork() {
    BuyItem(4, 1.1, "easterspamnetworkbutton", "Spam Network", 10000);
}

function DoubleClicks() {
    BuyItem(5, 3, "easterdblbutton", "Double Click Value");
}

//Plug In Function For Buying Upgrades/Items
function BuyItem(cost, increment, elmnt, title, value, level) {
    if (points >= costArray[cost]) {
        points = points - costArray[cost];
        costArray[cost] = Math.round(costArray[cost] * increment);
        levelArray[cost]++;
        document.getElementById(elmnt).innerHTML = title + "<br><span class='smalltext'>" + costArray[cost] + "<br>Level: " + levelArray[cost] + "</span>";

        if (value != null) {
            window.setInterval(function () {
                points += value;
                GenerateFakeMessage(title);

            }, 1000)
        } else {
            clickValue = clickValue * 2
        }

    } else if (cost == undefined) {
        console.log("ERROR - WE HAVE AN UNDEFINED VALUE")
    }
}

//Saves Clicker Game
function SaveGame() {
    var levelString = "";
    for (i = 0; i < levelArray.length; i++) {
        levelString += (levelArray[i] + "/");
    }
    levelString = levelString.slice(0, -1)

    var costString = "";
    for (i = 0; i < costArray.length; i++) {
        costString += (costArray[i] + "/");
    }
    costString = costString.slice(0, -1)

    if (typeof (Storage) != "undefined") {
        localStorage.setItem("HBChatroomClickerLevelArray", levelString);
        localStorage.setItem("HBChatroomClickerCostArray", costString);
        localStorage.setItem("HBChatroomClickerPoints", points);
    }
    //console.log("Saved: " + localStorage.getItem("HBChatroomClickerLevelArray") + " and " + localStorage.getItem("HBChatroomClickerPoints"));
}

//Resets Game Info And Refreshes Page
function ResetGame() {
    var answer = prompt("Are You Sure? This Will Reload The Page. If So Enter 'Yes'")
    if (answer.toLowerCase() == "yes") {
        points = 0;
        costArray = [100, 1000, 10000, 100000, 1000000, 50];
        levelArray = [0, 0, 0, 0, 0, 0];
        localStorage.setItem("HBChatroomClickerLevelArray", null);
        localStorage.setItem("HBChatroomClickerCostArray", null);
        localStorage.setItem("HBChatroomClickerPoints", 0);
        location.reload();
    } else {
        console.log("failed: " + answer)
    }
}

//Loads The Last Game
function LoadGame() {
    var levelArraySaved = localStorage.getItem("HBChatroomClickerLevelArray")
    if (levelArraySaved != null && levelArraySaved != undefined && levelArraySaved != "null") {

        function LoadItem(n, value, title) {
            for (i = 0; i < levelArray[n]; i++) {
                window.setTimeout(function () {
                    window.setInterval(function () {
                        points += value;
                        GenerateFakeMessage(title)
                    }, 1000)
                }, Math.floor(Math.random() * 1000))
            }
        }

        levelArray = localStorage.getItem("HBChatroomClickerLevelArray").split("/");
        costArray = localStorage.getItem("HBChatroomClickerCostArray").split("/");
        LoadItem(0, 1, "Blogger");
        LoadItem(1, 10, "Chatter");
        LoadItem(2, 100, "Spammer");
        LoadItem(3, 1000, "Spam Bot");
        LoadItem(4, 10000, "Spam Network")
        for (i = 0; i < levelArray[5]; i++) {
            clickValue = clickValue * 2;
        }
        points = parseInt(localStorage.getItem("HBChatroomClickerPoints"));
    }
}
