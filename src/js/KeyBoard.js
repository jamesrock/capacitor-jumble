import { createNode, isApp } from './utils';

const shuffle = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    let shuffle = Math.floor(Math.random() * (cards.length));
    [cards[i], cards[shuffle]] = [cards[shuffle], cards[i]];
  };
  return cards;
};

class KeyBoardRow {
  constructor(keyboard, count) {
    
    this.keyboard = keyboard;
    this.count = count;
    this.keys = [];

    for(var i=0;i<count;i++) {
      this.keys.push(this.keyboard.keys.splice(Math.floor(Math.random() * (this.keyboard.keys.length)), 1)[0]);
    };

  };
  addKey(key) {
    this.keys.push(key);
    return this;
  };
};

export class KeyBoard {
  constructor(handler) {

    this.keys = shuffle([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ].map((key) => {
      return [key, 1];
    }));
    this.node = createNode('div', 'keyboard');
    this.rows = [
      new KeyBoardRow(this, 10),
      new KeyBoardRow(this, 9),
      new KeyBoardRow(this, 7).addKey(['&#x21e5;', -1])
    ];
    this.handler = handler;

    this.rows.forEach((row) => {
      const rowNode = createNode('div', 'row');
      row.keys.forEach((key) => {
        const keyNode = createNode('button', 'key');
        keyNode.innerHTML = key[0];
        rowNode.appendChild(keyNode);
        keyNode.addEventListener(isApp ? 'touchend' : 'click', (e) => {
          this.handler(key);
          e.preventDefault();
        });
      });
      this.node.appendChild(rowNode);
    });

  };
  renderTo(target) {
    target.appendChild(this.node);
    return this;
  };
  removeFrom(target) {
    target.removeChild(this.node);
    return this;
  };
};
