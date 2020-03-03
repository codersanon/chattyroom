ThemeStorage(localStorage.getItem("HBChatTheme"));


//Changes Login Panel To Theme Panel
function setupThemeMenu() {
    var menu = document.getElementById("login");
    var login = document.getElementById("logincover");

    menu.style.width = "500px";
    menu.style.height = "520px";
    menu.style.marginTop = "-250px";
    menu.style.marginLeft = "-250px";
    menu.style.borderRadius = "10px";

    login.style.display = "none";
    menu.style.display = "none";

    //The Theme Buttons Separated For Styling
    //Light Classic
    tButton1 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(0)"><div class="themesub" style="background-color:white; border-color:black; color:black">Light<br>Classic</div></div>';

    //Night Blue
    tButton2 = '<div class="themebutton" style="background-color:#2b2b2b; color:black" onclick="ThemeStorage(1)"><div class="themesub" style="background-color:#212121; border-color:#008db8; color:white">Night<br>Blue</div></div>';

    //Night Orange
    tButton3 = '<div class="themebutton" style="background-color:#2b2b2b; color:black" onclick="ThemeStorage(2)"><div class="themesub" style="background-color:#212121; border-color:#e77928; color:white">Night<br>Orange</div></div>';

    //Night Shamrock
    tButton4 = '<div class="themebutton" style="background-color:#2b2b2b; color:black" onclick="ThemeStorage(3)"><div class="themesub" style="background-color:#212121; border-color:#34d280; color:#34d280">Night<br>Sham</div></div>';

    //Night Rave
    tButton5 = '<div class="themebutton" style="background-color:#2b2b2b; color:black" onclick="ThemeStorage(4)"><div class="themesub" style="background-color:#212121; border-color:#ff4af6; color:#ff4af6">Night<br>Rave</div></div>';

    //Windows XP
    tButton6 = '<div class="themebutton" style="background:url(pics/windowsxpbackground.jpg);background-size: cover; color:black" onclick="ThemeStorage(5)"><div class="themesub" style="background-color:white; border-color:; height: 36px; color:blue"><img src="pics/windowsxplogo.jpg" style="width:70%;"></div></div>';

    //Donald Trump
    tButton7 = '<div class="themebutton" style="background:url(pics/trumpbackground.jpg);background-repeat: no-repeat; background-size:270%; background-position: 70% 0%; color:black" onclick="ThemeStorage(6)"><div class="themesub" style="background-color:rgba(0,0,0,0.4); border-color:#bf0a30; color:white">Donald<br>Trump</div></div>';

    //Walnut
    tButton8 = '<div class="themebutton" style="background:url(pics/walnut.jpeg);background-repeat: no-repeat; background-size:270%; background-position: 70% 0%; color:black" onclick="ThemeStorage(7)"><div class="themesub" style="background-color:#d09664; border-color:#653418; color:white">Walnut<br>(Shawn)</div></div>';

    //Empty
    tButton9 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(8)"><div class="themesub" style="background-color:white; border-color:black; color:black">TBD<br>TBD</div></div>';

    //Empty
    tButton10 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(9)"><div class="themesub" style="background-color:white; border-color:black; color:black">TBD<br>TBD</div></div>';

    //Empty
    tButton11 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(10)"><div class="themesub" style="background-color:white; border-color:black; color:black">TBD<br>TBD</div></div>';

    //Custom
    tButton12 = '<div class="themebutton" style="background-color:' + customBackgroundColor + '; color:' + customTextColor + ';background-image:' + customBackImage + ';background-repeat: no-repeat; background-size:270%; background-position: 70% 0%;" onclick="SetupThemeBuilder();"><div class="themesub" style="background-color:' + customMiddleColor + '; border-color:' + customBorderColor + ';"><p style="background-color:' + customMessageBackColor + '">Custom<br>Theme</p></div></div>';



    //The Menu HTML
    menu.innerHTML = '<h2 id="themeheader" style="text-align: center;font-size:35px;margin-top:10px;font-family:sans-serif;">Select Your Theme</h2>' + tButton1 + tButton2 + tButton3 + tButton4 + tButton5 + tButton6 + tButton7 + tButton8 + tButton9 + tButton10 + tButton11 + tButton12 + '<div class="button" id="closemenubutton" style="position:static;margin:auto;clear:both;" onclick="CloseThemeMenu();">Continue</div>';
}

function SetupThemeBuilder() {
    var menu = document.getElementById("login");
    var login = document.getElementById("logincover");

    menu.style.width = "500px";
    menu.style.height = "670px";
    menu.style.marginTop = "-335px";
    menu.style.marginLeft = "-250px";
    menu.style.borderRadius = "10px";

    //Setup Menu Builder Buttons
    var option1 = '<div class="creatorbox"><p class="desctext">Background</p><input id="backcolorchoice" type="color" value="#ffffff"></div>';
    var option2 = '<div class="creatorbox"><p class="desctext">Border</p><input id="bordercolorchoice" type="color" value="#000000"></div>';
    var option3 = '<div class="creatorbox"><p class="desctext">Chat Window</p><input id="windowcolorchoice" type="color" value="#ffffff"></div>';

    var option4 = '<div class="creatorbox"><p class="desctext">Message Background</p><input id="messagebackgroundcolorchoice" type="color" value="#f2f2f2"></div>';
    var option5 = '<div class="creatorbox"><p class="desctext">Message Text</p><input id="messagetextcolorchoice" type="color" value="#000000"></div>';
    var option6 = '<div class="creatorbox"><p class="desctext">Message Subtext</p><input id="messagesubtextcolorchoice" type="color" value="#2f4f4f"></div>';

    var option7 = '<div class="creatorbox"><p class="desctext">Header Background</p><input id="headerbackgroundcolorchoice" type="color" value="#ffffff"></div>';
    var option8 = '<div class="creatorbox"><p class="desctext">Header Text</p><input id="headertextcolorchoice" type="color" value="#000000"></div>';
    var option9 = '<div class="creatorbox"><p class="desctext">Menu Text Background</p><input id="menuheaderbackgroundcolorchoice" type="color" value="#ffffff"></div>';

    var option10 = '<div class="creatorbox"><p class="desctext">Input Background</p><input id="inputbackgroundcolorchoice" type="color" value="#ffffff"></div>';
    var option11 = '<div class="creatorbox"><p class="desctext">Input Text</p><input id="inputtextcolorchoice" type="color" value="#000000"></div>';
    var option12 = '<div class="creatorbox"><p class="desctext">Input Button</p><input id="inputbuttoncolorchoice" type="color" value="#ff0000"></div>';

    var option13 = '<div class="creatorbox"><p class="desctext">Button Background</p><input id="buttonbackgroundcolorchoice" type="color" value="#ffffff"></div>';
    var option14 = '<div class="creatorbox"><p class="desctext">Button Text</p><input id="buttontextcolorchoice" type="color" value="#000000"></div>';
    var option15 = '<div class="creatorbox"><p class="desctext">Button Border</p><input id="buttonbordercolorchoice" type="color" value="#000000"></div>';

    var option16 = "<div style='display:block;float:left;width:165px;text-align:center;margin-left:2px;margin-top:10px;'><p class='desctext'>Background URL</p><input type='text' id='backgroundnamechoice' style='margin-bottom:10px;height:20px;width:150px;padding-left:6px;' class='inputarea'></div>";

    var option17 = "<div style='display:block;float:left;width:165px;text-align:center;margin-top:10px;'><p class='desctext'>Theme Name</p><input type='text' id='themenamechoice' style='margin-bottom:10px;height:20px;width:150px;padding-left:6px;text-align:center;' class='inputarea' maxlength='15'></div>";

    var option18 = "<div style='display:block;float:left;width:165px;text-align:center;margin-top:10px;'><p class='desctext'>Audio URL</p><input type='text' id='audiochoice' style='margin-bottom:10px;height:20px;width:150px;padding-left:6px;' class='inputarea'></div>";

    var copydiv = "<div style='display:block;float:left;width:230px;height:35px;text-align:center;margin-left:10px;'><div class='button' id='copysharingbutton' style='margin:10px 0;position:static;height: 18px;width:230px;padding: 10px 0;' onclick='CopySharingCode()'>Copy Sharing Code</div><input id='outputcodebox' style='display:block;margin:auto; opacity:0;cursor:default;height:5px;width:5px;' value='hi'></div>";


    var insert = option1 + option2 + option3 + option4 + option5 + option6 + option7 + option8 + option9 + option10 + option11 + option12 + option13 + option14 + option15 + option16 + option17 + option18 + copydiv;

    var makeyourown = "<h3 class='themehead headercolor' style='text-align:center;margin-top:0px;padding-bottom:4px;'>Make Your Own</h3>" + insert + '<div class="button" id="update" style="position:static;width:230px;float:left;display:block;height:18px;padding:10px 0;margin:10px 0 20px 0;margin-left:16px;" onclick="GenerateCustomTheme();">Apply</div>';

    var usecode = "<h3 class='themehead headercolor' style='text-align:center;padding:5px 0;margin:20px 0 10px 0;clear:both;'>Use A Code</h3><input id='applycodeinput' class='inputarea' style='width:250px;height:25px;margin:auto;display:block;padding:0 5px;'><div class='button' id='update' style='position:static;margin:10px auto;clear:both;width:80px;' onclick='ApplyCode();'>Apply Code</div>";

    //Background Color
    menu.innerHTML = "<h2 class='themehead headercolor' style='text-align:center;padding-top:3px;border-radius:6px 6px 0px 0px;'>Theme Builder</h2>" + makeyourown + usecode + '<div class="button" id="closemenubutton" style="top:10px;right:-360px;width:60px;padding:6px;margin:auto;clear:both;" onclick="setupThemeMenu();CloseThemeMenu();">Leave</div><a href="https://docs.google.com/document/d/1gd0Fe1FiRj761d6I07yC1CwX_PcEM3jZZe7yUq36X6w/edit" target="_blank"><div class="button" id="closemenubutton" style="top:10px;left:15px;width:80px;padding:6px;margin:auto;clear:both;">Get Themes</div></a>';

    if (customTheme != "") {
        document.getElementById("backcolorchoice").value = customTheme.slice(0, 7);
        document.getElementById("bordercolorchoice").value = customTheme.slice(7, 14);
        document.getElementById("windowcolorchoice").value = customTheme.slice(14, 21);
        document.getElementById("messagebackgroundcolorchoice").value = customTheme.slice(21, 28);
        document.getElementById("messagetextcolorchoice").value = customTheme.slice(28, 35);
        document.getElementById("messagesubtextcolorchoice").value = customTheme.slice(35, 42);

        document.getElementById("headerbackgroundcolorchoice").value = customTheme.slice(42, 49);
        document.getElementById("headertextcolorchoice").value = customTheme.slice(49, 56);
        document.getElementById("menuheaderbackgroundcolorchoice").value = customTheme.slice(56, 63);

        document.getElementById("inputbackgroundcolorchoice").value = customTheme.slice(63, 70);
        document.getElementById("inputtextcolorchoice").value = customTheme.slice(70, 77);
        document.getElementById("inputbuttoncolorchoice").value = customTheme.slice(77, 84);

        document.getElementById("buttonbackgroundcolorchoice").value = customTheme.slice(84, 91);
        document.getElementById("buttontextcolorchoice").value = customTheme.slice(91, 98);
        document.getElementById("buttonbordercolorchoice").value = customTheme.slice(98, 105);

        customThemeArray = customTheme.split("|")

        document.getElementById("backgroundnamechoice").value = customThemeArray[1];
        document.getElementById("themenamechoice").value = customThemeArray[2];
        document.getElementById("audiochoice").value = customThemeArray[3];
    }
}

function GenerateCustomTheme() {
    var back = document.getElementById("backcolorchoice").value;
    var border = document.getElementById("bordercolorchoice").value;
    var window = document.getElementById("windowcolorchoice").value;

    var mesback = document.getElementById("messagebackgroundcolorchoice").value;
    var mestext = document.getElementById("messagetextcolorchoice").value;
    var messub = document.getElementById("messagesubtextcolorchoice").value;

    var headback = document.getElementById("headerbackgroundcolorchoice").value;
    var headtext = document.getElementById("headertextcolorchoice").value;
    var menuback = document.getElementById("menuheaderbackgroundcolorchoice").value;

    var inpback = document.getElementById("inputbackgroundcolorchoice").value;
    var inptext = document.getElementById("inputtextcolorchoice").value;
    var inpbutton = document.getElementById("inputbuttoncolorchoice").value;

    var butback = document.getElementById("buttonbackgroundcolorchoice").value;
    var buttext = document.getElementById("buttontextcolorchoice").value;
    var butborder = document.getElementById("buttonbordercolorchoice").value;

    var backgroundName = document.getElementById("backgroundnamechoice").value;
    var themeName = document.getElementById("themenamechoice").value;
    var audioChoice = document.getElementById("audiochoice").value;

    customTheme = back + border + window + mesback + mestext + messub + headback + headtext + menuback + inpback + inptext + inpbutton + butback + buttext + butborder + "|" + backgroundName + "|" + themeName + "|" + audioChoice;

    ApplyCustomTheme();
}

function ApplyCustomTheme() {

    //Separate Information For Styling
    var back = customTheme.slice(0, 7);
    var border = customTheme.slice(7, 14);
    var window = customTheme.slice(14, 21);
    var mesback = customTheme.slice(21, 28);
    var mestext = customTheme.slice(28, 35);
    var messub = customTheme.slice(35, 42);
    var headback = customTheme.slice(42, 49);
    var headtext = customTheme.slice(49, 56);
    var menuback = customTheme.slice(56, 63);
    var inpback = customTheme.slice(63, 70);
    var inptext = customTheme.slice(70, 77);
    var inpbutton = customTheme.slice(77, 84);
    var butback = customTheme.slice(84, 91);
    var buttext = customTheme.slice(91, 98);
    var butborder = customTheme.slice(98, 105);

    customThemeArray = customTheme.split("|")

    var backgroundName = customThemeArray[1];
    var themeName = customThemeArray[2];
    var audioChoice = customThemeArray[3];

    //Saves The Styles For Logo
    customBackgroundColor = customTheme.slice(0, 7);
    customBorderColor = customTheme.slice(7, 14);
    customMiddleColor = customTheme.slice(14, 21);
    customTextColor = customTheme.slice(28, 35);
    customMessageBackColor = customTheme.slice(21, 28);
    if (customTheme.slice(106) != "") {
        customBackImage = "url(" + backgroundName + ")";
    } else {
        customBackImage = "";
    }

    //Apply Theme
    changeTheme(window, mesback, mesback, back, headback, inpback, headtext, "2px solid " + border, butback, buttext, butborder, mestext, messub, border, inptext, "5px solid " + border, inpbutton, menuback, themeName);

    //Update Sharing code
    if (document.getElementById("outputcodebox") != null) {
        document.getElementById("outputcodebox").value = customTheme;
    }

    //Reset Theme Stuff
    var body = document.getElementById("body");
    body.style.backgroundImage = "";
    body.style.backgroundPosition = "center";
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
    if (customSound != undefined) {
        customSound.pause();
        customSound.currentTime = 0;
    }

    //If Background Image Is Here Apply It
    if (backgroundName != "") {
        body.style.backgroundImage = "url(" + backgroundName + ")";
    }

    //If Audio Choice Is Here Apply It
    if (audioChoice != "") {
        customSound = new Audio(audioChoice);
        customSound.play();
    }

    //Save Theme
    localStorage.setItem("HBChatCustom", customTheme)
    theme = -1;
    localStorage.setItem("HBChatTheme", theme);
}

function CopySharingCode() {
    GenerateCustomTheme();
    var outputCodeBox = document.getElementById("outputcodebox")
    outputCodeBox.select();
    outputCodeBox.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.getElementById("copysharingbutton").innerHTML = "Copied";
    window.setTimeout(function(){
        if(document.getElementById("copysharingbutton") != undefined){
            document.getElementById("copysharingbutton").innerHTML = "Copy Sharing Code";
        }
    }, 1000)
}

function ApplyCode() {
    var applyCodeInput = document.getElementById("applycodeinput")
    if (applyCodeInput.value.length >= 106 && applyCodeInput.value.includes("#") && applyCodeInput.value.includes("|")) {
        customTheme = applyCodeInput.value;
        SetupThemeBuilder()
        ApplyCustomTheme()
    } else {
        alert("Code Not Input Correctly")
    }
}

//Opens Theme Selection Menu
function OpenThemeMenu() {
    var cover = document.getElementById("logincover");
    var menu = document.getElementById("login");

    menu.style.width = "500px";
    menu.style.height = "510px";
    menu.style.marginTop = "-255px";
    menu.style.marginLeft = "-250px";
    menu.style.borderRadius = "10px";

    cover.style.display = "block";
    menu.style.display = "block";
}


//Closes The Theme Selection Menu
function CloseThemeMenu() {
    document.getElementById("logincover").style.display = "none";
    document.getElementById("login").style.display = "none";
}


//Used To Store Different Themes For Use
function ThemeStorage(val) {
    //Reset Theme Stuff
    var body = document.getElementById("body");
    body.style.backgroundImage = "";
    body.style.backgroundPosition = "center";
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
    if (customSound != undefined) {
        customSound.pause();
        customSound.currentTime = 0;
    }

    //Apply New Themes
    //Mythril
    if (val == -1) {
        ApplyCustomTheme();
    } else if (val == 1) {
        changeTheme("#212121", "#2b2b2b", "#3b3b3b", "#2b2b2b", "#212121", "#212121", "lightgray", "2px solid #008db8", "#008db8", "white", "black", "white", "gray", "#008db8", "white", "6px solid black", "#008db8", "", "Mythril");
        //Overwatch
    } else if (val == 2) {
        changeTheme("#212121", "#2b2b2b", "#3b3b3b", "#2b2b2b", "#212121", "#212121", "lightgray", "2px solid #e77928", "#e77928", "white", "black", "white", "gray", "#e77928", "white", "6px solid black", "#e77928", "", "Overwatch");
    }
    //Dark Shamrock
    else if (val == 3) {
        changeTheme("#212121", "#2b2b2b", "#3b3b3b", "#2b2b2b", "#212121", "#212121", "lightgray", "2px solid #34d280", "#34d280", "#3a5886", "black", "#77efa8", "gray", "#34d280", "white", "6px solid black", "#34d280", "", "Dark Shamrock");
    }
    //Dark Rave
    else if (val == 4) {
        changeTheme("#212121", "#2b2b2b", "#3b3b3b", "#2b2b2b", "#212121", "#212121", "lightgray", "2px solid #ff00f2", "#ff4af6", "white", "black", "#ff4af6", "gray", "#ff4af6", "white", "6px solid black", "#ff4af6", "", "Dark Rave");
    }
    //Windows XP
    else if (val == 5) {
        changeTheme("white", "#f0f0f0", "#d3e5fb", "white", "#0f64d5", "white", "white", "3px solid #4e8df4", "#1a8f1a", "white", "#125031", "black", "darkslategray", "#0f64d5", "black", "6px solid #0f64d5", "#1a8f1a", "#0f64d5", "Windows XP");

        //Special Background
        body.style.backgroundImage = "url(pics/windowsxpbackground.jpg)";

        //Special Start Sound (Check Out HTML For The File Location)
        document.getElementById("winstart").play();
    }
    //Trump
    else if (val == 6) {
        changeTheme("transparent", "rgba(43,43,43,0.8)", "rbga(0,0,0,0.8)", "#2b2b2b", "#212121", "#212121", "white", "2px solid #bf0a30", "#bf0a30", "white", "black", "#bf0a30", "#008db8", "#bf0a30", "#bf0a30", "6px solid black", "#bf0a30", "", "Donald Trump");

        //Special Background
        body.style.backgroundImage = "url(pics/trumpbackground.jpg)";
        body.style.backgroundPosition = "top";


        var random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                document.getElementById("dtamerica").play();
                break;
            case 1:
                document.getElementById("dtchina").play();
                break;
            default:
                document.getElementById("dtbuildwall").play();
                break;
        }
    }
    //Walnut
    else if (val == 7) {
        changeTheme("#d09664", "rgba(0,0,0,0.6)", "rbga(0,0,0,0.4)", "#d09664", "#653418", "#d09664", "white", "2px solid black", "#653418", "white", "black", "white", "#d09664", "#653418", "#653418", "6px solid black", "#653418", "#653418", "Walnut");

        //Special Background
        body.style.backgroundImage = "url(pics/walnut.jpeg)";
        body.style.backgroundPosition = "top";
    }
    //Classic Light
    else {
        changeTheme("white", "#f0f0f0", "lightgray", "white", "#f2f2f2", "white", "black", "2px solid black", "white", "black", "black", "black", "darkslategray", "black", "black", "6px solid black", "red", "", "Classic Light");

    }

    //Saves Theme Number For Reload Of Page.
    localStorage.setItem("HBChatTheme", val);
    theme = val;
}


//Does All The Processing To Turn the Page Into The Theme
function changeTheme(mainBackgroundColor, messageBackgroundColor, yourMessageBackgroundColor, docBackgroundColor, headerBackgroundColor, inputBackgroundColor, headerTextColor, headerLine, buttonColor, buttonTextColor, buttonBorderColor, messageTextColor, messageSubTextColor, mainBorderColor, inputTextColor, inputBorder, inputButtonColor, menuHeaderBackground, themeName) {
    //CSS
    document.getElementById("themestyle").innerHTML = ".message, .fakemessage{background-color:" + messageBackgroundColor + ";color:" + messageTextColor + ";}.desctext{color:" + messageTextColor + "}body, #login, #logincover{background-color:" + docBackgroundColor + ";}.mine, .fakemessage{background-color:" + yourMessageBackgroundColor + ";}.time, .name{color:" + messageSubTextColor + ";}#main{background-color:" + mainBackgroundColor + ";border-color:" + mainBorderColor + ";}.button{background-color:" + buttonColor + ";color:" + buttonTextColor + ";border-color:" + buttonBorderColor + ";}footer{border:" + inputBorder + ";}#input,#inputcover{background-color:" + inputBackgroundColor + ";}#input, #username, #lblusername{color:" + inputTextColor + ";}#inputbutton{background-color:" + inputButtonColor + ";}h2, #head{color:" + headerTextColor + ";}#head{background-color:" + headerBackgroundColor + ";border-bottom:" + headerLine + "}#themeheader, .themehead{background-color:" + menuHeaderBackground + ";}.headercolor{color:" + headerTextColor + "}#myDropdown a{color:" + buttonTextColor + ";background-color:" + buttonColor + ";}#minimenubutton{background-color:" + mainBorderColor + ";}#login{border-color:" + mainBorderColor + "}.creatorbox input, .inputarea{background-color:" + mainBackgroundColor + ";border-color:" + mainBorderColor + ";color:" + messageTextColor + ";}#dragheader, .bordercolor{background-color:" + mainBorderColor + "}"


    document.getElementById("scroll2").innerHTML = themeName;
}
