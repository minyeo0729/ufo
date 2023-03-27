/* define variables */
const boss = document.querySelector(".star-svg");
const home = document.querySelector(".home-svg");
const ufo = document.querySelector(".ufo");
const introTxt = document.querySelector(".intro-text");
const inputField = document.querySelector(".answer-field");
const word = document.querySelector(".word-away");
const door = document.getElementById("path3817");
const doorred = document.getElementById("path3813");
const background = document.querySelector(".dark-bg");
const question = document.querySelector(".question");
const youSuck = document.querySelector(".you-suck");
const youSuckTxt = document.querySelector('.you-suck > p')
const answerBox = document.querySelector(".answer-box");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

const babyWidth = document.querySelector(".baby").getBoundingClientRect().width;
const babyHeight = document .querySelector(".baby").getBoundingClientRect().height;
const ufoHeight = document.querySelector(".ufo").getBoundingClientRect().height;
const ufoWidth = document.querySelector(".ufo").getBoundingClientRect().width;

const babewrap = document.querySelector(".babies");
const blue = document.querySelector(".baby-blue");
const yellow = document.querySelector(".baby-yellow");
const red = document.querySelector(".baby-red");
const green = document.querySelector(".baby-green");
const orange = document.querySelector(".baby-orange");
const babies = [blue, yellow, red, green, orange];
const ufoTL = gsap.timeline();
const homeTL = gsap.timeline();

let bebebe = [...babies]
let started = false;
let changevalue = 0;
let rightAnswer = 0;
let wrongAnswer = 0;
let formondone = false;

/* game setting */
gsap.fromTo(introTxt, 1, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1 });
gsap.fromTo(answerBox, 2, { autoAlpha: 0 }, { autoAlpha: 1 });
gsap.set(youSuck, {autoAlpha: 0})
babies.forEach((item, index) => {
  gsap.set(item, { x: 150 * index, y: -Math.random() * 120 });
});

/* game ignored */
btnNo.addEventListener("click", () => {});

/* game started */
btnYes.addEventListener("click", () => {
  started = true;
  word.classList.add("hide");
  gsap.to(inputField, 0.1, { autoAlpha: 1 });
  handleQuestion(0);
  inputField.focus();
  //   document.querySelector('.word').style.borderColor = '#DF3E3E'
});

const quiz = [ "1. 날마다 흑심을 품고 다니는 것은?", "2. 닿기만 하면 취하는 술은?", "3. 목수도 고칠 수 없는 집은?", "4. 눈이 녹으면 뭐가 될까?", "5. 세상에서 가장 빠른 닭은?", ];
const answers = ["연필", "입술", "고집", "눈물", "후다닥"];

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
  const eyes = [baby.getElementById('ellipse4603'),baby.getElementById('ellipse4636'),baby.getElementById('ellipse4605'),baby.getElementById('ellipse4638')]

  bebebe.shift();
  wrongAnswer++;

  ufoTL
    .set(ufo, { x: -500, y: -ufoHeight })
    .to("#beam", { scaleY: 0, onStart: startStyle})

    // .to(babies, {rotate: -2, repeat: -1, yoyo: true , ease: Sine.easeInOut})
    // .to(babies, {rotate: 2, repeat: -1, yoyo: true , ease: Sine.easeInOut})
    // .to(eyes, {x: -1, y: -1, yoyo: true , ease: Sine.easeInOut})
    // .to(eyes, {x: 1, y: -1, yoyo: true , ease: Sine.easeInOut, onComplete: endshake})

    

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
      homeTL.to(youSuck, {autoAlpha: 1, delay: 5})
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
      homeTL.to(youSuck, {autoAlpha: 1, delay: 5})
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

/**RND
 * - gohome에서 베이비 움직일때 모션 repeat안쓰고 계속해서 동작하는거 뭔지 
 * 
 * - snatch에서 베이비들 y 올라가기전에 눈 뱅글뱅글 
 * - snatching 되는 동안만 rotate -2 , 2 
 * - 무시하기 눌렀을때 > 베이비들 자기 자리에서 ufo위치로 소집됨
 * - 타이머 추가
 * - 끝나고 refresh()함수, 배열 클린업이라던지 처음으로 돌아가게! 
 */
