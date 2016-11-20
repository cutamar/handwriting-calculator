$(document).ready(function() 
{

    function add(num1, num2) 
    {
        return num1 + num2;
    }

    function sub(num1, num2) 
    {
        return num1 - num2;
    }

    function mul(num1, num2) 
    {
        return num1 * num2;
    }

    function div(num1, num2) 
    {
        return num1 / num2;
    }

    function clearVariables() 
    {
        num1 = null; 
        num2 = null; 
        operator = null;
        result = null;
        firstNumberEntered = false;
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
            num1 = num;
        }
        else
        {
            num2 = num;
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
        return text.substring(0, text.length - 1);
    }

    function updateTape() 
    {
        $("#tape-list").empty("li"), allCalculations.length ? $("#tape-content span").text("Your calculations.") : $("#tape-content span").text("No calculations have been made.");
        for (var i = 0; i < allCalculations.length; i++) $("#tape-list").append("<li>" + allCalculations[i].toString() + "</li>")
    }

    var num1, num2 , operator, result; 
    var allCalculations = [];
    var calculated = false;
    var firstNumberEntered = false;
    var selectedCalculationMethod;

    $("#keys button.number").on("click", function() 
    {
        var num = $(this).text();
        var displayText = getDisplayText();
        if(displayText === "0" || displayText === "+" || displayText === "-" || displayText === "*" || displayText === "/" || calculated)
        {
            changeDisplayTo(num);
            if(calculated)
                calculated = false;
        }
        else
        {
            changeDisplayTo(getDisplayText() + num);
        }
        setCurrentNum(parseFloat(getDisplayText()));
    });

    $("#keys button.operator").on("click", function() 
    {
        firstNumberEntered = true;
        switch (operator = $(this).text()) {
            case "+":
                changeDisplayTo("+");
                selectedCalculationMethod = add;
                break;
            case "-":
                changeDisplayTo("-");
                selectedCalculationMethod = sub;
                break;
            case "*":
                changeDisplayTo("*");
                selectedCalculationMethod = mul;
                break;
            case "/":
                changeDisplayTo("/");
                selectedCalculationMethod = div;
                break;
            case "C":
                changeDisplayTo("0");
                clearVariables();
                break;
            case "<":
                changeDisplayTo(removeLastFromString(getCurrentNum().toString()));
                setCurrentNum(parseFloat(getDisplayText()));
        }
    });

    $("button#equals").on("click", function() 
    {
        result = selectedCalculationMethod(num1, num2);
        changeDisplayTo(result);
        allCalculations.push(num1 + operator + num2 + "=" + result); 
        updateTape();
        clearVariables();  
        calculated = true;      
    });
    
    $("#tape").on("click", function() 
    {
        $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), $("#tape-content").slideToggle()
    });
    
    $("#clear-tape").on("click", function() 
    {
        $("#tape-list").empty("li"); 
        allCalculations = [];
        updateTape();
    });

    // Removes focus of the button.
    $("button").click(function(event) 
    {
        $(this).blur();
    });

});