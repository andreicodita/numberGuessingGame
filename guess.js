
//variables
let v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let nr = [-1, -1, -1, -1, -1];
let aux = [0, 0, 0, 0]
let inputsTaken = [0, 0, 0, 0, 0]
var i = 1;

var guesses = 0;
var inputNumber;
let text = "<br>";
var startGameOK = 1;
var numberOfDigitsFound = 0;
var numberOfDigits = 0;
var zeroDigit;
var currentDigit = 0;
var cntPermutations = 0;
var currentDigitToGuess = 1;
var lastDigit = 1;

//-------------------

function inputMainBody(){
  let form = document.getElementById("guess_form");

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      if(document.getElementById("inputNumber").value == "")
      {
        document.getElementById('error').innerHTML = "input cannot be empty, you have to enter a value between 0 and 4";
        console.log("input cannot be empty, you have to enter a value between 0 and 4");
      }
      else{
        inputNumber = document.getElementById("inputNumber").value;

        if(verifyInput(inputNumber) == "-1")
        {
          form.reset();
          document.getElementById('error').innerHTML = "the value is not between 0 and 4";
          console.log("the value is not between 0 and 4");
        }else
        if(numberOfDigitsFound + Number(inputNumber) > 4 && !(areAllDigitsFound()))
        {
          form.reset();
          v[currentDigit] = 0;
          document.getElementById('error').innerHTML = "you can't have more than 4 digits right";
          console.log("you can't have more than 4 digits right");
        }
        else
        {
        if(inputNumber != 0 && numberOfDigitsFound != 4)
        {
          numberOfDigitsFound = Number(numberOfDigitsFound) + Number(inputNumber);
          inputsTaken[inputNumber]++;
        }
        console.log(inputNumber);

        
        form.reset();
      //new added code
        if(currentDigitToGuess == 9)
        {
          v[0] = 4 - numberOfDigitsFound;
          numberOfDigitsFound = 4;
          inputsTaken[0] = 4 - numberOfDigitsFound;
        }
        
        /*if(foundNumber())
        {
          blurPage();
          outputNumber();
          startAgain();
          quitGame();
        }
        else
        {*/
       if(v[currentDigitToGuess] != -1)
        v[currentDigitToGuess] = inputNumber;
          if(areAllDigitsFound())
          {
            currentDigitToGuess = -1;
            for(i = 0; i <= 9; i++)
              if(v[i] == 0)
              {
                zeroDigit = i;
                break;
              }
            findDigits();
          }
          else
          {
            currentDigitToGuess++;
            rightDigitsGuess(4, currentDigitToGuess);
            outputGuess();
          }
        //}
        }
      }
      });
}



function findDigits(){
  for(i = 0; i <= 9; i++)
    if(v[i] == 4)
      {
        nr[1] = i;
        nr[2] = i;
        nr[3] = i;
        nr[4] = i;
        outputNumber();
        //stop game here (to do)
      }
    else if(v[i] != 0)
    {
      if(lastDigit)
      {
        lastDigit = 0;
        inputNumber = 0;
      }
      if(v[i] == 1 && numberOfDigitsFound == 4 && (inputNumber != 1 && inputNumber != 0))
      {
          console.log('number');
          console.log(numberOfDigitsFound);
          console.log('input must be 0 or 1');
          document.getElementById('error').innerHTML = "input must be 0 or 1";
          break;
        }
      if(v[i] == 1 && (Number(inputNumber) == 1 || Number(inputNumber) == 0)){
        inputNumber = Number(inputNumber);
        //if v[i] == 1/2/3 + cnt to number the permutations
        if(nr[1] != -1 && nr[2] != -1 && nr[4] != -1)
        {
          foundADigit(-1, -1, i, -1);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        }
        if(nr[2] != -1 && nr[3] != -1 && nr[4] != -1)
        {
          foundADigit(i, -1, -1, -1);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        }  
        if(nr[1] != -1 && nr[3] != -1 && nr[4] != -1)
        {
          foundADigit(-1, i, -1, -1);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        } 
        if(cntPermutations == 0)
          {
            if(nr[1] != -1 || i == 0)
              cntPermutations++;
            else
            {
              currentDigit = i;
              rightDigitsGuess(1, i);
              wrongDigitsGuess(3, zeroDigit);
              outputGuess();
              cntPermutations++;
              break;
            }              
          }
        if(cntPermutations == 1)//for 1
          {
            if(inputNumber == v[i] && i == 0)
              cntPermutations++;
            else if(inputNumber == v[i] && i != 0)
            {
              foundADigit(i, -1, -1, -1);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
            else if(nr[2] != -1)
              cntPermutations++;
            else if(nr[2] == -1 && nr[3] != -1 && nr[4] != -1)
              {
                  foundADigit(-1, i, -1, -1);
                  outputNumber();
                  cntPermutations = 0;
                  v[i] = 0;
                  inputNumber = 0;
                  inputNumber = Number(inputNumber);
                  findDigits();
                  break;
              }
            else{
              currentDigit = i;
              wrongDigitsGuess(1, zeroDigit);
              rightDigitsGuess(1, i);
              wrongDigitsGuess(2, zeroDigit);
              outputGuess();
              cntPermutations++;
              break;
            }
          }
          if(cntPermutations == 2)
          {
            if(inputNumber == v[i])
            {
              foundADigit(-1, i, -1, -1);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
            else if(nr[3] == -1 && nr[4] != -1 && inputNumber == 0)
            {
                foundADigit(-1, -1, i, -1);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                findDigits();
                break;
            }
            else if(nr[3] != -1)
              {
                cntPermutations++;
                console.log('perm');
              console.log(cntPermutations);
              }
            else {
              currentDigit = i;
              wrongDigitsGuess(2, zeroDigit);
              rightDigitsGuess(1, i);
              wrongDigitsGuess(1, zeroDigit);
              outputGuess();
              cntPermutations++;
              console.log('perm');
              console.log(cntPermutations);
              break;
            }
          }
          if(cntPermutations == 3) {
            if(inputNumber == v[i] && inputNumber != 0)
              {
                foundADigit(-1, -1, i, -1);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                findDigits();
                break;
              }
            else if(nr[4] == -1){
              foundADigit(-1, -1, -1, i);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              findDigits();
              break;
              }
            }
        }
     /* if(v[i] == inputNumber && cnt > 0)
      {}
      numberOfDigits = 4 - v[i];
      currentDigit = i;
      rightDigitsGuess(4 - numberOfDigits, i)
      wrongDigitsGuess(numberOfDigits, zeroDigit)
      outputGuess();
      cntPermutations++;
      break;*/

      //------------------------------------------------------
    else if(v[i] == 2){//for v[i] == 2
      inputNumber = Number(inputNumber);
      if(inputNumber != 2 && inputNumber != 0){
        console.log('number');
        console.log(numberOfDigitsFound);
        console.log('input must be 0 or 2');
        document.getElementById('error').innerHTML = "input must be 0 or 2";
        break;
      }
      else
      {
        //if v[i] == 1/2/3 + cnt to number the permutations
        if(nr[1] != -1 && nr[2] != -1 && nr[3] == -1 && nr[4] == -1)
          {
            foundADigit(-1, -1, i, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            break;
            //stop game here
          }
          if(nr[2] != -1 && nr[3] != -1 && nr[1] == -1 && nr[4] == -1 && i == 0)
          {
            console.log('0 cant be the first digit, please restart game');
            document.getElementById('error').innerHTML = "0 cant be the first digit, please restart game";
            startGameButton.disabled = false;
            startGameOK = 0;
            document.getElementById("inputButton").disabled = true;
            break;
            //stop game
            
          }
          if(nr[2] != -1 && nr[3] != -1 && nr[1] == -1 && nr[4] == -1 && i != 0)
          {
            foundADigit(i, -1, -1, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            break;
            //stop game here
          }  
          if(nr[1] != -1 && nr[2] == -1 && nr[3] != -1 && nr[4] == -1)
          {
            foundADigit(-1, i, -1, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            break;
            //stop game here
          } 
          if(nr[1] != -1 && nr[2] == -1 && nr[3] == -1 && nr[4] != -1)
            {
              foundADigit(-1, i, i, -1);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              break;
              //stop game here
            } 
            if(nr[1] == -1 && nr[2] == -1 && nr[3] != -1 && nr[4] != -1)
              {
                foundADigit(i, i, -1, -1);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                break;
                //stop game here
              } 
            if(nr[1] == -1 && nr[2] != -1 && nr[3] == -1 && nr[4] != -1)
              {
                foundADigit(i, -1, i, -1);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                break;
                //stop game here
              }
          if(cntPermutations == 0)
            {
              if(nr[1] != -1 || nr[2] != -1 || i == 0)
                cntPermutations++;
              else if(nr[1] == -1 && nr[2] == -1)
              {
                currentDigit = i;
                rightDigitsGuess(2, i);
                wrongDigitsGuess(2, zeroDigit);
                outputGuess();
                cntPermutations++;
                break;
              }              
            }
          if(cntPermutations == 1)
            {
              if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0 && (nr[1] == -1 && nr[2] == -1))
              {
                foundADigit(i, i, -1, -1);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                findDigits();
                break;
              }
              else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
              {
                console.log('your input does not match the correct number of positions');
                document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
                break;
              }
              else if(nr[2] != -1 || nr[3] != -1)
                cntPermutations++;
              else if(nr[2] == -1 && nr[3] == -1)
              {
                currentDigit = i;
                wrongDigitsGuess(1, zeroDigit);
                rightDigitsGuess(2, i);
                wrongDigitsGuess(1, zeroDigit);
                outputGuess();
                cntPermutations++;
                break;
              }   //}
          }
          if(cntPermutations == 2)
          {
            if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0 && (nr[2] == -1 && nr[3] == -1))
            {
              foundADigit(-1, i, i, -1);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
            else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
              {
                console.log('your input does not match the correct number of positions');
                document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
                break;
              }
            else if(nr[3] != -1 || nr[4] != -1)
            {
              cntPermutations++;
            }
            else if(nr[3] == -1 && nr[4] == -1)
            {
              currentDigit = i;
              wrongDigitsGuess(2, zeroDigit);
              rightDigitsGuess(2, i);
              outputGuess();
              cntPermutations++;
              break;
            }
          }
          if(cntPermutations == 3) {
            if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0 && (nr[3] == -1 && nr[4] == -1))
              {
                foundADigit(-1, -1, i, i);
                outputNumber();
                cntPermutations = 0;
                v[i] = 0;
                inputNumber = 0;
                findDigits();
                break;
              }
              else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
                {
                  console.log('your input does not match the correct number of positions');
                  document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
                  break;
                }
              else if((nr[1] != -1 || nr[3] != -1) || i == 0)
              {
                cntPermutations++;
              }
              else if(i != 0 && (nr[1] == -1 && nr[3] == -1))
              {
                currentDigit = i;
                rightDigitsGuess(1, i);
                wrongDigitsGuess(1, zeroDigit);
                rightDigitsGuess(1, i);
                wrongDigitsGuess(1, zeroDigit);
                outputGuess();
                cntPermutations++;
                break;
              }
      }
      if(cntPermutations == 4) {
        if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0 && (nr[1] == -1 && nr[3] == -1))
          {
            foundADigit(i, -1, i, -1);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            findDigits();
            break;
          }
          else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
            {
              console.log('your input does not match the correct number of positions');
              document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
              break;
            }
          else if((nr[1] != -1 || nr[4] != -1) || i == 0)
          {
            cntPermutations++;
          }
          else if(nr[1] == -1 && nr[4] == -1)
          {
            currentDigit = i;
            rightDigitsGuess(1, i);
            wrongDigitsGuess(1, zeroDigit);
            wrongDigitsGuess(1, zeroDigit);
            rightDigitsGuess(1, i);
            outputGuess();
            cntPermutations++;
            break;
          }
      }
      if(cntPermutations == 5) {
        if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0 && (nr[1] == -1 && nr[4] == -1))
          {
            foundADigit(i, -1, -1, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            findDigits();
            break;
          }
          else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
            {
              console.log('your input does not match the correct number of positions');
              document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
              break;
            }
          else if(nr[2] == -1 && nr[4] == -1)
          {
            foundADigit(-1, i, -1, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            findDigits();
            break;
          }
      }        
    }    
    }
  else if(v[i] == 3){//for v[i] == 3
    inputNumber = Number(inputNumber);
    if(inputNumber != 3 && inputNumber != 0){
      console.log('number');
      console.log(numberOfDigitsFound);
      console.log('input must be 0 or 3');
      document.getElementById('error').innerHTML = "input must be 0 or 3";
      break;
    }
    else
    {
      //if v[i] == 1/2/3 + cnt to number the permutations
      if(nr[1] != -1 && nr[2] == -1 && nr[3] == -1 && nr[4] == -1)
        {
          foundADigit(-1, i, i, i);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        }
        if(nr[2] == -1 && nr[3] == -1 && nr[1] == -1 && nr[4] != -1 && i == 0)
        {
          console.log('0 cant be the first digit, please restart game');
          document.getElementById('error').innerHTML = "0 cant be the first digit, please restart game";
          startGameButton.disabled = false;
          startGameOK = 0;
          document.getElementById("inputButton").disabled = true;
          break;
          //stop game
          
        }
        if(nr[2] == -1 && nr[3] != -1 && nr[1] == -1 && nr[4] == -1 && i != 0)
        {
          foundADigit(i, i, -1, i);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        }  
        if(nr[1] == -1 && nr[2] == -1 && nr[3] == -1 && nr[4] != -1)
        {
          foundADigit(i, i, i, -1);
          outputNumber();
          cntPermutations = 0;
          v[i] = 0;
          inputNumber = 0;
          break;
          //stop game here
        } 
        if(nr[1] == -1 && nr[2] != -1 && nr[3] == -1 && nr[4] == -1)
          {
            foundADigit(i, -1, i, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            break;
            //stop game here
          } 
        if(cntPermutations == 0)
          {
            if(nr[1] != -1 || nr[2] != -1 || nr[3] != -1)
              {cntPermutations++;
                console.log('da');
              console.log(i);
              }
            else if(i != 0)
            {
              currentDigit = i;
              rightDigitsGuess(3, i);
              wrongDigitsGuess(1, zeroDigit);
              outputGuess();
              cntPermutations++;
              break;
            }              
          }
        if(cntPermutations == 1)
          {
            if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && i != 0)
            {
              foundADigit(i, i, i, -1);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
            else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
            {
              console.log('your input does not match the correct number of positions');
              document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
              break;
            }
            else if(nr[2] != -1 || nr[3] != -1 || nr[4] != -1)
              cntPermutations++;
            else
            {
              currentDigit = i;
              wrongDigitsGuess(1, zeroDigit);
              rightDigitsGuess(3, i);
              outputGuess();
              cntPermutations++;
              break;
            }   //}
        }
        if(cntPermutations == 2)
        {
          if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0)
          {
            foundADigit(-1, i, i, i);
            outputNumber();
            cntPermutations = 0;
            v[i] = 0;
            inputNumber = 0;
            findDigits();
            break;
          }
          else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
            {
              console.log('your input does not match the correct number of positions');
              document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
              break;
            }
          else if(nr[1] != -1 || nr[2] != -1 || nr[4] != -1)
          {
            cntPermutations++;
          }
          else
          {
            currentDigit = i;
            rightDigitsGuess(2, i);
            wrongDigitsGuess(1, zeroDigit);
            rightDigitsGuess(1, i);
            outputGuess();
            cntPermutations++;
            break;
          }
        }
        if(cntPermutations == 3)
          {
            if(inputNumber == v[i] && inputsTaken[inputNumber] >= 0 && inputNumber != 0)
            {
              foundADigit(i, i, -1, i);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
            else if(inputsTaken[inputNumber] == 0 && inputNumber != 0)
              {
                console.log('your input does not match the correct number of positions');
                document.getElementById('error').innerHTML = "your input does not match the correct number of positions";
                break;
              }
            else if(nr[1] == -1 && nr[3] == -1 && nr[4] == -1)
            {
              foundADigit(i, -1, i, i);
              outputNumber();
              cntPermutations = 0;
              v[i] = 0;
              inputNumber = 0;
              findDigits();
              break;
            }
          }
      } 
    }        
  }    
}



function rightDigitsGuess(j, i){
  while(j)
    {
      aux[5 - j] = i;
      text = text + i;
      j--;
    }
}


function wrongDigitsGuess(j, i){
  while(j)
    {
      aux[5 - j] = i;
      text = text + i;
      j--;
    }
}



function outputGuess(){
  text = text + "<br>";
  document.getElementById('numberToGuess').innerHTML = text;
  console.log(text);
  guesses++;
}


function verifyInput(inputNumber){
  if(inputNumber == 0 || inputNumber == 1 || inputNumber == 2 || inputNumber == 3 || inputNumber == 4)
    return inputNumber;
  else 
    return -1;
}


function foundADigit(d1, d2, d3, d4){
  if(d1 != -1)
    nr[1] = Number(d1);
  if(d2 != -1)
    nr[2] = Number(d2);
  if(d3 != -1)
    nr[3] = Number(d3);
  if(d4 != -1)
    nr[4] = Number(d4);
}

function areAllDigitsFound(){
  var sumCorrectPositions = 0;
  for(var k = 0; k <= 9; k++)
     sumCorrectPositions += Number(v[k]);
  for(var k = 1; k <= 4; k++)
    if(nr[k] != -1)
      sumCorrectPositions += Number(1);
  if(sumCorrectPositions == 4)
    return 1;
  else
    return 0;
}


function digitsFound(){
  var sumCorrectPositions = 0;
  for(var k = 0; k <= 9; k++)
     sumCorrectPositions += Number(v[k]);
  return sumCorrectPositions;
}

//problem output
function outputNumber(){
  let number = "";
  if(nr[1] == -1)
    number = number + '*';
  else
    number = number + nr[1];
  if(nr[2] == -1)
    number = number + '*';
  else
    number = number + nr[2];
  if(nr[3] == -1)
    number = number + '*';
  else 
    number = number + nr[3];
  if(nr[4] == -1)
    number = number + '*';
  else
    number = number + nr[4];
  document.getElementById('result').innerHTML = number;
  console.log(number);
}

function startGame(){
  if(startGameOK == 1)
    {
      rightDigitsGuess(4, i);
      outputGuess(4, i);
      inputMainBody();
      startGameButton.disabled = true;
      startGameOK = 0;
      document.getElementById("inputButton").disabled = false;
    }
  else
    {
      document.getElementById('error').innerHTML = "the game has already started";
    }
}

//start game button
let startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", startGame.bind());



// de terminat partea de "ghicit", de verificat fiecare
//nr in parte daca e corect, adaugat in "nr[]"
//maybe facut un output pt asta? modificat cel actual idk
//momentan merge doar pe nr de genul 1111, 2222
//functia mainBodyAlgorithm nu functioneaza.
//rewrite first logs as errors
//de construit blurPage(); startAgain();  ?quitGame()?