const boss = document.querySelector('.star-svg')
const ufo = document.querySelector('.ufo')
const introTxt = document.querySelector('.intro-text')
const inputField = document.querySelector('.answer-field')

const babyWidth = document.querySelector('.baby').getBoundingClientRect().width
const ufoHeight = document.querySelector('.ufo').getBoundingClientRect().height
const ufoWidth = document.querySelector('.ufo').getBoundingClientRect().width

const blue = document.querySelector('.baby-blue')
const yellow = document.querySelector('.baby-yellow')
const red = document.querySelector('.baby-red')
const green = document.querySelector('.baby-green')
const orange = document.querySelector('.baby-orange')


const babies = [blue, yellow, red, green, orange ]

const answer = document.querySelector('.answer')
const btnYes = document.querySelector('.btn-yes')
const btnNo = document.querySelector('.btn-no')

/* animating intro text */
gsap.fromTo(introTxt, 1, {opacity: 0, scaleX: 0}, {opacity: 1, scaleX: 1});
gsap.fromTo(answer, 2, {autoAlpha: 0}, {autoAlpha: 1});

/* spread babies randomly */
function randomY(){ return Math.random()* 100 }
babies.forEach((item, index)=>{
    gsap.set(item, {x: 150 * index, y: randomY()} )    
})

/* start game */
let started = false; 
const ufoTL = gsap.timeline();
let next = false;

btnYes.addEventListener('click', ()=>{
    
    started = true
    if(started == true){
        //focus to input -> better ux :) 
        introTxt.innerHTML= '1. 아몬드가 죽으면?';
        //z-index click issue, hide display:none; 
        answer.classList.add('hide');
        gsap.to(inputField, 0.1, {autoAlpha: 1})

        function whereBabyAtX(baby){
            const getBabyX = baby.getBoundingClientRect().left - (ufoWidth / 2) + (babyWidth / 2)
            return getBabyX;
        } 

        function whereBabyAtY(baby){
            const getBabyY = baby.getBoundingClientRect().top - ufoHeight + gsap.getProperty(baby,"height");
            return getBabyY;
        } 
        
        let changevalue = 1;

        function snatch(baby){
            ufoTL.from(ufo, { x: -document.body.clientWidth, y: -ufoHeight }) 
                 .from("#beam", { scaleY: 0 })
                 .to(ufo, 2, { opacity: 1, x: whereBabyAtX(baby), y: whereBabyAtY(baby) })   
                 .to("#beam", 0.5,{ scaleY: 1, opacity:1 })
                 .to( "#lights > *",{ ease: "sine.inOut", fill: "#BF40BF", duration: 0.3, stagger: { each: 0.2, from: "center", yoyo: true, repeat: 7 } })
                 .to(baby, 2.5,{rotation:360, y: (gsap.getProperty(ufo, "y") / 2), autoAlpha:0}, "-=1")
                 //이거 시작 하는 타이밍이 lights 반짝거릴때 같이 되어야 할거같음 
                 .to("#beam", 0.5,{ scaleY: 0, opacity:0 })
                 .to(ufo, {x: document.body.clientWidth ,  y: -ufoHeight })
        }

        inputField.addEventListener('change',()=>{

            if(inputField.value == '다이아몬드'){
                introTxt.innerHTML= '2. 아이스크림이 죽으면?';
                inputField.value='';
                //make some action! celebrate or whatever 
            }else{
                alert('you are wrong!!')
                inputField.value='';
                snatch(blue)
                introTxt.innerHTML= '2. 아이스크림이 죽으면?';
                changevalue ++;
            }
            next = true; 
            if (!next) {return;}
            if(changevalue == 3){
                if(inputField.value == '다이하드'){
                    introTxt.innerHTML= '3. 질문구해오쇼';
                    inputField.value='';
                }else{
                    alert('you are wrong!!')
                    inputField.value='';
                    snatch(yellow)
                    introTxt.innerHTML= '3. 질문구해오쇼';
                    changevalue += 1;
                }
            }
            //2번 틀렸을때 옐로 실행이 안된다고 
            


        })
    }
})
//완성하고나면 snatch 계속 호출하지말고 인덱싱으로 되는지 해보기 리팩토링 강의 한번 더 보고 해보던지? 
