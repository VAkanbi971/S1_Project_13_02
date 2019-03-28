"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Victor Akanbi
    Date:   3.25.2019
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/






/* ===================================================================== */

window.onload = init;

function init() {
      //this var gets elements with the class name of calcButton
      var calcButtons = document.getElementsByClassName("calcButton");
      //this for loop goes through the like array above and makes it so the function button click works when clicked for all of the elements of that class
      for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].onclick = buttonClick;
      }
      //this makes it so when you press any key the calcKeys function is run
      document.getElementById("calcWindow").onkeydown = calcKeys;
}

function buttonClick(e) {
      //these two variables gets the value of the elemenets with the names calcWindow and decimals
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      //this code targets the value of the event
      var buttonValue = e.target.value;
      //this switch checks to see if you clicked the del, bksp,enter, prev, or any other button and then does different things 
      switch (buttonValue) {
            case "del":
                  //sets calcValue to nothing eraseing everything in the text box
                  calcValue = "";
                  break;
            case "bksp":
                  //this runs the function erasekey that gets rid of one key from the text box
                  calcValue = eraseChar(calcValue);
                  break;
            case "enter":
                  //this runs the evalEq function so that the equation can actually be done
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  //this runs the lastEq function so that the last equation that was typed can be grabed
                  calcValue += lastEq(calcValue);
                  break;
            default:
                  //this sets up the so that any other key that is pressed will simply make the character on that key appear in the text box
                  calcValue = calcValue + buttonValue;
                  break;
      }
      //This sets the value of the text box to calcValue
      document.getElementById("calcWindow").value = calcValue;
      //this puts the crsor in the window
      document.getElementById("calcWindow").focus();

};


function calcKeys(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      switch (e.key) {
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
            case "ArrowUp":

                  calcValue += lastEq(calcWindow.value);
                  e.preventDefault();
                  break;

      }

      document.getElementById("calcWindow").value = calcValue;
};




/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}