## Testing
### Manual Testing
- All the functions for cards turning, matching, and for locking the grid until second card being checked for a match is working.
- The home button and the restart button works in the game container.
- When all cards are matched the game end message shows, and the try again button restarts the game and close button close the window and return to the home page.
- Text and email inputs in the feedback form are validated.
- The websites pages are fully responsive. This was tested by using Google Developer Tool and sharing the deployed link to users who tested on their different devices. 
- The website have been tested and works in different browsers:

  - Google Chrome
  
 ![Google chrome browser](/docs/README-images/google-chrome-testing.png)

  - Microsoft Edge

 ![Microsoft Edge browser](/docs/README-images/explorer-test.png)

  - Firefox

 ![Firefox browser](/docs/README-images/firefox-test.png)

  - Safari

 ![Safari browser](/docs/README-images/safari-testing.jpg)

### Lighthouse
The website pages have been tested using Lighthouse Chrome Developer Tool.
- Mobile performance 

![Lighthouse mobile](/docs/README-images/lighthouse-mobile.png)

- Desktop performance

![Lighthouse dektop](/docs/README-images/lighthouse-desktop.png)

### Code Validation
#### W3C HTML Validation
- The html page have been validated with [W3C HTML validator](https://validator.w3.org/) and came back with no errors or warnings.
![HTML validation](/docs/README-images/html-validator.png)

#### W3C CSS Validation
- CSS validated by [CSS validator](https://jigsaw.w3.org/css-validator/) and no error found.
![HTML validation](/docs/README-images/css-validator.png)


#### JShint
- JavaScript code passes through [Jshint](https://jshint.com/) with no significant issues.
![JShint](/docs/README-images/jshint.png)


### Bugs and fixes
- I wanted a blur effect on the background to remove focus when any of the pop-up moduals where showing. I had a lot of trubbles finding a way to do this, but this code described on [Stackoverflow](https://stackoverflow.com/questions/61353311/adding-background-blur-via-css-behind-pop-up-modal) made it work. 
- The blur effect behind the pop-up moduals doesnt work in a Safari browser. Research on the problem has been done on several sites, and a possible soulution was to try the webkit backdrop filter. That worked but unfortunately affected the turning of the memory cards not working propertly. Therefore I removed this code, and as this blur effect is not very crucial to the functionality, I decided I couldnt spend more time on researching the problem.
- Adding eventlisteners to all the cards didnt work. Thanks to this thread on [Stackoverflow](https://stackoverflow.com/questions/32027935/addeventlistener-is-not-a-function-why-does-this-error-occur) I understod that I should add eventlisteners to a nodelist instead of an array.
- It took me a while and some research to understand how to remove all cards when reseting the game grid. The solution was found [Javascript tutorial](https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/) on how to remove all child nodes.
- The turnscore didnt add the first move to the number of turns in the game window. I fixed this issue by logging the output in the console to see that the function was working. Then after i while I noticed that I had placed the code for changing the inner HTML outside the if else statements, wich caused this bugg. 
