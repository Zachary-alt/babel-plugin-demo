const { declare } = require('@babel/helper-plugin-utils')
const importModule = require('@babel/helper-module-imports')

const autoTrackPlugin = declare((api, options, dirname) => {
  api.assertVersion(7)

  return {
    visitor: {
      Program: {
        enter (path, state) {
          path.traverse({
            ImportDeclaration (curPath) {
              const requirePath = curPath.get('source').node.value
              if (requirePath === options.trackerPath) {
                const specifierPath = curPath.get('specifiers.0')
                if (specifierPath.isImportSpecifier()) {
                  state.trackerImportId = specifierPath.toString()
                } else if (specifierPath.isImportNamespaceSpecifier()) {
                  state.trackerImportId = specifierPath.get('local').toString()
                }
                path.stop()
              }
            }
          })
          if (!state.trackerImportId) {
            state.trackerImportId = importModule.addDefault(path, options.trackerPath, {
              nameHint: path.scope.generateUid(options.trackerPath)
            }).name
          }
        }
      },
      'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration' (path, state) {
        if(path.node.leadingComments){
            let CommentBlock = path.node.leadingComments[0]
            if(CommentBlock.value.indexOf('@track')){
                let params = CommentBlock.value.split('@param')[1].split('\r\n')[0]
                state.trackerAST = api.template.statement(
                  `try {
                    ${state.trackerImportId}(${params})
                  } catch (error) {
                    console.log(error)
                  }`
                )()

                const bodyPath = path.get('body')
                if (bodyPath.isBlockStatement()) {
                  bodyPath.node.body.unshift(state.trackerAST)
                }
            }
        }
      }
    }
  }
})
module.exports = autoTrackPlugin
