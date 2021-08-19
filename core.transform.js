let babel = require('@babel/core')
const path = require('path');
console.log('__dirname : ' + __dirname)
console.log('__filename : ' + __filename)
console.log('filename : ' + path.basename(__filename))

let code = ()=>{
    let a=1
    a++
    console.log(a);
}

babel.transform(code,{ast: true,filename:path.basename(__filename)},(err,res)=>{
    console.log(res);
})