# Project 1: _WheelR_
  ## Background:
  WheelR is a purely front end project by Ryan Joseph. WheelR is based on the American roulette game commonly played in casinos. 
  <br>
  <br>
  Place a bet, spin the wheel and try your luck!
<br>
  ## Screenshot(s):
   #### Game Screen:
   <img src="https://i.imgur.com/wYjzLLL.png"><img><br>
   #### Place a bet:
   <img src="https://i.imgur.com/HnnxryT.png"><img><br>
   #### Roulette lands on a number:
   <img src="https://i.imgur.com/b0jGp2b.png"><img><br>
<br>
<br>
  ## Technologies Used:
  **Front-End:** HTML/JAVASCRIPT/CSS <br>
  **Additional Libraries:** Shopify's Draggable<br>
  > - Animations modified from <a href="https://codepen.io/desandro/pen/jxwELK">THIS CODPEN </a> <br>   


## Developer Notes
  
  ### How to Add a Bet
  general recipe for adding a new bet:
### in index.html:

    <div class="bet {your bet type}" id="_{your bet id or numbers associated with it}">\</div>

    <div class="placed-chips" id="chips-{your bet id or numbers associated with it}}"></div>
<br>

### in style.css:
place new divs on grid using the following:<br>
    for the bet div**:

        #_{the id from index.html}.{
            display: grid;
            grid-area: {row}/{column}/{min span 2} span 2/{min span 2} span 2
        }

        #chips-{the id from index.html}.{
            display: grid;
            grid-area: {row}/{column}/span 2/ span 2
        }
        /* **Make sure not to overlap with existing divs! if so, make sure to classify a z-index for hover */

### main.js:

  go to fadeInSelectNumberCells() and calculatePayout() and add your 'bet type' (e.g. 'street') to the if condition<br>
  <br>
## Next Steps
  Planned future enhancements (icebox items).
  
  > - Add Street and Line Bets<br>
  > - Make the table on a 3D slant<br>