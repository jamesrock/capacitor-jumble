import { SplashScreen } from '@capacitor/splash-screen';
import { KeyBoard } from './KeyBoard';
import { createNode } from './utils';
import { getWord } from './words';
import { Storage } from './Storage';

const duration = (1000*121);
// const duration = (1000*11);
// const duration = (1000*60*60);

const storage = new Storage('me.jamesrock.jumble');
let best = storage.get('best') || 0;
// console.log('best', best);

let word = null;
let input = '';
let score = 0;
let time = 0;
let stats = null;
let display = null;
let keyboard = null;

const check = () => {
  return input === word;
};

const render = () => {
  
  const now = new Date().getTime();
  const diff = time - now;

  if(diff>0) {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const splitInput = input.split('');
    display.innerHTML = `<div class="word">${word.split('').map((char, index) => {
      return splitInput[index]===char ? `<span class="letter complete">${char}</span>` : `<span class="letter incomplete">${char}</span>`;
    }).join('')}</div>`;
    stats.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    requestAnimationFrame(render);
  }
  else {
    showGameOverScreen();
  };
  
};

const type = (key) => {

  if(key[1]===-1) {
    word = getWord();
    input = '';
  }
  else if(word.split('')[input.length]===key[0]) {
    input += key[0];
  };

  console.log(input);
  
  if(check()) {
    score ++;
    setTimeout(() => {
      word = getWord();
      input = '';
    }, 500);
  };
  
};

const start = () => {

  if(stats && display && keyboard) {
    document.body.removeChild(stats);
    document.body.removeChild(display);
    keyboard.removeFrom(document.body);
  };

  gameOverScreen.setAttribute('data-show', false);

  stats = createNode('div', 'time');
  display = createNode('div', 'display');
  keyboard = new KeyBoard(type);
  time = new Date().getTime() + duration;
  score = 0;
  input = '';
  word = getWord();

  document.body.appendChild(stats);
  document.body.appendChild(display);
  keyboard.renderTo(document.body);
  
  render();

  console.log(keyboard);

};

const showGameOverScreen = () => {
  if(score>best) {
    best = score;
    storage.set('best', best);
  };
  gameOverScreen.innerHTML = `<div class="game-over-body">\
    <h2>Game over!</h2>\
    <p class="score">Score: ${score}</p>\
    <p class="best">Best: ${best}</p>\
    <p class="retry">Tap to try again.</p>\
  </div>`;
  gameOverScreen.setAttribute('data-show', true);
};

const root = document.querySelector(':root');
const maxKeySize = 60;
let keySize = Math.floor((window.innerWidth - 20) / 10);
keySize = keySize > maxKeySize ? maxKeySize : keySize;

const gameOverScreen = createNode('div', 'game-over');
gameOverScreen.addEventListener('click', () => {
  start();
});

document.body.appendChild(gameOverScreen);

root.style.setProperty('--key-size', `${keySize}px`);
root.style.setProperty('--key-size-height', `${keySize*1.25}px`);
root.style.setProperty('--key-font-size', `${keySize-10}px`);
root.style.setProperty('--key-active-font-size', `${keySize-14}px`);
root.style.setProperty('--keyboard-bottom', `${navigator.standalone ? 50 : 10}px`);
root.style.setProperty('--body-padding', `${(keySize * 3) + 100}px`);

start();

document.addEventListener('touchstart', () => {}, false);

SplashScreen.hide();