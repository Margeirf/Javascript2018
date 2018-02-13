var q1 = {};
q1.question = "Hver senti Teslu út í geim?";
q1.answeres = ['Elon Musk', 'Harrison ford', 'Bill gates', 'Nikola Tesla'];
q1.right = 0;

var q2 = {};
q2.question = "Javascript er betra en python";
q2.answeres = ['True', 'False'];
q2.right = 0;

let counter = 0;

let question = document.getElementById("question");
let time = document.getElementById("time");
let points = document.getElementById("points");
let bottom = document.getElementById("bottom");
let questionAmount = document.getElementById("questionAmount");

var buttons = "";

if(counter == 0){
    question.textContent = q1.question;
    for(let i=0; i < q1.answeres.length; i++){
        buttons += '<a class="btn">' + q1.answeres[i] + '</a>';
    }
    bottom.innerHTML = buttons;
    console.log(bottom);
}