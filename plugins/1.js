const updateParamNameVisitor = {
    Identifier(path) {
      if (path.node.name === this.paramName) {
        path.node.name = "x";
      }
    }
  };
const myVisitor = function(){
    return {
        visitor: {
            FunctionDeclaration(path){
                const param = path.node.params[0];
                const paramName = param.name;
                param.name = "x";

                path.traverse(updateParamNameVisitor, { paramName });
            },
            // Identifier(path){
            //     if (path.node.name === paramName) {
            //         path.node.name = "x";
            //       }
            // }
        }
    }
}


module.exports = myVisitor