const CryptoJS = require('crypto.js');

class Block {
  constructor(i = 0, p = null, d = 'Genesis block', c = 1) {
    this.index = i;
    this.previousHash = p;
    this.data = d;
    this.timestamp = new Date();
    this.complexity = c;
    this.nonce = 0;

    this.mine();
  }

  generateHash() {
    return CryptoJS.sha256(
      this.index +
      this.previousHash +
      JSON.stringify(this.data) +
      this.timestamp +
      this.nonce
    ).toString();
  }

  mine() {
    this.hash = this.generateHash();

    while (!(/^0*$/.test(this.hash.substring(0, this.complexity)))) {
      this.nonce += 1;
      this.hash = this.generateHash();
    }
  }
}

module.exports = Block;
