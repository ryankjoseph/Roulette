//PRESETTING PARAMETERS
var roulette = document.querySelector('.roulette');
var cells = roulette.querySelectorAll('.roulette-cell');
var cellCount; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = roulette.offsetWidth;
var cellHeight = roulette.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
var breakOut=false;
let userChips= 10000;
//preset conditions for roulette:
let rouletteNumbers=[];
for(let i=0;i<38;i++){
  rouletteNumbers.push(i);
}
let rouletteString=[];
rouletteNumbers.forEach(num =>{num === 37 ? rouletteString.push("00"):rouletteString.push(num.toString())})
function vertices(n){
}
//get the edges pertaining to this number
function edges(n){
  
}
console.log(rouletteNumbers)
redNums= [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21,23,25,27,30,32,34,36];
twoForOnea = [];
twoForOneb=[];
twoForOnec =[];
for(i=1;i<13;i++){
  twoForOnea.push(3*(i-1)+1);
  twoForOneb.push(3*(i-1)+2);
  twoForOnec.push(3*(i));
}
console.log(twoForOnec)
console.log(twoForOneb)
console.log(twoForOnea)
//get the vertices that pertain to this number
const vertexObject={};
const edgeObject={};
for (c=1;c<12;c++){
  //console.log(c);
//   vertexObject[`vr1c${c}`]=[twoForOneb[c-1].toString(),twoForOnec[c-1].toString(),twoForOneb[c].toString(),twoForOnec[c].toString()];
//   vertexObject[`vr2c${c}`]=[twoForOnea[c-1].toString(),twoForOneb[c-1].toString(),twoForOnea[c].toString(),twoForOneb[c].toString()];
//   //looping through existing arrays to create edge objects
//   edgeObject[`eVr1c${c}`]=[twoForOnec[c-1].toString(),twoForOnec[c].toString()];
//   edgeObject[`eVr2c${c}`]=[twoForOneb[c-1].toString(),twoForOneb[c].toString()];
//   edgeObject[`eVr3c${c}`]=[twoForOnea[c-1].toString(),twoForOnea[c].toString()];
  
//   //missing row 0 and row ZEROES for edges
//   edgeObject[`eHr1c${c}`]=[twoForOnec[c].toString(),twoForOneb[c].toString()];
//   edgeObject[`eHr2c${c}`]=[twoForOneb[c].toString(),twoForOnea[c]].toString();
  vertexObject[`vr1c${c}`]=[twoForOneb[c-1],twoForOnec[c-1],twoForOneb[c],twoForOnec[c]];
  vertexObject[`vr2c${c}`]=[twoForOnea[c-1],twoForOneb[c-1],twoForOnea[c],twoForOneb[c]];
  //looping through existing arrays to create edge objects
  edgeObject[`eVr1c${c}`]=[twoForOnec[c-1],twoForOnec[c]];
  edgeObject[`eVr2c${c}`]=[twoForOneb[c-1],twoForOneb[c]];
  edgeObject[`eVr3c${c}`]=[twoForOnea[c-1],twoForOnea[c]];
  
  //missing row 0 and row ZEROES for edges
  edgeObject[`eHr1c${c+1}`]=[twoForOnec[c],twoForOneb[c]];
  edgeObject[`eHr2c${c+1}`]=[twoForOneb[c],twoForOnea[c]];
}
//missing declarations from loop
edgeObject["eHr1c1"]=[2,3];
edgeObject["eHr2c1"]=[1,2];
edgeObject["eVr1c0"]=[3,37];
edgeObject["eVr3c0"]=[0,1];
vertexObject["vr1c0"]=[2,3,37];
vertexObject["vr0c0"]=[0,2,37];
vertexObject["vr2c0"]=[0,1,2];

function getCenterRowVal(i) {
    if (i%3==1){
        return 4;
    }
    else if (i%3==2){
        return 12;
    } 
    else if (i%3==0){
        return 20;  
    } 
}
let parentDiv = document.querySelector(".chips-container");
function centerPlacer(){
    for(i=1;i<37;i++){
        let row = getCenterRowVal(i);
        let col = 1+4*Math.ceil(i/3);
        let div = document.createElement('div');
        div.setAttribute("class", `bet center${i}`);
        div.style.setProperty("grid-area",`${row}/${col}/span 2/span 2`);
        div.addEventListener("click",betOnSegment)
        parentDiv.appendChild(div);

    }
}


centerPlacer()

//console.log(vertexObject)
//console.log(edgeObject)
class NumberProperties{
  constructor(num){
    this.number = num;
    this.numAsString= num===37 ?("00"):`${num}`;
    this.id = `el${this.numAsString}`;
    //all vertices associated with number
    this.vertices=[];
    Object.keys(vertexObject).forEach(key =>{vertexObject[key].includes(this.number) ? this.vertices.push(key): undefined});
    //this.edges = edges(num);
    this.edges=[];
    Object.keys(edgeObject).forEach(key =>{edgeObject[key].includes(this.number) ? this.edges.push(key): undefined});
    this.twelveSet= (num===37||num===0) ?"n12":(num/12<=1 ? "f12Key":(num/12<=2 ? "s12Key":(num/12<=3 ? "t12Key":("ERROR"))));
    this.color= (num===37||num===0) ? ("green"):(redNums.includes(num) ? "red":"black");
    this.colorKey= (num===37||num===0) ? ("greenKey"):(redNums.includes(num) ? "redKey":"blackKey");
    this.oddEvenNeither = (num===37||num===0) ? ("neither"):((num % 2) === 0 ? "evenKey":"oddKey");
    this.segment = (num===37||num===0) ? ("neither"):(Math.floor(num / 19) === 0 ? "f18Key":"l18Key");
    this.twoForOne= twoForOnea.includes(num) ? "twoForOnea": (twoForOneb.includes(num) ? "twoForOneb": (twoForOnec.includes(num) ? "twoForOnec": ("none") ) ) 
    console.log(this);    
  }
}
let dictionaryOfProperties={}
rouletteNumbers.forEach(num=>{num === 37 ? (dictionaryOfProperties["00"]=new NumberProperties(num)):(dictionaryOfProperties[num.toString()]=new NumberProperties(num))});
const payoutMultipliers={
  number:36,
  edge: 18,
  vertex: 9,
  twoForOne: 3,
  odd: 2,
  even: 2,
  red: 2,
  black: 2,
  eighteen:2,
  //not done yet: street, sixlin
}









//HOVER PROPERTIES

function stringSlice(str){
    newStr = str.split(''); // or newStr = [...str];
    newStr=newStr.slice(4);
    newStr = newStr.join('');
    return newStr;
}
let redOuterEl = document.querySelector(".red-outer p");
let allRedOptions = document.querySelectorAll(".red");
let blackOuterEl = document.querySelector(".black-outer p");
let allHoverEls = document.querySelectorAll(".hover-out");
let allBlackOptions = document.querySelectorAll(".black");
let rightSideEl = document.querySelector(".right");
let chipOptionsEl = document.querySelector(".chip-options");
updateChipCount();
let betDict={};
center2El=document.querySelector(".center2");
function createBet(key){
    //betDict[key]=[amount, element]
    betDict[key] ? null:betDict[key]=[0,document.querySelector(`.${key}`)];
}
function isNumber(amt){
    let numbersOnly=/^[0-9]+$/;
    return numbersOnly.test(amt)
}
function updateChipCount(){
    chipOptionsEl.innerHTML=`Your Current CHIP count:\n ${userChips}`
}
function betOnSegment(e){
    if (userChips ===0){
        alert("No chips left!")
        return null
    }

    classString=e.target.getAttribute("class");
    console.log(classString);
    key=stringSlice(classString)
    console.log(key);
    createBet(key);
    let amt = ""
    
    do{
        amt=prompt("How Much do you want to bet?");
    }
    while(!isNumber(amt));
    while (parseInt(amt) > userChips || !isNumber(amt)){
        amt=prompt("Incorrect input or too high! How much do you want to bet?");
    }
    betDict[key][0] +=parseInt(amt);
    userChips -=amt;
    updateChipCount();
    console.log(betDict);
    console.log(getComputedStyle(e.target, null).getPropertyValue("grid-row-start"));
    e.target.style.backgroundImage="url(./assets/Coin_Bet.png)";
}
center2El.addEventListener("click",betOnSegment);
function clearBets(){
    divs=document.querySelectorAll(".chips-container div");
    divs.forEach(div=>{div.style.backgroundImage="none"});
}

function redHover(){
    //console.log(allRedOptions);
    
    console.log("hi");
    allHoverEls.forEach(div =>{div.style.opacity ="0.6"});
    allRedOptions.forEach(div =>{div.style.opacity ="1"});
    //add ZEROS!
    console.log("hi");
}
function redUnhover(){
    //console.log(allRedOptions);
    console.log("hi");
    allHoverEls.forEach(div =>{div.style.opacity ="1"});
    //add ZEROS!
    console.log("hi");
}
redOuterEl.addEventListener("mouseover",redHover);
redOuterEl.addEventListener("mouseout",redUnhover);
redOuterEl.addEventListener("click",betOnSegment);
function blackHover(){
    //console.log(allRedOptions);
    console.log("hi");
    allRedOptions.forEach(div =>{div.style.opacity ="0.6"});
    //add ZEROS!
    console.log("hi");
}
function blackUnhover(){
    //console.log(allRedOptions);
    console.log("hi");
    allRedOptions.forEach(div =>{div.style.opacity ="1"});
    //add ZEROS!
    console.log("hi");
}
blackOuterEl.addEventListener("mouseover",blackHover);
blackOuterEl.addEventListener("mouseout",blackUnhover);



//WHEEL ONLY:
// console.log( cellWidth, cellHeight );
let currentlySelected;
function rotateroulette() {
  var angle = theta * selectedIndex * -1;
  roulette.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

rotateroulette();
//colour the wheel
for(i=0;i<cells.length;i++)
{
  console.log(cells[i].innerHTML.toString())
  rouletteString.forEach(str => {cells[i].innerHTML === str ? cells[i].setAttribute("class",`${dictionaryOfProperties[str].color}-roulette roulette-cell`):null})
  
  //pseudoCode: If the roulette number is equal to the innerHTML of the roulette cell, update the class to include the color using 
  //`${dictionaryOfProperties[rouletteString].color}-wheel roulette-cell`
}


let interval = setInterval(function() {
  selectedIndex++; 
  rotateroulette();
 }, 200);

//get the random number
function randomNumber(){
  selectedIndex=Math.floor(Math.random() * (37 + 1));
}

var nextButton = document.querySelector('.spin-button');
nextButton.addEventListener( 'click', function() {
  console.log(currentlySelected);
  currentlySelected ?  (currentlySelected === 37 ? cells[currentlySelected].setAttribute("class",`${dictionaryOfProperties["00"].color}-roulette roulette-cell`):cells[currentlySelected].setAttribute("class",`${dictionaryOfProperties[cells[currentlySelected].innerHTML].color}-roulette roulette-cell`)):null;
  randomNumber();
  clearBets();
  currentlySelected=selectedIndex;
  selectedIndexString = cells[currentlySelected].innerHTML;
  cells[selectedIndex].setAttribute("class","roulette-cell blink");
  //****UPDATE COLUMN HERE!! *****/
  rightSideEl.childElementCount > 23 ? rightSideEl.innerHTML="":null;
  rightSideEl.innerHTML+=`<p class='${dictionaryOfProperties[selectedIndexString].color}-text'>${selectedIndexString}</p>`;
  console.log(rightSideEl.innerHTML)
  //orientationEl.innerText= cells[selectedIndexString].innerHTML
  rotateroulette();
});

var cellsRange = 38;



function changeRoulette() {
  cellCount = cellsRange;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) )/2;
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateroulette();
}


changeRoulette();