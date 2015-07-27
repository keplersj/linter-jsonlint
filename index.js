'use babel';

import { Range } from 'atom';
import jsonlint  from 'jsonlint';

export default class LinterJsonLint {

  static regex = '.+?line\\s(\\d+)'

  static provideLinter() {
    return {
      grammarScopes: ['source.json'],
      scope: 'file',
      lintOnFly: true,
      lint: (editor) => {

        let path = editor.getPath();
        let text = editor.getText();

        try {
          jsonlint.parse(text);
        } catch (e) {

          let line = Number(e.message.match(this.regex)[1]);
          let column = 0;

          return [{
            type: 'error',
            text: e.message,
            filePath: path,
            range: new Range([line, column], [line, column])
          }];
        }

        return [];
      }
    }
  }

}
