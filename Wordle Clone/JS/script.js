
var deactivated = false;
const word = "green";
var input = "";
var currentLine = 0;
var start = currentLine*word.length;
var end = (currentLine*word.length) + (word.length);




function nextRow(){
  input = "";
  currentLine++; 
  start = currentLine*word.length;
  end = (currentLine*word.length) + (word.length);
}




function generateBoxes(){
  for(let i = 0; i < word.length*6; i++){
      var ul = document.getElementById("lettersList");
      var li = document.createElement("li");
      document.getElementById("container").style.width = 58 * word.length + "px";
      li.style.width = "58px";
      li.style.height = "58px";
      li.id = "letterBox" + i.toString();
      if(li.textContent == "undefined"){
        li.textContent = "";
        
      }
      ul.appendChild(li);
  }
}



function checkWord(){
  if(input.toLowerCase() == word.toLowerCase()){
    console.log("correct");
    correctInput(start,end);
  } else {
    console.log("incorrect");
    incorrectInput(start,end);
  }
}



function correctInput(start,end){
  for(i = start; i < end ; i++){
    document.getElementById("letterBox"+i).style.background = "green";
    
  }
  deactivated = true;
  document.getElementById("answerOutput").style.display = "block";
  document.getElementById("answerOutput").textContent = "WELL DONE, ANSWER: " + word.toUpperCase();
}




function incorrectInput(start,end){
  var wordIndex = 0;
  
  for(i = start; i < end ; i++){
    console.log("word "+ word[wordIndex] + " input " + input[wordIndex]);
    
    if(word[wordIndex].toLowerCase() != input[wordIndex].toLowerCase() && word.includes(input[wordIndex].toLowerCase())){
      document.getElementById("letterBox"+i).style.background = "orange";
    } else if (word[wordIndex].toLowerCase() === input[wordIndex].toLowerCase()){
      document.getElementById("letterBox"+i).style.background = "green";
    }
    wordIndex++;
  }
  if(currentLine<5){
    nextRow();
  } else {
    deactivated = true;
    console.log("too many rows");
    document.getElementById("answerOutput").style.display = "block";
    document.getElementById("answerOutput").textContent = "ANSWER: " + word.toUpperCase();

  }
}



function updateDisplay(start,end){
  var wordIndex = 0
  for(i = start; i < end ; i++){
    if(wordIndex <= input.length){
      document.getElementById("letterBox"+i).textContent = input[wordIndex];
    } else{
      document.getElementById("letterBox"+i).textContent = "";
    }
    wordIndex++;
  }
}



function processInput(letter){
  if (letter>=65 && letter<=90 && input.length < word.length){
    input += String.fromCharCode(letter);
  } else if (letter==8){
    input = input.substring(0, input.length -1);
  } else if (letter==13){
    if(input.length == word.length){
      checkWord();
    } else {
    }
  }
  updateDisplay(start,end);
}







function setUp(){
  generateBoxes()
}



function myKeyPress(e){
  if(deactivated){
    console.log("not listening");
  } else{
    var keynum;
    if(window.event) { // IE                  
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                 
      keynum = e.which;
    }
    processInput(keynum);
  }
}




