const autoTrackPlugin =  function({ types: t }){
    return {
        visitor:{
            FunctionDeclaration(path,state){
                if(path.node.leadingComments){
                    let CommentBlock = path.node.leadingComments[0]
                    if(CommentBlock.value.indexOf('@track')){
                        console.log(233,CommentBlock.value.split('@param')[1].split('\r\n'));
                        let params = CommentBlock.value.split('@param')[1].split('\r\n')[0]
                        path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral(params)));
                        // path.get('body').unshiftContainer('body',t.functionExpression('track', params, path.get('body')))
                    }
                }
            }
            // CommentBlock(path){
            //     console.log(233,path.node.value);
            // }
        }
    }
}
module.exports = autoTrackPlugin