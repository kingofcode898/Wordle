Synnomlist = {
    "meadow": ["grassland","pasture","plain","praire"],
    "fragile": ["delicate","feeble","frail","weak","brittle","crumbly","flimsy"],
    "happy": ["cheerful","upbeat","contented","merry","joyful","lively","jubilant","joyful"],
    "hungry": ["starved","ravenous","starving","famished"]
}

let possibleWords = ["meadow","fragile","happy","hungry"];
let correctWords = [];
let score = 0;

const correctBox = document.getElementById('correctBox')
const home = document.getElementById('home')
const finishScreen = document.getElementById('finishScreen')
const synonym = document.getElementById('startSyn')
const game = document.getElementById('game')
const wordDisplay = document.getElementById('word')
const scoreText = document.getElementById('score')

function Synonym(){
    home.style.display = 'none'
    synonym.style.display = 'block'
}

function startSyn(){
    synonym.style.display = 'none';
    game.style.display = 'block'

    var sec = 0;
    var timer = setInterval(function(){
        document.getElementById('timerDisplay').innerHTML=sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            finishScreen.style.display = "block"
        }
        }, 1000);
    }

function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * possibleWords.length);
    const randomWord = possibleWords[randomIndex];
    
    wordDisplay.textContent = `Your word is: ${randomWord}`
    console.log(`The word is ${randomWord}`)
    return randomWord
}

function addScore(){
    score += 100
    scoreText.textContent = score
}

targetWord = generateRandomWord()

function checkIfSynonym(){
    /*get word from input
    
    check if the word is == to a word in synonym wordbase

    add it to the list of words that have been guessed and are right 
    add points occuringly 
        100 points = one word tight 
    
    else return not a synonym to result
    */
    let resultText = ""

    guess = document.getElementById('input').value

    if  (Synnomlist[targetWord].includes(guess) && !correctWords.includes(guess)) {
        correctWords.push(guess)
        //push word to correctBox
        let word = document.createElement("p");
        word.innerHTML = guess;
        word.className = 'word'
        document.getElementById("correctBox").appendChild(word);
        
        console.log(correctWords)
        addScore()
        resultText = `Correct! ${guess} is a synonym to ${targetWord}`
    }
    else if(correctWords.includes(guess)){
        resultText = "you already used that word"
    }
    else {
        resultText = "That is not a synonym"
    }
    
    document.getElementById('result-text').textContent = resultText
}

document.getElementById('input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      checkIfSynonym(); 
    }
  });

document.getElementById('homeButton').addEventListener('click', () => {
    home.style.display = 'block'
    finishScreen.style.display = 'none'
    game.style.display = 'none'
})

document.getElementById('replayButton').addEventListener('click',() =>{
    finishScreen.style.display = 'none'
    startSyn()
})
//end synonym game code