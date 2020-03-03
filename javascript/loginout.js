var user = "TEMPORARY_USER"
var adminList = ["buckybrust", "Korin", "hmccabemusic", "Elmas"]

//As For Account Name And Checks For Duplicates
function login() {
    user = document.getElementById("username").value;

    //If Nothing Was Entered Redo
    if (user == "" || user == undefined) {
        alert("You Must Enter A Username")

        //If They Used Illegal Characters Redo
    } else if (user.includes(";") || user.includes("+") || user.includes("{") || user.includes("}")) {
        alert("Dont Enter ; + or {}")

    } else if (user.length > 20) {
        alert("Username Is Too Long")

        //If All Is Well Continue On
    } else {
        if (adminList.includes(user.toLowerCase())) {
            console.log("Admin Priviledges Enabled");
            GrantAdmin();
        }

        //Changes Login Panel To Theme Panel
        setupThemeMenu();

        loginComplete = true;
        generateBoard();
    }
}

function textToSpeech(words) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];

    // new SpeechSynthesisUtterance object
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1.5;
    utter.pitch = 2;
    utter.text = words;
    utter.voice = english_voice;

    // speak
    window.speechSynthesis.speak(utter);
}
