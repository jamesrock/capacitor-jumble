import { KeyBoard } from './KeyBoard';
import { createNode } from './utils';

const words = [
  'BROWN',
  'SMASHING',
  'FLOWERS',
  'SHOWERING',
  'LAMPOON',
  'PRESTIGIOUS',
  'FATHOM',
  'SAUSAGE',
  'YELLOW',
  'RED',
  'GREEN',
  'BLUE',
  'INDIGO',
  'PURPLE',
  'WHITE',
  'BLACK',
  'PINK',
  'ICEBERG',
  'MACARBE',
  'PIZZA',
  'CHAIR',
  'WHEEL',
  'SHARP',
  'IDEAL',
  'VALID',
  'DANCE',
  'STORY',
  'NIGHT',
  'WOUND',
  'FIRST',
  'SHEEP',
  'STAMP',
  'FORCE',
  'PLANE',
  'OUTFIT',
  'SCHOOL',
  'TICKET',
  'COFFEE',
  'EXEMPT',
  'FOLLOW',
  'HEAVEN',
  'SCREEN',
  'ADMIRE',
  'RHYTHM',
  'SPLURGE',
  'BROTHER',
  'CHAPTER',
  'REPLACE',
  'FRECKLE',
  'CERTAIN',
  'MONARCH',
  'COUNTRY',
  'SOCIETY',
  'CAPTAIN',
  'EMOTION',
  'MOVEMENT',
  'IMPERIAL',
  'STUBBORN',
  'MOMENTUM',
  'SEQUENCE',
  'LANGUAGE',
  'SPECIMEN',
  'REACTION',
  'CUPBOARD',
  'MEDICINE',
  'ACTIVITY',
  'PROSPECT',
  'EXCHANGE',
  'ORDINARY',
  'GRADUATE',
  'IMPLICIT',
  'RELIABLE',
  'SITUATION',
  'REFERENCE',
  'HOROSCOPE',
  'REPRESENT',
  'COURTSHIP',
  'AUTOMATIC',
  'NOTORIOUS',
  'MAGNITUDE',
  'INFLUENCE',
  'PERMANENT',
  'NEIGHBOUR',
  'RESIDENCE',
  'BUTTERFLY',
  'PERFORMER',
  'DISCOVERY',
  'MAYOR',
  'SOUND',
  'FLOOR',
  'REVIEW',
  'GUITAR',
  'POCKET'
];

const getWord = () => words.splice(Math.floor(Math.random() * (words.length)), 1)[0];

let word = getWord();
let input = '';
let count = 0;

const check = () => {
  return input === word;
};

const render = () => {
  display.innerHTML = `<div>${word}</div><div>${input || '&nbsp;'}</div>`
};

const type = (letter) => {
  
  input += letter;
  
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

const display = createNode('div', 'display');
const keyboard = new KeyBoard(type);

document.body.appendChild(display);
keyboard.renderTo(document.body);

console.log(keyboard);
render();