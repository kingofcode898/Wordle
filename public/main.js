document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popupContainer').style.display = 'block';
  });
  
  const popupContainer = document.getElementById('popupContainer');
  const closePopup = document.getElementById('Play');
  
  // Close the pop-up when the close button is clicked
  closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none';
  });
  
  // Add event listener to close the pop-up when clicking outside the pop-up content
  window.addEventListener('click', (event) => {
    if (event.target === popupContainer) {
      popupContainer.style.display = 'none';
    }
  });
  
  var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }))
}

function showConfetti() {
   fire(0.25, {
   spread: 26,
   startVelocity: 55, 
  });
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

function showWinscreen(){
    document.getElementById('winScreen').style.display = "block"; 
    showConfetti();
  }
  let targetWord;
  let listOfWords
  
  generateRandomWord().then(things => {
    targetWord = things[0];
    listOfWords = things[1]
  });
  
  document.getElementById('word-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      checkGuess(); // Call your function here
    }
  });
  
  document.getElementById('guess-btn').addEventListener('click', checkGuess);
  
  
  async function generateRandomWord() {
    try {
      const response = await fetch('./words.txt'); // Await the fetch operation
      const content = await response.text(); // Await the response.text() operation;
  
      const listOfWords = content.split(',');
  
      const randomIndex = Math.floor(Math.random() * listOfWords.length);
      const randomWord = listOfWords[randomIndex];
      console.log('Random word:', randomWord);
      return [randomWord, listOfWords];
  
    } catch (error) {
      console.error('Error reading the file:', error);
    }
  }
  
  let numguess = 1; // Initialize numguess outside the function
  
  function mapLetters(targetWord) {
    const alphabetMapping = {
      a: 0, b: 0, c: 0, d: 0, e: 0,
      f: 0, g: 0, h: 0, i: 0, j: 0,
      k: 0, l: 0, m: 0, n: 0, o: 0,
      p: 0, q: 0, r: 0, s: 0, t: 0,
      u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
    };
  
    for (let letter of targetWord) {
      if (alphabetMapping.hasOwnProperty(letter)) {
        alphabetMapping[letter]++;
      }
    }
  
    return alphabetMapping;
  }
  

  // Get a reference to the restart button element by its id
const restartButton = document.getElementById("restartButton");

// Add a click event listener to the button
restartButton.addEventListener("click", function() {
    // Reload the current page
    window.location.reload();
});

  
  
function checkGuess() {
  const guess = document.getElementById('word-input').value.toLowerCase();

  // Update the color of the appropriate squares based on numguess
  let square1 = document.getElementById(`square1row${numguess}`);
  let square2 = document.getElementById(`square2row${numguess}`);
  let square3 = document.getElementById(`square3row${numguess}`);
  let square4 = document.getElementById(`square4row${numguess}`);
  let square5 = document.getElementById(`square5row${numguess}`);

  const squares = [square1, square2, square3, square4, square5];

  const Lettermap = mapLetters(targetWord);

  if (guess.length !== 5) {
    document.getElementById('result').textContent = 'Please enter a 5-letter word.';
    return;
  }
  
  if (listOfWords.includes(guess) != true){
    document.getElementById('result').textContent = 'Please enter a real  5-letter word.';
    return;
  }


  let resultText = ''; // Initialize resultText
  let animationDelay = 0; // Initialize animationDelay

  for (let i = 0; i < 5; i++) {
    let square = squares[i];

    const applyAnimation = () => {
      if (guess[i] === targetWord[i]) {
        square.style.animation = "colorChangeGreen 1s";
        square.style.backgroundColor = '#45E66E';
        square.textContent = guess[i].toUpperCase();
        Lettermap[guess[i]]--; // Decrement frequency
      } else if (Lettermap[guess[i]] > 0) { //check to see if its in the word 
         let num = Lettermap[guess[i]]
         let count = 0
        //loop checks for the future instances of the letter to determine if it can light up yellow
         for(let j = i; j < (4-i);j++) {
          console.log(guess[j],targetWord[j],j)
           if (guess[i] === targetWord[j]){
             count++
          }
        }
        if(num - count <= 0) {
          square.style.animation = "noChange 1s";
          square.textContent = guess[i].toUpperCase();
        }
        else {
          square.textContent = guess[i].toUpperCase();
          square.style.animation = "colorChangeYellow 1s";
          square.style.backgroundColor = '#FFE12E';
          Lettermap[guess[i]]--;}
        }
        else {
        square.style.animation = "noChange 1s";
        square.textContent = guess[i].toUpperCase();
      }
      resultText += square.textContent; // Add the content of the square to resultText
    };

    setTimeout(applyAnimation, animationDelay);
    animationDelay += 500; // Increase the delay for the next square
  }

  if (guess === targetWord) {
    resultText = `Congratulations! You guessed the word: ${targetWord.toUpperCase()}`;
    document.getElementById('guess-btn').disabled = true;
    document.getElementById('correct').textContent = targetWord.toUpperCase();
    showWinscreen();
  } else if (numguess >= 5) {
    resultText = `Sorry, you ran out of guesses. The word was ${targetWord}`;
    document.getElementById('guess-btn').disabled = true;
  }

  document.getElementById('result').textContent = resultText; // Update the result display

  numguess++;
}

  