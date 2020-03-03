var firebaseConfig = {
    apiKey: "AIzaSyB5Xw9CgqgESVyvcXlfhamjNVyTokJjz5s",
    authDomain: "chatroombackup.firebaseapp.com",
    databaseURL: "https://chatroombackup.firebaseio.com",
    projectId: "chatroombackup",
    storageBucket: "chatroombackup.appspot.com",
    messagingSenderId: "183462014461",
    appId: "1:183462014461:web:49e826d58f35d15fa43d94",
    measurementId: "G-S9SP5259SF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Global Variables
var messageNumber;
var list;
var deletedMessageString = "";
var deletedMessageArray = [];
const totMesRef = firestore.doc("Messages/total");
const delMesRef = firestore.doc("Messages/deleted");
//var storage = firebase.storage();

//var pathRef = storage.ref('Chatroom.zip');
//console.log(pathRef.getDownloadURL() + " is the download url");


var startup = true;
var lastMessageNumber = 0;
var newMessageArea = "";
var messageAreaArray = [];
var lastMessage = "";
var lastlastMessage = "";
var main = document.getElementById("main");
var input = document.getElementById("input");

var mesBackColor = "#f0f0f0";
var yourMesBackColor = "lightgray";
var mesTextColor = "black";
var mesSubTextColor = "darkslategray";
var mesSentInOneSecond = 0;
var disableMessaging = false;
var messageBoxClicked = false;
var loginComplete = false;
var blockArray = [];
var readMessagesAllowed = false;
var theme = localStorage.getItem("HBChatTheme");
var miniMenuOpen = false;
var customTheme = localStorage.getItem("HBChatCustom");

var customBackgroundColor = "";
var customBorderColor = "";
var customMiddleColor = "";
var customTextColor = "";
var customMessageBackColor = "";
var customBackImage = "";
var customSound = new Audio("");




//Make Sure Javascript Knows Chatroom Width/Height
var mainWindow = document.getElementById("main");
var drag = document.getElementById("drag");
mainWindow.style.width = "400px";
mainWindow.style.height = "600px";
drag.style.width = "415px";
drag.style.height = "610px";


if (customTheme != "") {
    customBackgroundColor = customTheme.slice(0, 7)
    customBorderColor = customTheme.slice(7, 14)
    customMiddleColor = customTheme.slice(14, 21)
    customTextColor = customTheme.slice(28, 35)
    customMessageBackColor = customTheme.slice(21, 28);
    customThemeSplit = customTheme.split("|");
    if (customTheme.slice(106) != "") {
        customBackImage = "url(" + customThemeSplit[1] + ")";
    }
} else {
    customBackgroundColor = "white";
    customBorderColor = "black";
    customMiddleColor = "white";
    customTextColor = "black";
    customBackImage = "";
}


//Variable For Message Coloring
var mesBackColor = localStorage.getItem("HBChatMesBackColor");
var yourMesBackColor = localStorage.getItem("HBChatYourMesBackColor");
var mesTextColor = localStorage.getItem("HBChatMesTextColor");
var mesSubTextColor = localStorage.getItem("HBChatMesSubTextColor");


function getRealtimeMessageNumberUpdates() {
    totMesRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log("Message Number Updating: " + myData.totalmessages)
            messageNumber = myData.totalmessages;
            generateBoard();
        }
    })
}
getRealtimeMessageNumberUpdates();

function getRealtimeDeletedUpdates() {
    delMesRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();

            deletedMessageArray = myData.deletestring.split("/");
            deletedMessageString = myData.deletestring;
            console.log("Deleted Messages Updated: " + deletedMessageArray)
            generateBoard(true);
        }
    })
}
getRealtimeDeletedUpdates();
