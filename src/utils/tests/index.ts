// TODO: testing users' post content is valid JavaScript code and have at least one function declaration.
var esprima = require('esprima');

export function isSolutionValid (content: string): boolean | string {
  try {
    const parsed = esprima.parseScript(content, {}, { tolerant: true, range: true, tokens: true });
    if (parsed.body.length > 0 && parsed.body[0].type === 'FunctionDeclaration') {
      return true;
    } else {
      return "Your solution must start with a function declaration.";
    }
  } catch (error) {
    return `Your code might be invalid: ${error}`;
  }
}