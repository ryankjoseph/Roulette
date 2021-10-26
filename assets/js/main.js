// Variable declarations
let spinButtonEl = document.getElementById('dummy-spin');
let alertBannerEl = document.getElementById('alert-banner');
let pastSpinsEl = document.getElementById('past-spins');let bettingChip;
let keysForPlacedChips =[];
let placedChipsEl = document.querySelectorAll('.placed-chips')
const placedChipsObject={}
let currentChipTotal=8950;
let userChips50 = 0;
let userChips100 = 0;
let userChips200 = 0;
let userChips500 = 0;
// create variables for each of the user chip elements
let userCount50El = document.getElementById('chip-count-50');
let userCount100El = document.getElementById('chip-count-100');
let userCount200El = document.getElementById('chip-count-200');
let userCount500El = document.getElementById('chip-count-500');
let userTotalCountEl = document.getElementById('chip-total-count');
let userStack50El = document.getElementById('chip-stack-50');
let userStack100El = document.getElementById('chip-stack-100');
let userStack200El = document.getElementById('chip-stack-200');
let userStack500El = document.getElementById('chip-stack-500');
let userChipsEl=document.getElementById('chip-selector');
//WHEEL ONLY:
let roulette = document.querySelector('.roulette');
let cells = roulette.querySelectorAll('.roulette-cell');
let cellCount; // cellCount set from cells-range input value
let cellWidth = roulette.offsetWidth;
let cellHeight = roulette.offsetHeight;
let rotateFn ='rotateY'
let radius, theta;
let breakOut=false;
let userChips= 10000;
//preset conditions for roulette:
let rouletteNumbers=[];
let rouletteString=[];
let currentlySelectedIndex=0;
let spinButton = document.getElementById('spin-button');
//get all board cells
let boardCellElements = document.querySelectorAll('.board-cell');
// let spinNoise = new Audio();
// spinNoise.src="../sounds/"

// Uses class names to decipher where the bets are placed and what to pay out
function calculatePayout(placedBets,rouletteNumber){
    let totalPayOut = 0;
    let winningEl = document.getElementById(`_${rouletteNumber}`)
    let houseMoney = 0;
    placedBets.forEach(bet=>{
        let betKey = Object.keys(bet)[0];
        let betValue = Object.values(bet)[0];
        if(betKey.includes('outer')){
            if(betKey.includes('red') && winningEl.className.includes('red')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('black') && winningEl.className.includes('black')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('2f1-1') && winningEl.className.includes('bc-2f1-1')){
                totalPayOut+=3*betValue;
                houseMoney+=2*betValue;
            }
            else if(betKey.includes('2f1-2') && winningEl.className.includes('bc-2f1-2')){
                totalPayOut+=3*betValue;
                houseMoney+=2*betValue;
            }
            else if(betKey.includes('2f1-3') && winningEl.className.includes('bc-2f1-3')){
                totalPayOut+=3*betValue;
                houseMoney+=2*betValue;
            }
            else if(betKey.includes('1to12') && winningEl.className.includes('first-dozen')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('13to24') && winningEl.className.includes('second-dozen')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('25to36') && winningEl.className.includes('third-dozen')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('1to18') && winningEl.className.includes('first-half')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('19to36') && winningEl.className.includes('second-half')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('odd') && winningEl.className.includes('odd')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else if(betKey.includes('even') && winningEl.className.includes('even')){
                totalPayOut+=2*betValue;
                houseMoney+=betValue;
            }
            else{
                //there is no payout
                totalPayOut +=0;
            }
       }
       else if(betKey.includes('center')){
           betKey = betKey.substring(7,betKey.length)
           if (rouletteNumber===betKey){
               totalPayOut += 36*betValue
               houseMoney+=35*betValue;
           }
       }
       else if(betKey.includes('street')){
           console.log('include street bet')
       }
       else if(betKey.includes('special')){
           console.log('include special bets')
       }
       else{
           betKey=betKey.substring(1,betKey.length).split('-');
           if (betKey.length >=3 && betKey.length<=4){
               betKey.forEach(element=>{
                   if(element === rouletteNumber){
                       totalPayOut += 12*betValue
                       houseMoney+=11*betValue;
                   }
               })
           }
           else if(betKey.length===2){
               if(betKey[0]===rouletteNumber || betKey[1]===rouletteNumber){
                   totalPayOut += 18*betValue
                   houseMoney+=17*betValue;
               }
               
           }
       }
   })
   totalPayOut ? alertBannerEl.innerHTML=`You won $${houseMoney}`:alertBannerEl.innerHTML='Spin Again!'
   return totalPayOut;
}

// create placedChipsObject for chip stacking using left/top, z-index,current total
function initializePlacedChipsIndices(){
    keysForPlacedChips=[]
    placedChipsEl.forEach(el=>{
        keysForPlacedChips.push(el.id);
        placedChipsObject[el.id]= [0,0,0]
    })
}
initializePlacedChipsIndices();

//fade out all board cells
function fadeAllNumberedCells(){
    boardCellElements.forEach(element=>{
        element.style.opacity=0.4;
    })
}

//fades in hovered cells
function fadeInSelectNumberCells(betId){
    if(betId.includes('center')){
        let id=betId;
        id = '_'+id.substring(7,id.length)
        hoveredEl = document.getElementById(id)
        hoveredEl.style.opacity=1;
    }
    else if(betId.includes('outer')){
        if(betId.includes('red')){
            let redEls =document.querySelectorAll('.red');
            redEls.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('black')){
            let blackEls =document.querySelectorAll('.black');
            blackEls.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('2f1-1')){
            let bcTwoForOne1Els =document.querySelectorAll('.bc-2f1-1');
            bcTwoForOne1Els.forEach(el=>el.style.opacity=1)        
        }
        else if(betId.includes('2f1-2')){
            let bcTwoForOne2Els =document.querySelectorAll('.bc-2f1-2');
            bcTwoForOne2Els.forEach(el=>el.style.opacity=1)          
        }
        else if(betId.includes('2f1-3')){
            let bcTwoForOne3Els =document.querySelectorAll('.bc-2f1-3');
            bcTwoForOne3Els.forEach(el=>el.style.opacity=1)            
        }
        else if(betId.includes('1to12')){
            let first12Els =document.querySelectorAll('.first-dozen');
            first12Els.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('13to24')){
            let second12Els =document.querySelectorAll('.second-dozen');
            second12Els.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('25to36')){
            let third12Els =document.querySelectorAll('.third-dozen');
            third12Els.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('1to18')){
            let firstHalfEls =document.querySelectorAll('.first-half');
            firstHalfEls.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('19to36')){
            let secondHalfEls =document.querySelectorAll('.second-half');
            secondHalfEls.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('odd')){
            let oddEls =document.querySelectorAll('.odd');
            oddEls.forEach(el=>el.style.opacity=1)
        }
        else if(betId.includes('even')){
            let evenEls =document.querySelectorAll('.even');
            evenEls.forEach(el=>el.style.opacity=1)
        }        
    }
    else{
        let id = betId.substring(1,betId.length);
        splitArray = id.split('-')
        splitArray.forEach(cell=>{
            cellId='_'+cell;
            hoveredCell = document.getElementById(cellId);
            hoveredCell.style.opacity=1;
        })
    }
}

//makes all cells fully solid
function fadeInAllCells(){
    boardCellElements.forEach(element=>{
        element.style.opacity=1;
    })
}

//checking if a region being hovered can be bet on 
function checkRegion(type, elements){
    if(type==='betting' || type ==='placing'){
        let bettingArr=[false, null];
        elements.forEach((el)=>{
            let newArr = el.className.split(' ')
            if(newArr[0]==='bet'){
                //if region is a betting region change boolean
                bettingArr[0]= true;
                if(el.id.includes('center') && type ==='placing'){
                    bettingArr[1] = `_${el.id}`
                }
                else if(type ==='betting'||type==='placing'){
                    bettingArr[1] = el.id;
                }
            }
        })
        return bettingArr;
    }
}

// places a chip based on the chip-type and adds the value to the bet type
function createPlacedChipStack(placedStackId, chipAmount){
    let placedStackDivEl= document.getElementById(placedStackId)
    let newChip = document.createElement('div');
    newChip.style.left=`${20+0.1*placedChipsObject[placedStackId][0]}%`;
    newChip.style.top=`${ 1.5* placedChipsObject[placedStackId][0]}%`;
    placedChipsObject[placedStackId][0]+=1;
    newChip.style.zIndex=`${placedChipsObject[placedStackId][1]+30}`;
    placedChipsObject[placedStackId][1]+=1
    placedChipsObject[placedStackId][2]+=chipAmount;
    newChip.className += 'bet-' + chipAmount;
    newChip.className += ' placed-down'
    placedStackDivEl.appendChild(newChip);
}

//makes all betting chips in user's chips draggable using Shopify's draggable
function assignDraggability(){
    bettingChip = new Draggable.Draggable(document.querySelectorAll(".betting-chip"), {
        draggable: ".betting-chip",
        delay:0,
    });
    bettingChip.on('drag:start', (evt) => {
        initialMousePosition = {
            x: evt.sensorEvent.clientX,
            y: evt.sensorEvent.clientY,
        };
    });
    //trigger hover action on move
    bettingChip.on('drag:move', (evt) => {
        currentMousePosition = {
            x: evt.sensorEvent.clientX,
            y: evt.sensorEvent.clientY,
        };
        elements = document.elementsFromPoint(currentMousePosition.x,currentMousePosition.y)
        //check if region is a betting region
        let isBettingRegion = false
        let bettingId;
        [isBettingRegion, bettingId] = checkRegion('betting', elements)
        if (isBettingRegion){
            fadeAllNumberedCells();
            fadeInSelectNumberCells(bettingId)
        }
        else{
            fadeInAllCells();
        }
    });
    try {
        bettingChip.on('drag:stop', (evt) => {
            let chipClassNames = evt.data.source.className;
            try{

                elements = document.elementsFromPoint(currentMousePosition.x,currentMousePosition.y)
            }
            catch(error){
                console.log('Error', error)
            }
            let isBettingRegion = false
            let bettingId;
            [isBettingRegion, bettingId] = checkRegion('placing', elements)
            //if it is a betting region:
            if(isBettingRegion){
                let amount = 0;
                if (chipClassNames.includes('bet-500')){
                    amount = 500;
                    userChips500 -=1;
                }
                else if(chipClassNames.includes('bet-200')){
                    amount = 200;
                    userChips200 -=1;
                }
                else if(chipClassNames.includes('bet-100')){
                    amount = 100;
                    userChips100 -=1;
                }
                else if(chipClassNames.includes('bet-50')){
                    amount = 50;
                    userChips50 -=1;
                }
                else {
                    alert('ERROR!!!')
                }
                if(bettingId.includes('outer')){
                    placedId= `chips-${bettingId}`
                }
                else{
                    placedId= `chips-${bettingId.substring(1,bettingId.length)}`
                }
                createPlacedChipStack(placedId,amount)
                fadeInAllCells();
                updateChips();
            }
        });
        
    } catch (error) {
        console.log('NEW ERROR', error)
    }
}

//function to calculate total amount after updates
function calculateCurrentChipTotal(){
    currentChipTotal = userChips50*50+userChips100*100+userChips200*200+userChips500*500;
}

function sortChips(unsortedChips){
    //make sure there are minimum $500 in chips
    if ((unsortedChips % 500)===0 && userChips500 <30){
        userChips500 += unsortedChips/500
        unsortedChips-= unsortedChips
    }
    if(unsortedChips >=500 && userChips50 <25){
        userChips50 += 10;
        unsortedChips-= 500;
    }
    if(unsortedChips >= 5000 && userChips500 <70){
        let fiveThousands = Math.floor(unsortedChips/5000)
        userChips500 += 10*fiveThousands;
        unsortedChips -= 5000*fiveThousands;
    }
    if (userChips100 < 10){
        let thousands = Math.floor(unsortedChips/1000);
        userChips50 += 2*thousands;
        userChips100 += 3*thousands;
        userChips200 += 3*thousands;
        unsortedChips -= thousands*1000;
    }
    else if(userChips500<15){
        let thousands = Math.floor(unsortedChips/1000);
        userChips500 += 2*thousands;
        unsortedChips -= thousands*1000;
    }
    else{
        let thousands = Math.floor(unsortedChips/1000);
        userChips100 += 1*thousands;
        userChips200 += 2*thousands;
        userChips500 += thousands;
        unsortedChips -= thousands*1000;
    }
    let fiveHundreds = Math.floor(unsortedChips/500);
    userChips100 += 4*fiveHundreds;
    userChips50 += 2*fiveHundreds;
    unsortedChips -= fiveHundreds*500;
    let twoHundreds = Math.floor(unsortedChips/200);
    userChips200 += twoHundreds;
    unsortedChips -= twoHundreds*200;
    let fifties = Math.floor(unsortedChips/50);
    userChips50 += fifties;
    unsortedChips-=50*fifties;
}

function updateChips(){
    //update text in chips container
    userCount50El.innerHTML = `x${userChips50}`;
    userCount100El.innerHTML = `x${userChips100}`;
    userCount200El.innerHTML = `x${userChips200}`;
    userCount500El.innerHTML = `x${userChips500}`;
    createAllUserChips()
    calculateCurrentChipTotal();
    if(userTotalCountEl.innerHTML==="$0"){
        alert("You've lost all your money! Oh no!")
        return
    }
    userTotalCountEl.innerHTML = `$${currentChipTotal}`; 
}

//Creates a div for all spun lists
function createSpinList(number,colour){
    updatedSpinDiv = document.createElement('div');
    updatedSpinDiv.innerHTML = `${number}`;
    updatedSpinDiv.className = `past-spin-${colour}`
    pastSpinsEl.prepend(updatedSpinDiv)
}

function createUserChipStack(chipNumber, chipStack, chipAmount){
    for(let i=0; i<chipNumber;i++){
        let newChip = document.createElement('div');
        newChip.setAttribute('draggable','true');
        newChip.style.zIndex=`${-i+30}`;
        newChip.style.left=`0.${i}px`;
        newChip.style.top=`${0.5*i}px`;
        newChip.className += 'bet-' + chipAmount;
        newChip.className += ' user-stack';
        newChip.className += ' betting-chip';
        chipStack.appendChild(newChip)
    }
    //20 is the radius of the chips
    chipStack.style.width = `${20+0.1*chipNumber}px`
    chipStack.style.height = `${20+0.5*chipNumber}px`
}

function createAllUserChips(){
    let userStackEl=document.querySelectorAll('.user-stack');
    userStackEl.forEach(el=>el.remove())
    createUserChipStack(userChips50, userStack50El, '50')
    createUserChipStack(userChips100, userStack100El, '100')
    createUserChipStack(userChips200, userStack200El, '200')
    createUserChipStack(userChips500, userStack500El, '500')
    assignDraggability();
}

function generateChips(){
    //find chips
    sortChips(currentChipTotal)
    //create grid
    updateChips();
}

// WHEEL physics
for(let i=0;i<38;i++){
  rouletteNumbers.push(i);
}

function rotateroulette() {
  let angle = theta * currentlySelectedIndex * -1;
  roulette.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

let interval = setInterval(function() {
  currentlySelectedIndex++; 
  rotateroulette();
 }, 200);

//get a random number from 0 through 37
function randomNumber(){
  return Math.floor(Math.random() * (37 + 1));
}

spinButton.addEventListener( 'click', function() {
    allPlacedBets=[]
    // check all placed bets and create an object with the amount for each placed chip
    keysForPlacedChips.forEach(key=>{
        if(placedChipsObject[key][0]>0){
            const tempObject ={}
            let newKey = key.substring(6,key.length);
            tempObject[newKey] = placedChipsObject[key][2]
            allPlacedBets.push(tempObject)
        }
    })

    if (allPlacedBets.length === 0 && userTotalCountEl.innerHTML==="$0"){
        alert('Refill your chips and try again!');
        return;
    }
    //return an prompt to the user that there are no placed bets
    if (allPlacedBets.length === 0){
        alert('Place a bet!');
        return;
    }

    //remove blink from currently selected roulette cell, if one is selected
    if (rouletteString.length===0){
        //no need to remove blink
        alertBannerEl.innerHTML = 'Make a bet and click spin!'
    }
    else{
        //remove blink from class names
        let blinkingCell = rouletteString[rouletteString.length-1]
        alertBannerEl.innerHTML = `Blink was removed for ${cells[blinkingCell]} `
        allClasses = cells[blinkingCell].className.split(' ');
        let blinkIndex = allClasses.indexOf('blink');
        if(blinkIndex >-1){
            allClasses.splice(blinkIndex,1);
        }
        cells[blinkingCell].className= allClasses.join(' ');
        
    }
    //generate a random number and assign it to the index of cell elements
    currentlySelectedIndex=randomNumber();
    cells[currentlySelectedIndex].className += ' blink';
    let rouletteAsString = '';
    if(cells[currentlySelectedIndex].innerHTML ==='00'){
        rouletteAsString = 'dbzr';
    }
    else{
        rouletteAsString = cells[currentlySelectedIndex].innerHTML;
    }
    if(cells[currentlySelectedIndex].className.includes('black')){
        createSpinList(cells[currentlySelectedIndex].innerHTML,'black')
    }
    else if(cells[currentlySelectedIndex].className.includes('red')){
        createSpinList(cells[currentlySelectedIndex].innerHTML,'red')
    }
    else if(cells[currentlySelectedIndex].className.includes('green')){
        createSpinList(cells[currentlySelectedIndex].innerHTML,'green')
    }
    //filter each bet --> takes the values and gives a payout
    let winnings=calculatePayout(allPlacedBets,rouletteAsString);
    rouletteString.push(currentlySelectedIndex)
    sortChips(winnings);
    updateChips();
    //payout each
    let allPlacedChipsEl = document.querySelectorAll('.placed-down');
    allPlacedChipsEl.forEach(el=>el.remove())
    initializePlacedChipsIndices();
    rotateroulette();
});

function changeRoulette() {
  cellCount = cells.length;
  theta = 360 / cellCount;
  let cellSize = cellWidth;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) )/2;
  for ( let i=0; i < cells.length; i++ ) {
    let cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }
  rotateroulette();
}

generateChips();
changeRoulette();