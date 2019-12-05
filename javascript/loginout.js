var user = "TEMPORARY_USER"
var adminList = ["buckybrust", "Korin", "hmccabemusic", "Elmas"]

//Asks For Account Name And Checks For Duplicates
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
