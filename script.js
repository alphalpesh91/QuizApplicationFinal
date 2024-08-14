
// const registerBtn=document.getElementById("registerBtn")
// registerBtn.addEventListener("click",register)

function login(){
    let userName=document.getElementById('username').value
    let password=document.getElementById('finalpassword').value
    // const userData = JSON.parse(localStorage.getItem(username)) || [];
    const userDataString = localStorage.getItem(userName);
    const userData = JSON.parse(userDataString);

// Check if userData is valid and contains the required fields
if (userData) {
    let userName1 = userData.userName;
    let password1 = userData.password;

    console.log('Stored User Name:', userName1);
    console.log('Stored Password:', password1);

    // Validate the credentials
    if (userName === userName1 && password === password1) {
        window.location.replace("quizCreate.html");
        window.alert("Login done");
    } else {
        window.alert("Invalid credentials");
    }
} else {
    window.alert("No user data found");
}
    
}


function register(){
    let userName=document.getElementById('username').value
    let email=document.getElementById('email').value
    let password=document.getElementById('userPassword').value
    if(userName && password && email)
    {
        const userObject={
            userId:Math.random(),
            userName:userName,
            email:email,
            password:password
        }
        store(userObject)
        window.location.replace("quizCreate.html");
    }
    else
    {
        window.alert("Please add all the fields")
    }
    
}
function store(userObject)
{
    localStorage.setItem(userObject.userName,JSON.stringify(userObject))
}

// const addQues=document.getElementById("addQuestion")
// addQues.addEventListener("click",addQuestion)
let questions = [];
function addQuestion() {
    const questionText = document.getElementById('question').value;
    const optionsText = document.getElementById('options').value;
    const correctIndex = parseInt(document.getElementById('correct').value, 10);
    const options = optionsText.split(',').map(opt => opt.trim());

    if(questionText && optionsText && correctIndex)
    {
        questions.push({
            question: questionText,
            options: options,
            correct: correctIndex
        });
    
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
    
        document.getElementById('question').value = '';
        document.getElementById('options').value = '';
        document.getElementById('correct').value = '';
    
        generateLink();
    }
    else if(correctIndex==0)
    {
        questions.push({
            question: questionText,
            options: options,
            correct: correctIndex
        });
    
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
    
        document.getElementById('question').value = '';
        document.getElementById('options').value = '';
        document.getElementById('correct').value = '';
    
        generateLink();
    }
    else
    {
        window.alert("Please add all the fields properly")
    }
   
}
function generateLink() {
    const link = document.createElement('a');
    link.href = 'quiz.html';
    link.textContent = 'Click here to take the quiz!!';
    link.style.color="red"
    document.getElementById('link').innerHTML = '';
    document.getElementById('link').appendChild(link);
}
// Function to load questions from localStorage and display them
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    const quizContainer = document.getElementById('quiz');
    questions.forEach((q,index) => {
        // console.log(q)
        // console.log(index)
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((opt, i) => `
                <input type="radio" name="q${index}" value="${i}"> ${opt}<br>
            `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Function to submit the quiz and display the result
function submitQuiz() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value, 10) === q.correct) {
            score++;
        }
    });
    document.getElementById('result').textContent = `Your score: ${score} / ${questions.length}`;
}

// Load questions when the page loads
window.onload = loadQuestions;

