const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question:'Who is the first pakistani ti hit century in T20 cricket?',
    choice1:'Kamran Akmal',
    choice2:'Shahid Afridi',
    choice3:'Ahmad Shahzad',
    choice4:'Mohmmad Rizwan',
    answer:3
  },
  {
    question:'India played first test match against?',
    choice1:'England',
    choice2:'Pakistan',
    choice3:'South Africa',
    choice4:'Australia',
    answer:1
  },
  {
    question:'Who has taken the highest number of wickets in Test Cricket?',
    choice1:'Muttiah Muralidharan',
    choice2:'Shane Warne',
    choice3:'Anil Kumble',
    choice4:'Shoib Akter',
    answer:1
  },
  {
    question:'In which city was the Sri Lankan cricket team attacked in march 2009?',
    choice1:'Lahore',
    choice2:'Kbul',
    choice3:'Colombo',
    choice4:'Karachi',
    answer:1
  },
  {
    question:'Wankhede cricket stadium is situated in?',
    choice1:'Chandigarh',
    choice2:'Mumbai',
    choice3:'Chennai',
    choice4:'Bangalore',
    answer:2
  },
  {
    question:'Who won the first women world cup?',
    choice1:'Australia',
    choice2:'New Zealand',
    choice3:'England',
    choice4:'India',
    answer:3
  },
  {
    question:'What is the middle name of Rahul Darvid?',
    choice1:'Naren',
    choice2:'Sharad',
    choice3:'Srivastav',
    choice4:'Shyam',
    answer:2
  }
];
const correctBonus = 10;
const maxQuestions= 7;
startGame = ()=>{
  questionounter = 0;
  score = 0;
  availableQuestions=[...questions];
  getNewQuestion();
};
getNewQuestion = ()=>{
  if(availableQuestions.length===0|| questionCounter>maxQuestions){
    // Go to the end page
    localStorage.setItem('mostRecentScore',score);
    return window.location.assign('./end.html');
  }

  questionCounter++;
  questionCounterText.innerText = `Question:${questionCounter}/${maxQuestions}`;
  // UpdateThe progressBar
  progressBarFull.style.width =`${(questionCounter/maxQuestions)*100}%`;
  const questionIndex = Math.floor(Math.random()*availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(choice=>{
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionIndex,1);
  console.log(availableQuestions);
  acceptingAnswers = true;
};
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    const classToApply = selectedAnswer==currentQuestion.answer ? 'correct':'incorrect';
    if(classToApply=='correct'){
      incrementScore(correctBonus);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },300);
  });
});
incrementScore = num =>{
  score+=num;
  scoreText.innerText=score;
}
startGame();
