# Pong Game

A basic pong game using SVGs.

##### [GitHub Pages](https://htichcock.github.io/RED-web-dev-project-03/)


![pong screenshot](https://imgur.com/3YDZ7hA.jpg)


## Stretch Goals

1. Smooth Paddle movement
	- utilized an event listener on ‘keyup’ swell as ‘keydown to set a boolean to either true or false, so when the key is pressed the moveUp() or moveDown() functions are called every render. If one key is already pressed when the opposite key is pressed, the second key to be pressed will win( e.g. if you press down first, then up, and hold them both, the paddle will move up)

2. UI
	- I created a Message class that extends the Score class as they were similar and I wanted to try out using extends.
	- The game starts paused and prints the controls to the screen, as the keys are pressed the controls go away.
	- The game ends at 5 points and prints the winner and instructions
3. Ball speed/direction change
	- Ball speed is control by a scaler speed, and a direction vector that always has length approx equal to 1 (I think there were some rounding errors)
	- on the paddle hit the y direction vector is set to between -0.5 and 0.5 depending on where it is hit on the paddle, the speed also increases
 depending on where it was hit. The closer to the edge the faster it is!

## Setup

**Install dependencies:**

`> npm i`

**Run locally with Webpack Dev Server:**

`> npm start`

**Build for production:**

`> npm run build`

## Keys

**Player 1:**
* a: up
* z: down

**Player 2:**
* l : up
* ,: down
