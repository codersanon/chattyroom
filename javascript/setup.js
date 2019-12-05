var firebaseConfig = {
	apiKey: "AIzaSyChtremM7gsA8E8PSifciwHB4rOGU3jc3E",
	authDomain: "chatroom-6de1e.firebaseapp.com",
	databaseURL: "https://chatroom-6de1e.firebaseio.com",
	projectId: "chatroom-6de1e",
	storageBucket: "chatroom-6de1e.appspot.com",
	messagingSenderId: "219103895626",
	appId: "1:219103895626:web:93c4bc16b997443e"
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


var startup = true;
var lastMessageNumber = 0;
var newMessageArea = "";
var messageAreaArray = [];
var lastMessage = "";
var lastlastMessage = "";
var main = document.getElementById("main")

var mesBackColor = "#f0f0f0";
var yourMesBackColor = "lightgray";
var mesTextColor = "black";
var mesSubTextColor = "darkslategray";
var mesSentInOneSecond = 0;
var disableMessaging = false;
var messageBoxClicked = false;
var loginComplete = false;
var blockArray = [];


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