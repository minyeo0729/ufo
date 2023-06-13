/* define variables */
const Selector = (classname) => {
  return document.querySelector(classname)
}
const boss = Selector(".star-svg");
const home = Selector(".home-svg");
const ufo = Selector(".ufo");
const introTxt = Selector(".intro-text");
const inputField = Selector(".answer-field");
const word = Selector(".word-away");
const door = document.getElementById("path3817");
const doorred = document.getElementById("path3813");
const background = Selector(".dark-bg");
const question = Selector(".question");
const youSuck = Selector(".you-suck");
const youSuckTxt = Selector('.you-suck > p')
const answerBox = Selector(".answer-box");
const btnYes = Selector(".btn-yes");

const babyWidth = Selector(".baby").getBoundingClientRect().width;
const babyHeight = Selector(".baby").getBoundingClientRect().height;
const ufoWidth = Selector(".ufo").getBoundingClientRect().width;
const ufoHeight = Selector(".ufo").getBoundingClientRect().height;

const babewrap = Selector(".babies");
const blue = Selector(".baby-blue");
const yellow = Selector(".baby-yellow");
const red = Selector(".baby-red");
const green = Selector(".baby-green");
const orange = Selector(".baby-orange");
const babies = [blue, yellow, red, green, orange];
const ufoTL = gsap.timeline();
const homeTL = gsap.timeline();

let bebebe = [...babies]
let started = false;
let changevalue = 0;
let rightAnswer = 0;
let wrongAnswer = 0;

/* game setting */
gsap.fromTo(introTxt, 1, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1 });
gsap.fromTo(answerBox, 2, { autoAlpha: 0 }, { autoAlpha: 1 });

babies.forEach((item, index) => {
  let windowSize = window.innerWidth;
  let babySize = 80
  if(windowSize < 540){
    babySize = 0
    gsap.set(item, { x: babySize * index, y: -Math.random() * 80 });
  }else if(windowSize < 860){
    babySize = 10
    gsap.set(item, {  x: babySize * index, y: -Math.random() * 120 });
  }else{
    gsap.set(item, { x: babySize * index, y: -Math.random() * 120 });
  }
});

/* game started */
btnYes.addEventListener("click", () => {
  started = true;
  word.classList.add("hide");
  gsap.to(inputField, { autoAlpha: 1});
  handleQuestion(0);
  inputField.focus();
});

const quiz = [ "1 + 1", "2 + 2", "3 + 3", "4 + 4", "5 + 5" ];
const answers = ["2", "4", "6", "8", "10"];

if ((started = true)) {
inputField.addEventListener("change", (e) => {
  let getinputvalue = inputField.value;
  changevalue++;
  function playAction(value, index, baby) { 
    if (getinputvalue == value) {
      handleQuestion(index);
      goHome(baby);
    }
    if (getinputvalue !== value) {
      alert("YOU SUCK!!!");
      handleQuestion(index);
      snatch(baby);
    }
  }

  for (let i = 0; i < quiz.length; i++) {
    if (changevalue == i + 1) {
      playAction(answers[i], i + 1, babies[i]);
    }
  }

});
}

/* motion */
function snatch(baby) {
  bebebe.shift();
  wrongAnswer++;

  ufoTL
    .set(ufo, { x: -500, y: -ufoHeight })
    .to("#beam", { scaleY: 0, onStart: startStyle})
    .to(ufo, 2, { opacity: 1, x: whereBabyAtX(baby), y: whereBabyAtY(baby) })
    .to("#beam", 0.3, { scaleY: 1, opacity: 1 })
    .to("#lights > *", { ease: "sine.inOut", fill: "#BF40BF", duration: 0.3, stagger: { each: 0.2, from: "center", yoyo: true, repeat: 5 }, })
    .to( baby, 2.5, { rotation: 360, y: gsap.getProperty(ufo, "y") + babyHeight, autoAlpha: 0, }, "-=2.5" )
    .to("#beam", 0.3, { scaleY: 0, opacity: 0 }, "-=0.5")
    .to(ufo, 1, { x: document.body.clientWidth, y: -ufoHeight, onComplete: resetStyle, });

    if(bebebe.length == 0){
      homeTL.to(inputField, { autoAlpha: 0 },"-=2");
      homeTL.to(question, { autoAlpha: 0},"-=2.2");
    }
    if(wrongAnswer == 5){
      homeTL.to(youSuck, {display:"flex", delay: 5})
    }
}

function goHome(baby) {
  bebebe.shift();
  rightAnswer++;
  homeTL
    .set(baby, {zIndex: 9999})
    .to(baby, {rotate: -25, yoyo: true , ease: Sine.easeInOut})
    .to(baby, {rotate: 25, yoyo: true , ease: Sine.easeInOut})
    .to(baby, {y: door.getBoundingClientRect().top - babewrap.getBoundingClientRect().top, onStart: startStyle })
    .to(baby, 3, {x: doorred.getBoundingClientRect().left - baby.getBoundingClientRect().left + gsap.getProperty(baby, "x"), ease: Sine.easeInOut}, "-=0.5" )
    .to(baby, {autoAlpha: 0, onComplete: resetStyle });
    if(bebebe.length == 0){
      homeTL.to(inputField, {autoAlpha: 0},"-=2");
      question.style.fontFamily = "Bungee", "cursive";
      question.style.fontSize = 20;
      question.innerHTML = `You saved ${rightAnswer} babies!`;
    }
    if(rightAnswer == 5){
      homeTL.to(youSuck, {display: "flex", delay: 5})
      youSuckTxt.innerHTML = 'AMAZING!!';
    }
}

/* functions */
function handleQuestion(index) {
  question.innerHTML = "";
  inputField.value = "";
  question.append(quiz[index]);
}

function whereBabyAtX(baby) {
  const getBabyX =
    baby.getBoundingClientRect().left - ufoWidth / 2 + babyWidth / 2;
  return getBabyX;
}

function whereBabyAtY(baby) {
  const getBabyY =
    baby.getBoundingClientRect().top -
    ufoHeight +
    gsap.getProperty(baby, "height");
  return getBabyY;
}

function startStyle() {
  document.getElementById("input").setAttribute("disabled", true);
  background.classList.remove("hide");
}

function resetStyle() {
  background.classList.add("hide");
  inputField.removeAttribute("disabled");
  inputField.focus();
}
