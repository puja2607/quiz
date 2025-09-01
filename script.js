
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");
const answersScreen = document.getElementById("answers-s");


const sb= document.getElementById("sb");

function hideallScreens()
{
    document.querySelectorAll(".screen").forEach(screen => {screen.style.display="none"; });
}

sb.addEventListener("click",() => { hideallScreens();
    quizScreen.style.display="block" ;
    loadQuestion();
 })

 quiz_data=[
    {question: " Which of the following is NOT a valid C data type?", options:["int","char","String","float"],correct:"String"},
    {question: "What is the default value of an uninitialized global variable in C?", options:["Garbage Value",0,-1,"undefined"],correct:0},
    {question: "Which file is generated after pre-processing of a C program?", options:[".p",".i",".o",".m"],correct:".i" },
    {question: "Which keyword is used to prevent any changes in the variable within a C program?" , options:["immutable","Mutable","Const","volatile"],correct:"Const"},
    {question: "Which of the following is used to free dynamically allocated memory in C? ",options:["malloc()","calloc()","realloc()","free()"],correct:"free()"}
 ]

 let currentQuestionIndex=0;
 let userAnswers=[]

const questionEl= document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prev-b");
const nextBtn = document.getElementById("next-b");




function loadQuestion(){

    const currentquestion= quiz_data[currentQuestionIndex];
    questionEl.textContent=`Q${currentQuestionIndex + 1}: ${currentquestion.question}`;

    optionsEl.innerHTML="";

currentquestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.classList.add("option");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${currentQuestionIndex}`;
    radio.value = option;

    if (userAnswers[currentQuestionIndex] === option) {
        radio.checked = true;
    }

    radio.addEventListener("change", () => {
        userAnswers[currentQuestionIndex] = option;
    });

    label.appendChild(radio);
    label.append(" " + option); // text after radio
    optionsEl.appendChild(label);
});

prevBtn.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === quiz_data.length - 1) {
        nextBtn.innerText = "Submit";
    } else {
        nextBtn.innerText = "Next";
    }
    }


prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quiz_data.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } 
    else {
        // last question → submit
        let score = 0;
        quiz_data.forEach((q, i) => {
            if (userAnswers[i] === q.correct) score++;
        });
        quizScreen.style.display="none";

        
        resultScreen.style.display="block";

        document.getElementById("score").innerText =
            `Your score: ${score} / ${quiz_data.length}`;
    }});
        
    const restartbtn = document.getElementById("restart-b");
restartbtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    userAnswers = [];
    hideallScreens();
    quizScreen.style.display = "block";
    loadQuestion();
});


const viewAnswersBtn = document.getElementById("view-ans");
viewAnswersBtn.addEventListener("click", () => {
    hideallScreens();
    answersScreen.style.display = "block";

        const summaryEl = document.getElementById("answers");
        summaryEl.innerHTML = ""; 

        quiz_data.forEach((q, i) => {
        const div = document.createElement("div");
        div.classList.add("answer-review");

        div.innerHTML = `
            <p><b>Q${i+1}: ${q.question}</b></p>
            <p>Your Answer: <span style="color:${userAnswers[i] === q.correct ? 'green':'red'}">
                ${userAnswers[i] || "Not Attempted"}
            </span></p>
            <p>Correct Answer: <span style="color:green">${q.correct}</span></p>
        `;

        summaryEl.appendChild(div);
});
    }
);

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
    hideallScreens();
    resultScreen.style.display = "block";  
});





loadQuestion();
function showResultScreen() {
    console.log("Quiz completed!", userAnswers);
    
}