'use strict'
const questData = [
  { // call this quest[0].Question/ quest[0].Answer[0 ~ 3];
    Question:"Your lane position should:", 
    Answer:[
      "Offer a good view of the shoulder",
      "Offer a poor view of road hazards",
      "Avoid other’s blind spots",
      "Invite others to use your lane"
    ],
    rightAnswer:"Avoid other’s blind spots"
  },
  {
    Question:"When approaching an uneven surface, you should:", 
    Answer:[
      "Swerve quickly",
      "Make sure the motorcycle is leaning to one side.",
      "Speed up",
      "Rise slightly off the seat to allow your legs to absorb the shock"
    ],
    rightAnswer:"Rise slightly off the seat to allow your legs to absorb the shock"
  },
  {
    Question:"Riding in the far side of a lane may allow you to only be seen in a vehicle’s side mirrors.", 
    Answer:[
      "This is illegal becasue you have to drive in the center portion of the lane",
      "This is acceptable because you will be seen",
      "This is not acceptable because people seldom use their side mirrors",
      "This is acceptable, since you will be visible in one of a vehicle’s mirrors."
    ],
    rightAnswer:"This is not acceptable because people seldom use their side mirrors"
  },
  {
    Question:"To swerve correctly:", 
    Answer:[
      "Press the handlegrip in the opposite direction of the turn",
      "Turn the handlebars quickly",
      "Press the handlegrip in the direction of the turn",
      "Shift your weight quickly"
    ],
    rightAnswer:"Press the handlegrip in the direction of the turn"
  },
  {
    Question:"A passenger on a motorcycle should", 
    Answer:[
      "Mount the motorcycle before the engine starts",
      "Hold onto the seat",
      "Sit as close to the rear as possible",
      "Mount the motorcycle after the engine starts"
    ],
    rightAnswer:"Mount the motorcycle before the engine starts"
  },
  {
    Question:"Which of the following is not a way to prevent a friend from drinking and driving?", 
    Answer:[
      "Get other friends involved",
      "Arrange for a safe ride for them",
      "Allow them to wait 15 minutes after their last drink before driving",
      "Get them involved in other activities, instead of drinking"
    ],
    rightAnswer:"Allow them to wait 15 minutes after their last drink before driving"
  },
  {
    Question:"When should the rearview mirror be adjusted?", 
    Answer:[
      "Before starting the motorcycle",
      "While riding",
      "During the ride",
      "When you get off the motorcycle"
    ],
    rightAnswer:"Before starting the motorcycle"
  },
  {
    Question:"Before carrying a passenger for the first time in traffic, what should you do?", 
    Answer:[
      "Ride on the shoulder",
      "Read books about carying a passenger",
      "Practice on a quiet road",
      "Flash your lights so others see you"
    ],
    rightAnswer:"Practice on a quiet road"
  },
  {
    Question:"When driving a motorcycle in the city, your attention should be", 
    Answer:[
      "Focused behind you",
      "Focused about a half block to full block ahead of you",
      "Focused about 10 feet ahead of you",
      "Less focused than when on a highway"
    ],
    rightAnswer:"Focused about a half block to full block ahead of you"
  },
  {
    Question:"Maximum straight-line braking is done by:", 
    Answer:[
      "Using both front and rear brakes while locking the rear wheel",
      "Using only the rear brake",
      "Using both the front and rear brakes without locking either wheel",
      "Using only the front brake"
    ],
    rightAnswer:"Using both the front and rear brakes without locking either wheel"
  }
];  

function runIntroPage(){
  console.log("runIntroPage ran.");
  $('.container').html(`
    <h3>Massachusetts Motorcycle Class M License Practice</h3>
    <h4>Introduction our free Massachusetts Motorcycle Class M License Practice exam. All of these questions is based on the information found in the Commonwealth of Massachusetts Motorcycle Manual. Answering the questions on this practice test will help you prepare for the state exam. For the most accurate results, thoroughly read and the study the motorcycle manual before answering these practice questions.<br> Happy studying!</h4>
    <button class="click-start" type="button">Start the quizz</button>`);
  handleClickStartQuiz();
}

function handleClickStartQuiz(){
  $('.click-start').click(function(event) {
    console.log("Clicked to start Quiz.");
    runQuestPage();});
}

let currentQuestionIndex = -1;
let countCorrectAnswered = 0;

function runQuestPage(){
  currentQuestionIndex++;
  if (currentQuestionIndex == 10)    {
    return runResultPage();
  }
  console.log(`QuestionPage ran showing question : ${currentQuestionIndex + 1}.`);
  $('.container').html(generateQuestElement(questData,currentQuestionIndex));
  displayCurrentResult();
  handleClickSubmitAnswer();
}

function handleClickSubmitAnswer(){
  $('button').click(event => {
  console.log('clicked submit answer'); 
  const select =$('input[name=answer]:checked','.question-form').val();
  if( select >= 0 && select <4)
    checkAnswer(select);
  else {
    currentQuestionIndex--;
    $('.container').html(modalPrevent());
    modalBox();
  }}); 
}

function generateQuestElement(item, itemIndex){
  return `
    <h2>Question ${itemIndex+1} :</h2>
    <section class="question-content">
      <form class="question-form">
        <label>${item[itemIndex].Question}</label><br>
        <fieldset>
          <legend>
            <label class="choice"><input type="radio" name="answer" value=0>${item[itemIndex].Answer[0]}</label>
            <label class="choice"><input type="radio" name="answer" value=1>${item[itemIndex].Answer[1]}</label>
            <label class="choice"><input type="radio" name="answer" value=2>${item[itemIndex].Answer[2]}</label>
            <label class="choice"><input type="radio" name="answer" value=3>${item[itemIndex].Answer[3]}</label>
            <button class="Submit-button" type="button">Submit Answer</button>
          </legend>
        <fieldset>
      </form>
    </section>
  `;
}

function checkAnswer(userAnswer){
  if ( questData[currentQuestionIndex].Answer[userAnswer] === questData[currentQuestionIndex].rightAnswer){
    countCorrectAnswered++;
    $('.container').html(modalContent("Correct", userAnswer));
    modalBox();
  }
  else{
    $('.container').html(modalContent("Incorrect", userAnswer));
    modalBox();
  }
}

function modalBox(){
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
    runQuestPage();
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      runQuestPage();
    }
  };
}

function modalContent(text, userAnswer){
  return `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>${text}</h2>
        </div>
        <div class="modal-right-answer">
          <h3>Correct answer: ${questData[currentQuestionIndex].rightAnswer}</h3>
        </div>
    ${ text == "Incorrect" ? `
        <div class="modal-white">
          <p>Your answer: ${questData[currentQuestionIndex].Answer[userAnswer]}</p>
        </div>
      </div>
    </div` :` 
      </div>
    </div>`}`
  ;
}

function modalPrevent(){
  return`
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-white">
          <span class="close">&times;</span>
          <p>Please pick an answer.</p>
        </div>  
      </div>
    </div> 
  `;
}


function displayCurrentResult(){
  $('.container').append(`
    <div class="right-answer bottom-box">
      <p>Right answered: ${countCorrectAnswered}/${currentQuestionIndex}</p>
    </div>
    <div class="question-left bottom-box">
      <p>Question${ currentQuestionIndex >= 8 ? "":'s'}
      left: ${9-currentQuestionIndex}</p>
    </div>`
  );
  $('.container').css("padding-bottom","110px");
}

function runResultPage(){
  console.log("Result page ran.");
  $('.container').html(`
    <h2>Result</h2>
    <h3>Correct question${countCorrectAnswered < 2 ? '':'s'} answered: ${countCorrectAnswered}</h3>
    <h3>${countCorrectAnswered == 10 ? "Perfect": "Answered wrong: " + (10-countCorrectAnswered)}</h3>
    <button class="click-restart" type="button">Restart the quiz</button>`);
  $('.click-restart').click(function(event) {
    console.log("Clicked to restar Quiz.");
    currentQuestionIndex = -1;
    countCorrectAnswered = 0;
    runQuestPage() ;
  });  
}  

$(runIntroPage());

