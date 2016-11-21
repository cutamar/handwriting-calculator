$(document).ready(function() 
{

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

    function updateTape() 
    {
        $("#tape-list").empty("li"), allCalculations.length ? $("#tape-content span").text("Your calculations.") : $("#tape-content span").text("No calculations have been made.");
        for (var i = 0; i < allCalculations.length; i++) $("#tape-list").append("<li>" + allCalculations[i].toString() + "</li>")
    }

    var num1 = new Big(0), num2 = new Big(0); 
    var operator, result; 
    var allCalculations = [];
    var calculated = false;
    var firstNumberEntered = false;
    var decimalMarkUsed = false;
    var selectedCalculationMethod;

    $("#keys button.number").on("click", keyClicked);
    $("#keys button.operator").on("click", operatorClicked);
    $("button#equals").on("click", equalClicked)
    $("#tape").on("click", tapeToggle);
    $("#clear-tape").on("click", clearTape);

    function keyClicked() 
    {
        var num = $(this).text();
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

    function operatorClicked() 
    {
        switch ($(this).text()) 
        {
            case "+":
                changeDisplayTo("+");
                operator = $(this).text()
                selectedCalculationMethod = add;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "-":
                changeDisplayTo("-");
                operator = $(this).text()
                selectedCalculationMethod = sub;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "*":
                changeDisplayTo("*");
                operator = $(this).text()
                selectedCalculationMethod = mul;
                firstNumberEntered = true;
                decimalMarkUsed = false;
                break;
            case "/":
                changeDisplayTo("/");
                operator = $(this).text()
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

    // Removes focus of the button.
    $("button").click(function(event) 
    {
        $(this).blur();
    });

});