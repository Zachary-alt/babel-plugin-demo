const babylon = require('babylon')
const traverse = require('babel-traverse')
const t = require('babel-types');
const generate = require('babel-generator'); // 代码生成器


const code = `function square(n) {
    return n * n;
  }`;
  
let ast = babylon.parse(code);

traverse(ast,{
    enter(path){
        if(t.isIdentifier(path.node,{name:'n'})){
            path.node.name = "x";
        }
        // if(path.node.type === "Identifier" && path.node.name === "n"){
        //     path.node.name = "x";
        // }
    }
})
generate(ast, {}, code);
// {
//   code: "...",
//   map: "..."
// }