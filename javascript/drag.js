// Make the DIV element draggable:
dragElement(document.getElementById("drag"));
ResizeRight(document.getElementById("main"));
ResizeBottom(document.getElementById("main"));

//Enable Or Disable Drag Of Chatroom Window
var dragMain = document.getElementById("drag");
var dragHeader = document.getElementById("dragheader");
var menuDropDown = document.getElementById("menudropdown");
var bottomresize = document.getElementById("resizebottom");
var rightresize = document.getElementById("resizeright");
var dragEnabled = false;

function AllowDrag() {
    if (dragEnabled) {
        //Make Drag False
        dragMain.style.position = "relative";
        dragMain.style.left = "0";
        dragMain.style.top = "0";
        dragMain.style.margin = "auto";
        dragHeader.style.cursor = "default";
        dragHeader.style.height = "6px";
        menuDropDown.style.top = "5px";
        dragEnabled = false;
        rightresize.style.cursor = "default";
        bottomresize.style.cursor = "default";

        //Resize Components Back
        dragMain.style.width = "415px";
        dragMain.style.height = "610px";
        rightresize.style.height = "600px"
        main.style.width = "400px";
        main.style.height = "600px";
        bottomresize.style.width = "410px";
        dragHeader.style.width = "410px";
        
        
        //Reset Transition
        dragMain.style.transition = dragHeader.style.transition = main.style.transition = bottomresize.style.transition = rightresize.style.transition = "all 120ms"
    } else {
        //Make Drag True
        dragMain.style.position = "fixed";
        dragMain.style.margin = "0";
        dragMain.style.top = "60px";
        dragHeader.style.cursor = "pointer";
        dragHeader.style.height = "12px";
        menuDropDown.style.top = "8px";
        rightresize.style.cursor = "e-resize";
        bottomresize.style.cursor = "s-resize";

        //Recenter Window
        dragMain.style.left = ((window.innerWidth * 0.5) - (parseInt(dragMain.style.width.slice(0, -2)) / 2)) + "px";
        dragEnabled = true;
        
        dragMain.style.transition = dragHeader.style.transition = main.style.transition = bottomresize.style.transition = rightresize.style.transition = "none";
    }
}




function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        var main = document.getElementById("main");
        
        
        if (dragEnabled) {
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

            //if element is past the bottom set it to the bottom
            if (parseInt(elmnt.style.top.slice(0, -2)) + parseInt(main.style.height) + 18 > window.innerHeight) {
                elmnt.style.top = (window.innerHeight -  parseInt(main.style.height) - 18) + "px";
            }
            //if element is past the top set it top
            if (parseInt(elmnt.style.top.slice(0, -2)) < 0) {
                elmnt.style.top = "0px"
            }



            // move element left or right
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

            //if element is past the left set it left
            if (parseInt(elmnt.style.left.slice(0, -2)) < 0) {
                elmnt.style.left = "0px"
            }

            //if elemnt is past right set it to right
            if (parseInt(elmnt.style.width.slice(0, -2)) + parseInt(elmnt.style.left.slice(0, -2)) > window.innerWidth) {
                elmnt.style.left = (window.innerWidth - parseInt(elmnt.style.width.slice(0, -2))) + "px";
            }
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function ResizeRight(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    document.getElementById("resizeright").onmousedown = dragMouseRight;


    function dragMouseRight(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementResizeRight;
    }

    function elementResizeRight(e) {
        e = e || window.event;
        e.preventDefault();

        var drag = document.getElementById("drag");
        var dragheader = document.getElementById("dragheader");
        var resizebottom = document.getElementById("resizebottom");


        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        if (dragEnabled) {
            // move element left or right
            drag.style.width = (parseInt(drag.style.width.slice(0, -2)) - pos1) + "px";
            elmnt.style.width = (parseInt(elmnt.style.width.slice(0, -2)) - pos1) + "px";
            var newWidth = parseInt(elmnt.style.width.slice(0, -2));
            dragheader.style.width = (newWidth + 10) + "px";
            resizebottom.style.width = (newWidth + 10) + "px";
             

            if (parseInt(drag.style.width.slice(0, -2)) < 315) {
                drag.style.width = "315px";
                elmnt.style.width = "300px";
                resizebottom.style.width = "310px";
                dragheader.style.width = "310px";
            } else if(parseInt(drag.style.width.slice(0,-2)) + parseInt(drag.style.left.slice(0,-2)) > window.innerWidth){
                newWidth = window.innerWidth - 10 - parseInt(drag.style.left.slice(0,-2))
                drag.style.width = (newWidth + 15) + "px";
                elmnt.style.width = newWidth + "px";
                resizebottom.style.width = dragheader.style.width = (newWidth + 10) + "px";
            }
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



function ResizeBottom(elmnt) {
    var pos1 = 0,
        pos3 = 0;

    document.getElementById("resizebottom").onmousedown = dragMouseBottom;


    function dragMouseBottom(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementResizeBottom;
    }

    function elementResizeBottom(e) {
        e = e || window.event;
        e.preventDefault();

        var resizeright = document.getElementById("resizeright");
        var drag = document.getElementById("drag");


        // calculate the new cursor position:
        pos1 = pos3 - e.clientY;
        pos3 = e.clientY;
        if (dragEnabled) {
            // move element left or right
            elmnt.style.height = resizeright.style.height = (parseInt(elmnt.style.height.slice(0, -2)) - pos1) + "px";
             

            if (parseInt(elmnt.style.height.slice(0, -2)) < 300) {
                elmnt.style.height = "300px";
                resizeright.style.height = "300px";
            } else if(parseInt(elmnt.style.height.slice(0,-2)) + parseInt(drag.style.top.slice(0,-2)) + 18 > window.innerHeight){
                resizeright.style.height = (window.innerHeight - parseInt(drag.style.top.slice(0, -2)) - 18) + "px"
                elmnt.style.height = resizeright.style.height;
                console.log("TOO BIG")
            }
            console.log(parseInt(elmnt.style.height.slice(0,-2)) + parseInt(drag.style.top.slice(0,-2)) + 18 )
            console.log("Inner-Height: " + window.innerHeight)
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}