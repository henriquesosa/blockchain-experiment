const Block = require('./Block');

class Blockchain {
  constructor(complexity = 1) {
    this.blocks = [new Block()];
    this.index = 1;
    this.complexity = complexity;
  }

  __increaseIndex() {
    return this.index += 1
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  isValid() {
    const validation = this.blocks.some(function (block) {
      return block.hash !== block.generateHash();
    });

    return !validation;
  }

  addBlock(data) {
    const index = this.index;
    const complexity = this.complexity;
    const previousHash = this.getLastBlock().hash;
    const block = new Block(index, previousHash, data, complexity);

    this.__increaseIndex();
    this.blocks.push(block);
  }
}

module.exports = Blockchain;
