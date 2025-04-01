import { KeyBoard } from './KeyBoard';
import { createNode } from './utils';
import { words } from './words';

const getWord = () => words.splice(Math.floor(Math.random() * (words.length)), 1)[0];

let word = getWord();
let input = '';
let count = 0;

const check = () => {
  return input === word;
};

const render = () => {
  display.innerHTML = `<div>${word}</div><div>${input || '&nbsp;'}</div>`;
  stats.innerHTML = `${count}`;
};

const type = (letter, type) => {

  if(type===-1) {
    input = input.split('').splice(0, (input.length - 1)).join('');
  }
  else {
    input += letter;
  };
  
  if(check()) {
    render();
    count ++;
    setTimeout(() => {
      word = getWord();
      input = '';
      render();
    }, 1000);
  }
  else {
    render();
  };
  
};

const root = document.querySelector(':root');
const keySize = Math.floor((window.innerWidth - 20) / 10);

root.style.setProperty('--key-size', `${keySize}px`);
root.style.setProperty('--key-size-height', `${keySize*1.25}px`);
root.style.setProperty('--key-font-size', `${keySize-15}px`);
root.style.setProperty('--keyboard-bottom', `${navigator.standalone ? 50 : 10}px`);
root.style.setProperty('--body-padding', `${(keySize * 3) + 100}px`);

const stats = createNode('div', 'stats');
const display = createNode('div', 'display');
const keyboard = new KeyBoard(type);

document.body.appendChild(stats);
document.body.appendChild(display);
keyboard.renderTo(document.body);

console.log(keyboard);
render();

document.addEventListener('touchstart', () => {}, false);