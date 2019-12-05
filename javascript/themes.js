ThemeStorage(localStorage.getItem("HBChatTheme"));


//Changes Login Panel To Theme Panel
function setupThemeMenu() {
    var menu = document.getElementById("login");
    var login = document.getElementById("logincover");

    menu.style.width = "400px";
    menu.style.height = "400px";
    menu.style.marginTop = "-203px";
    menu.style.marginLeft = "-203px";
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
	tButton6 = '<div class="themebutton" style="background:url(pics/windowsxpbackground.jpg);background-size: cover; color:black" onclick="ThemeStorage(5)"><div class="themesub" style="background-color:white; border-color:#0f64d5; height: 36px; color:black"><img src="pics/windowsxplogo.jpg" style="width:70%;"></div></div>';
	
	//TBD
	tButton7 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(6)"><div class="themesub" style="background-color:white; border-color:black; color:black">TBD<br>TBD</div></div>';
	
	//TBD
	tButton8 = '<div class="themebutton" style="background-color:white; color:black" onclick="ThemeStorage(7)"><div class="themesub" style="background-color:white; border-color:black; color:black">TBD<br>TBD</div></div>';
	

	//The Menu HTML
    menu.innerHTML = '<h2 id="themeheader" style="text-align: center;font-size:35px;margin-top:10px;font-family:sans-serif;">Select Your Theme</h2>' + tButton1 + tButton2 + tButton3 + tButton4 + tButton5 + tButton6 + tButton7 + tButton8 + '<div class="button" id="closemenubutton" style="position:static;margin:auto;clear:both;" onclick="CloseThemeMenu();">Continue</div>';
}


//Opens Theme Selection Menu
function OpenThemeMenu() {
    var cover = document.getElementById("logincover");
    var menu = document.getElementById("login");

    menu.style.width = "500px";
    menu.style.height = "400px";
    menu.style.marginTop = "-203px";
    menu.style.marginLeft = "-253px";
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
    
    
    //Apply New Themes
    //Mythril
    if (val == 1) {
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
    //Classic Light
    else {
        changeTheme("white", "#f0f0f0", "lightgray", "white", "#f2f2f2", "white", "black", "2px solid black", "white", "black", "black", "black", "darkslategray", "black", "black", "6px solid black", "red", "", "Classic Light");
        
    }

    //Saves Theme Number For Reload Of Page.
    localStorage.setItem("HBChatTheme", val);
}


//Does All The Processing To Turn the Page Into The Theme
function changeTheme(mainBackgroundColor, messageBackgroundColor, yourMessageBackgroundColor, docBackgroundColor, headerBackgroundColor, inputBackgroundColor, headerTextColor, headerLine, buttonColor, buttonTextColor, buttonBorderColor, messageTextColor, messageSubTextColor, mainBorderColor, inputTextColor, inputBorder, inputButtonColor, menuHeaderBackground, themeName) {
	//CSS
	document.getElementById("themestyle").innerHTML = ".message, .fakemessage{background-color:" + messageBackgroundColor + ";color:" + messageTextColor + ";}body, #login, #logincover{background-color:" + docBackgroundColor + ";}.mine, .fakemessage{background-color:" + yourMessageBackgroundColor + ";}.time, .name{color:" + messageSubTextColor + ";}#main{background-color:" + mainBackgroundColor + ";border-color:" + mainBorderColor + ";}.button{background-color:" + buttonColor + ";color:" + buttonTextColor + ";border-color:" + buttonBorderColor + ";}footer{border:" + inputBorder + ";}#input,#inputcover{background-color:" + inputBackgroundColor + ";}#input, #username, #lblusername{color:" + inputTextColor + ";}#inputbutton{background-color:" + inputButtonColor + ";}h2, #head{color:" + headerTextColor + ";}#head{background-color:" + headerBackgroundColor + ";border-bottom:" + headerLine + "}#themeheader{background-color:" + menuHeaderBackground + ";}.headercolor{color:" + headerTextColor + "}"
    document.getElementById("scroll2").innerHTML = themeName;
}