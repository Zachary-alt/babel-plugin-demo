module.exports = function({ types: t }){
    return {
        visitor:{
            BinaryExpression(path){
                if(path.node.operator!=='===') return
                //检查路径（Path）类型
                console.log(1,path.get('left').isIdentifier({ name: "foo" }));
                // 相当于
                t.isIdentifier(path.node.left, { name: "foo" })
                path.node.left = t.identifier('sebmck') // 创建identifier
                path.node.right = t.identifier('dork')
            }
        }
    }
}