    var num1 = new Big(0), num2 = new Big(0); 
    var operator, result; 
    var allCalculations = [];
    var calculated = false;
    var firstNumberEntered = false;
    var decimalMarkUsed = false;
    var selectedCalculationMethod;
    var normalMode = true;
    var drawingBoard;
    var boundingBoxSize = 0, xStart = 0, yStart = 0;
    
    function add(num1, num2) 
    {
        return num1.plus(num2);
    }

    function sub(num1, num2) 
    {
        return num1.minus(num2);
    }

    function mul(num1, num2) 
    {
        return num1.times(num2);
    }

    function div(num1, num2) 
    {
        return num1.div(num2);
    }

    function clearVariables() 
    {
        num1 = new Big(0); 
        num2 = new Big(0); 
        operator = null;
        result = null;
        firstNumberEntered = false;
        decimalMarkUsed = false;
    }

    function changeDisplayTo(displayText)
    {
        $("#display span").text(displayText);
    }

    function getDisplayText()
    {
        return $("#display span").text();
    }

    function setCurrentNum(num)
    {
        if(!firstNumberEntered)
        {
            num1 = new Big(num);
        }
        else
        {
            num2 = new Big(num);
        }
    }

    function getCurrentNum()
    {
        if(!firstNumberEntered)
        {
            return num1;
        }
        else
        {
            return num2;
        }
    }

    function removeLastFromString(text)
    {
        if(text.substring(text.length - 1, text.length) === ".")
            decimalMarkUsed = false;
        if(text.length == 1)
            return "0";
        else
            return text.substring(0, text.length - 1);
    }

    function toggleMode()
    {
        if(normalMode)
        {
            $("#keys-lower-part").hide();
            $("#drawing-board").show();
            createDrawingBoard();
            $("#3").text("Predict");
            normalMode = false;
        }
        else
        {
            $("#drawing-board").hide();
            $("#keys-lower-part").show();
            $("#3").text("/");
            normalMode = true;
        }
    }

    function updateTape() 
    {
        $("#tape-list").empty("li"), allCalculations.length ? $("#tape-content span").text("Your calculations.") : $("#tape-content span").text("No calculations have been made.");
        for (var i = 0; i < allCalculations.length; i++) $("#tape-list").append("<li>" + allCalculations[i].toString() + "</li>")
    }

    function createDrawingBoard()
    {
        drawingBoard = new DrawingBoard.Board('drawing-board', {
        size: 30,
  	    controls: false,
	    webStorage: false
    });
        drawBoundingBox();
    }

    function drawBoundingBox()
    {
        var canvas = document.getElementsByTagName("canvas")[0];
        var canvas2d = document.getElementsByTagName("canvas")[0].getContext("2d");
        var longest = canvas.offsetWidth > canvas.offsetHeight ? canvas.offsetWidth : canvas.offsetHeight;
        var shortest = canvas.offsetWidth < canvas.offsetHeight ? canvas.offsetWidth : canvas.offsetHeight;
        boundingBoxSize = shortest;  
        if(canvas.offsetWidth > canvas.offsetHeight)
        {
            xStart = (longest-shortest)/2;
            yStart = 0;
            canvas2d.rect(xStart, yStart, boundingBoxSize, boundingBoxSize);
        }
        else
        {
            xStart = 0;
            yStart = (longest-shortest)/2;
            canvas2d.rect(xStart, yStart, boundingBoxSize, boundingBoxSize);
        }
        var lastLineWidth = canvas2d.lineWidth;
        var lastStrokeStyle = canvas2d.strokeStyle;
        canvas2d.lineWidth = 1;
        canvas2d.strokeStyle = "#29b6f6"
        canvas2d.stroke();
        canvas2d.lineWidth = lastLineWidth;
        canvas2d.strokeStyle = lastStrokeStyle;
    }

    function clearDrawingBoard()
    {
        var canvas = document.getElementsByTagName("canvas")[0];
        var canvas2d = document.getElementsByTagName("canvas")[0].getContext("2d");
        canvas2d.beginPath();
        canvas2d.rect(0, 0, canvas.width, canvas.height);
        var lastStrokeStyle = canvas2d.strokeStyle;
        canvas2d.strokeStyle = "#ffffff";
        canvas2d.fill(); 
        canvas2d.strokeStyle = lastStrokeStyle;
        drawBoundingBox();
    }

    function getScaledImage()
    {
        var canvas = document.getElementsByTagName("canvas")[0];
        var canvas2d = document.getElementsByTagName("canvas")[0].getContext("2d");
        var imgData = canvas2d.getImageData(xStart, yStart, boundingBoxSize, boundingBoxSize);
        var newCanvas = document.createElement("canvas");
        newCanvas.width = boundingBoxSize;
        newCanvas.height = boundingBoxSize;
        newCanvas.getContext("2d").putImageData(imgData, 0, 0);
        newCanvas.getContext("2d").lineWidth = 3;
        newCanvas.getContext("2d").strokeStyle = "#ffffff"
        newCanvas.getContext("2d").strokeRect(0, 0, boundingBoxSize, boundingBoxSize);
        canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        canvas.getContext("2d").drawImage(newCanvas, 0, 0, 32, 32)
        var img = canvas.toDataURL("image/png");
        return img;
    }

     function keyClicked(e, num = "none") 
    {
        if(num === "none")
            num = $(this).text();
        var displayText = getDisplayText();
        if((displayText === "0" && num !== ".")|| displayText === "+" || displayText === "-" || displayText === "*" || displayText === "/" || calculated)
        {
            changeDisplayTo(num);
            if(calculated)
                calculated = false;
        }
        else
        {
            if(num === ".")
            {
                if(!decimalMarkUsed)
                    changeDisplayTo(getDisplayText() + num);
                decimalMarkUsed = true;
            }
            else
            {
                changeDisplayTo(getDisplayText() + num);
            }
        }
        setCurrentNum(getDisplayText());
    }

    function operatorClicked(e, op = "none") 
    {
        if(op === "none")
            op = $(this).text();
        switch (op) 
        {
            case "+":
                changeDisplayTo("+");
                operator = op;
                selectedCalculationMethod = add;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "-":
                changeDisplayTo("-");
                operator = op;
                selectedCalculationMethod = sub;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "*":
                changeDisplayTo("*");
                operator = op;
                selectedCalculationMethod = mul;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "/":
                changeDisplayTo("/");
                operator = op;
                selectedCalculationMethod = div;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "C":
                changeDisplayTo("0");
                clearVariables();
                break;
            case "<":
                changeDisplayTo(removeLastFromString(getDisplayText()));
                setCurrentNum(getDisplayText());
                break;
            case "+/-":
                changeDisplayTo(getCurrentNum().times(-1).toString());
                setCurrentNum(getCurrentNum().times(-1));
                break;
            case "ABC":
                toggleMode();
                break;
            case "Predict":
                send(getScaledImage());
                clearDrawingBoard();
                break;
        }
    }
    
    function equalClicked() 
    {
        result = selectedCalculationMethod(num1, num2);
        changeDisplayTo(result);
        allCalculations.push(num1 + operator + num2 + "=" + result); 
        updateTape();
        clearVariables();  
        calculated = true;      
    }
    
    function tapeToggle() 
    {
        $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), $("#tape-content").slideToggle()
    }

    function clearTape() 
    {
        $("#tape-list").empty("li"); 
        allCalculations = [];
        updateTape();
    }

$(document).ready(function() 
{

    $("#keys-upper-part button.number").on("click", keyClicked);
    $("#keys-lower-part button.number").on("click", keyClicked);
    $("#keys-upper-part button.operator").on("click", operatorClicked);
    $("#keys-lower-part button.operator").on("click", operatorClicked);
    $("button#equals").on("click", equalClicked)
    $("#tape").on("click", tapeToggle);
    $("#clear-tape").on("click", clearTape);

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', createDrawingBoard, false);

    // Hide drawing board, because we are always starting in normal mode
    $("#drawing-board").hide();

    // Removes focus of the button.
    $("button").click(function(event) 
    {
        $(this).blur();
    });

});