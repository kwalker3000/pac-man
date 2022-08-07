# Scrimba - Pac-Man Challenge

This is a solution to a Scrimba challenge presented in their [frontend developer path](https://scrimba.com/learn/frontend). 

## Table of contents

- [Scrimba - Pac-Man](#scrimba--Pac--Man-challenge)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Recreate classic Pac-Man game with vanilla javascript and css.

### Screenshot



<img alt="collage of various components seen on the website" src="./site-preview.png" width=600>

### Links

- Live Site URL: [Pac-Man](https://audiophile-tan.vercel.app/)

### My process

This was a project I completed several months ago.

I read up on a lot of the original Pac-Man logic and tried to mimic it as much as I could. Things like:
 - individual speeds
 - changes in speeds
 - movement patterns
 - various timers
 
Used A-Star algorithm to make ghosts smarter and be able to trackdown Pac-Man.
Before starting the project there were some things that I wanted to work on.

### Built with

- A-Star algorithm
- javascript
- CSS Flexbox
- localStorage

### What I learned

- How to work with timers
- How to work with 'this' in various contexts
- How to take a complex algorithm and make it work for what I need

There are several things I could have done differntly to improve performance:
  - minify source files
  - break down files into smaller, manageable chunks
  - use sprites for props and have on single page
  - use priority queue data structure for A-Star algorithm
  
Gameplay would also be smoother if I used `<canvas>`

I was familiar with javacript classes and OOP prior to the challenge but this helped solidify my understanding.

### Continued development

I prefer functional programming. However, I understand OOP is standard in the industry so would like to improve upon my understanding.

### Useful resources

- [stackoverflow](https://stackoverflow.com/) - Helped when I ran into some problems that I didn't understand.
- [Saving](https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/) game progress.
- [The Pac-Man Dossier](https://www.gamedeveloper.com/design/the-pac-man-dossier) a pac-man game guide discussing it's history along with the design and logic within the game.

## Author

- GitHub - [@kwalker3000](https://github.com/kwalker3000)

## Acknowledgments

[Scrimba](https://scrimba.com/) and [@ania_kubow](https://twitter.com/ania_kubow) for providing the fun challenge.
