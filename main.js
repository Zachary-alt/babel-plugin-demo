const index=3
const code = require(`./src/${index}`);
const babel = require("@babel/core");
const path = require('path');


const config = {
    ast: true,
    // filename:path.basename(__filename),
    plugins:[[`./plugins/${index}.js`,{trackerPath:'sa-sdk-javascript'}]]
}

let res =  babel.transformSync(code,config)
console.log(res.code);
// console.log(res.ast);