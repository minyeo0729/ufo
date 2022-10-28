/* define variables */
const boss = document.querySelector('.star-svg')
const home = document.querySelector('.home-svg')
const ufo = document.querySelector('.ufo')
const introTxt = document.querySelector('.intro-text')
const inputField = document.querySelector('.answer-field')
const word = document.querySelector('.word-away')
const door = document.getElementById('path3817')
const background = document.querySelector('.dark-bg')

const question = document.querySelector('.question')
const quiz  = ['1. 날마다 흑심을 품고 다니는 것은?','2. 닿기만 하면 취하는 술은?','3. 목수도 고칠 수 없는 집은?','4. 눈이 녹으면 뭐가 될까?','5. 세상에서 가장 빠른 닭은?'];
const answers = ['연필','입술','고집','눈물','후다닥']

const babyWidth = document.querySelector('.baby').getBoundingClientRect().width
const babyHeight = document.querySelector('.baby').getBoundingClientRect().height
const ufoHeight = document.querySelector('.ufo').getBoundingClientRect().height
const ufoWidth = document.querySelector('.ufo').getBoundingClientRect().width

const babewrap = document.querySelector('.babies')
const blue = document.querySelector('.baby-blue')
const yellow = document.querySelector('.baby-yellow')
const red = document.querySelector('.baby-red')
const green = document.querySelector('.baby-green')
const orange = document.querySelector('.baby-orange')
const babies = [blue, yellow, red, green, orange ]

const answerBox = document.querySelector('.answer-box')
const btnYes = document.querySelector('.btn-yes')
const btnNo = document.querySelector('.btn-no')

const ufoTL = gsap.timeline();
const homeTL = gsap.timeline();

let started = false; 
let changevalue = 0;

/* animating intro text */
gsap.fromTo(introTxt, 1, {opacity: 0, scaleX: 0}, {opacity: 1, scaleX: 1});
gsap.fromTo(answerBox, 2, {autoAlpha: 0}, {autoAlpha: 1});

/* spread babies randomly */
babies.forEach((item, index)=>{
    gsap.set(item, { x: 150 * index, y: -randomY()} )    
})

/* game start */
btnYes.addEventListener('click', ()=>{
    started = true;
    word.classList.add('hide');
    gsap.to(inputField, 0.1, {autoAlpha: 1});
    handleQuestion(0);
    inputField.focus();

})
btnNo.addEventListener('click', ()=>{
    //snatch all the babies 
})

if(started = true){
    inputField.addEventListener('change',(e)=>{
        let getinputvalue = inputField.value;
        changevalue ++;
        function playAction(value, index, baby){
            if(getinputvalue == value){
                resetInputField();
                handleQuestion(index);
                goHome(baby)
                return;
            }
            if(getinputvalue !== value){
                alert('YOU SUCK!!!');                
                resetInputField();
                handleQuestion(index);
                snatch(baby)
            }
        }
        
        if(changevalue == 1){playAction(answers[0],1,blue);}
        if(changevalue == 2){playAction(answers[1],2,yellow)}
        // if(changevalue == 3){playAction(answers[2],3,red)}
        // if(changevalue == 4){playAction(answers[3],4,green)}
        // if(changevalue == 5){playAction(answers[4],5,orange)}
        //이거 for문 돌리면 깔끔하지않을까
        
    })
}




/* functions */
function snatch(baby){
    ufoTL.set(ufo, { x: -500, y: -ufoHeight}) 
         .to("#beam", { scaleY: 0 ,onStart: resetStyle })
         .to(ufo, 2, { opacity: 1, x: whereBabyAtX(baby), y: whereBabyAtY(baby) })   
         .to("#beam", 0.3,{ scaleY: 1, opacity:1 })
         .to( "#lights > *",{ ease: "sine.inOut", fill: "#BF40BF", duration: 0.3, stagger: { each: 0.2, from: "center", yoyo: true, repeat: 5 } })
         .to(baby, 2.5,{rotation:360, y: gsap.getProperty(ufo, "y") + babyHeight, autoAlpha:0}, "-=2.5")
         .to("#beam", 0.3,{ scaleY: 0, opacity:0 }, "-=0.5")
         .to(ufo, 1,{x: document.body.clientWidth ,  y: -ufoHeight, onComplete: resetValue })
}
function goHome(baby){
    homeTL.set(baby,{zIndex:9999})
          .to(baby, {onStart: resetStyle})
          .fromTo(baby, 0.8,{rotation: -25}, {rotation: 25, repeat:-1, yoyo: true, ease: Sine.easeInOut},"-=0.3")
          .to(baby, { y: door.getBoundingClientRect().top - babewrap.getBoundingClientRect().top})
          .to(baby, 5.5,{x: home.getBoundingClientRect().left + (babyWidth * 2), ease: Sine.easeInOut},"-=0.8")
          .to(baby, {autoAlpha: 0, onComplete: resetValue},"-=0.5")
}

function whereBabyAtX(baby){
    const getBabyX = baby.getBoundingClientRect().left - (ufoWidth / 2) + (babyWidth / 2)
    return getBabyX;
}

function whereBabyAtY(baby){
    const getBabyY = baby.getBoundingClientRect().top - ufoHeight + gsap.getProperty(baby,"height");
    return getBabyY;
} 

function randomY(){ return Math.random()* 120 }

function handleQuestion(index){
    question.append(quiz[index])
}

function resetInputField(){
    question.innerHTML='';
    inputField.value='';
    document.getElementById('input').setAttribute('disabled',true);

}

function resetStyle(){
    background.classList.remove('hide');
}

function resetValue(){
    inputField.removeAttribute("disabled"); 
    inputField.focus();
    background.classList.add('hide');
}

/**
 * 1. 다섯개 다 틀리면 까만 화면 덮으면서 글자 떨어지면서 왕 크게 you suck인데 easing 흔들리는거 넣어줌 
 * 2. 몇명은 구했으면 you saved 'n' 
 * 3. 다구했으면 폭죽나오고 파티~ 
 * 4. 무시하기 눌렀을때 스타가 엄청 커지면서 뭐 어떤 모션? 
 * 5. 반응형
 * 6. 함수 파일 쪼개기 및 코드 정리
 * 7. mywp에 올리기
 * 
 * 아 ufo나타나기전에 베이비들 달달 떠는거 어떰???
 * 
 */