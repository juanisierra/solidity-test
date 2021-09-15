const path = require('path');
const fs = require('fs');
const solc = require('solc');

const loteryPath = path.resolve(__dirname,'contracts','Lottery.sol'); // Hardcoded contract to be compiled
const source = fs.readFileSync(loteryPath,'utf8');

module.exports = solc.compile(source, 1).contracts[':Lottery']; // Hardcoded contract to be compiled
