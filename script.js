const questions = [
    {
        question: "Which built-in method sorts the elements of an array?",
        anwsers: [
            {text: "changeOrder(order)", correct: false},
            {text: "order()", correct: false},
            {text: "sort()", correct: true},
            {text: "arrange()", correct: false},
        ]
    },
    {
        question: "How do you round the number 7.25 to the nearest integer in JavaScript?",
        anwsers: [
            {text: "round(7.25)", correct: false},
            {text: "Math.round(7.25)", correct: true},
            {text: "Math.rnd(7.25)", correct: false},
            {text: "rnd(7.25)", correct: false},
        ]
    },
    {
        question: "What is the default display value of the `<div>` element?",
        anwsers: [
            {text: "inline", correct: false},
            {text: "block", correct: true},
            {text: "inline-block", correct: false},
            {text: "none", correct: false},
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        anwsers: [
            {text: "`function:myFunction()`", correct: false},
            {text: "`function = myFunction()`", correct: false},
            {text: "`function myFunction()`", correct: true},
            {text: "`create myFunction()`", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to call a JavaScript function named `myFunction`?",
        anwsers: [
            {text: "call myFunction()", correct: false},
            {text: "myFunction()", correct: true},
            {text: "call function myFunction()", correct: false},
            {text: "Call.myFunction()", correct: false},
        ]
    },
    {
        question: "What does HTML stand for?",
        anwsers: [
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "Hyperlinking Text Markup Language", correct: false},
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        anwsers: [
            {text: " Django", correct: false},
            {text: "Ruby on Rails", correct: false},
            {text: "React", correct: true},
            {text: "Laravel", correct: false},
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.anwsers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
 
startQuiz(); 