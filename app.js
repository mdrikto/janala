

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availablaOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){


    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;



    const questionTndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionTndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = availableQuestions.indexOf(questionTndex);

    availableQuestions.splice(index1,1);



    const optionlen = currentQuestion.options.length

    for(let i=0; i<optionlen; i++){
        availablaOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    
    for(let i=0; i<optionlen; i++){
        const optionIndex = availablaOptions[Math.floor(Math.random() * availablaOptions.length)];

        const index2 = availablaOptions.indexOf(optionIndex);
        availablaOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);

    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers)
    }
    else{
        element.classList.add("wrong");

        updateAnswerIndicator("wrong");

        const optionlen = optionContainer.children.length;
        for(let i=0; i<optionlen; i++){
            if(parseInt(optionContainer.children[i].id) ===currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionlen = optionContainer.children.length;
    for(let i=0; i<optionlen; i++){
        optionContainer.children[i].classList.add("already-answerd");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div")
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}
function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

window.onload = function(){

    setAvailableQuestions();

    getNewQuestion();

    answersIndicator();
}