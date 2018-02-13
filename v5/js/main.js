var q1 = {};
q1.question = "Hver senti Teslu út í geim?";
q1.answeres = ['Elon Musk', 'Harrison ford', 'Bill gates', 'Nikola Tesla'];
q1.right = 0;

var q2 = {};
q2.question = "Javascript er betra en python";
q2.answeres = ['True', 'False'];
q2.right = 0;

let counter = 0;

let points = 0;

let cont = document.getElementById("container");

var stuff = "";
stuff = '<div class="top"><h1 class="GameName">Quiz game</h1></div><div class="middle"><div class="left"><h3 class="smallText">Time</h3>';

if(counter == 0){
    stuff += '<h1 class="numbers" id="time">0</h1></div><div class="center"><p class="smallText" id="questionAmount">1/2</p>';
    stuff += '<h2 class="question" id="question">' + q1.question + '</h2>';
    
    stuff += '</div><div class="right"><h3 class="smallText">Points</h3>';
    
    stuff += '<h1 class="numbers" id="points">' + points + '</h1>';
    
    stuff += '</div></div></div><div class="bottom" id="bottom">';
    
    for(let i=0; i < q1.answeres.length; i++){
        stuff += '<a class="btn">' + q1.answeres[i] + '</a>';
    }
    
    stuff += '</div>';
    cont.innerHTML = stuff;
}