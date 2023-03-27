let gameSection=document.querySelector(".game")
let newGameButton=document.querySelector(".new-game")
// let curtain=document.querySelector(".curtain")
// console.log(curtain)
for(let i=0;i<8;i++){
    let cardPair=`
        <div class="card" data-pair="${i}">
            <img src="images/${i+1}.svg" alt="" class="front-face">
            <img src="images/back.svg" alt="" class="back-face">
        </div>
        <div class="card" data-pair="${i}">
            <img src="images/${i+1}.svg" alt="" class="front-face">
            <img src="images/back.svg" alt="" class="back-face">
        </div>
    `
    gameSection.innerHTML+=cardPair
}
let cards=document.querySelectorAll(".card")
let curtain=document.createElement("div")
curtain.classList.add("curtain")
gameSection.appendChild(curtain)
let firstCard,secondCard
let isFlippedCard=false
let animation=false
function disableCards(){
    reset()
}
function unflipCards(){
    animation=true
    setTimeout(function(){
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        reset()
    },2000)
    
}
function reset(){
    firstCard=null
    secondCard=null
    isFlippedCard=false
    animation=false
}
function openCard(){
    if (this==firstCard || animation==true){
        return
    }
    this.classList.add("flip")
        if(!isFlippedCard){
            isFlippedCard=true
            firstCard=this
            return
        }
        secondCard=this
        if(secondCard.dataset.pair==firstCard.dataset.pair){
            firstCard.removeEventListener("click",openCard)
            secondCard.removeEventListener("click",openCard)
            disableCards()
            console.log("пара")
        }
        else{
            unflipCards()
            console.log("не пара")
        }
}
function getRandInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
    }
function newGame(){
    reset()
    cards.forEach(function(card){
        card.style.order=getRandInt(0,16)
        card.classList.remove("flip")
        card.removeEventListener("click",openCard)
        card.addEventListener("click",openCard)
    })
}
newGame()
newGameButton.addEventListener("click",function(){
    curtain.classList.add("closed")
    newGameButton.disabled=true
    setTimeout(function(){
        curtain.classList.remove("closed")
        newGameButton.disabled=false
    },2500)
    setTimeout(function(){
        newGame()
    },1000)
})
// Прочитать про setTimeout, отличие null от undefined, data-атрибуты, transform в css