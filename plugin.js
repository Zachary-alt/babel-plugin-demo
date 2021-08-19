const { declare } = require('@babel/helper-plugin-utils')
const importModule = require('@babel/helper-module-imports')

const autoTrackPlugin = declare((api, options, dirname) => {
  api.assertVersion(7)

  return {
    visitor: {
      Program: {
        enter (path, state) {
          // console.log(2333, path.get('body'))
          //   throw new Error('123')
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
            // state.trackerImportId = importModule.addDefault(path, 'sa-sdk-javascript', {
            //   nameHint: path.scope.generateUid('sa-sdk-javascript')
            // }).name
            state.trackerAST = api.template.statement('console.log(123)')()
            // state.trackerAST = api.template.statement(`${state.trackerImportId}.init()`)()
          }
        }
      },
      'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration' (path, state) {
        const bodyPath = path.get('body')
        // console.log(2333, path.get('body'))
        // throw new Error('123')
        if (bodyPath.isBlockStatement()) {
          bodyPath.node.body.unshift(state.trackerAST)
        } else {
          const ast = api.template.statement('{console.log(123);return PREV_BODY;}')({ PREV_BODY: bodyPath.node })
          // const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({ PREV_BODY: bodyPath.node })
          bodyPath.replaceWith(ast)
        }
      }
    }
  }
})
module.exports = autoTrackPlugin
