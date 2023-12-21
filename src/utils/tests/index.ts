var esprima = require('esprima');
var { Script, createContext } = require('vm');
var _ = require('lodash');

function parseStringToJson(str: string, isOutput = false) {
  try {
    // Directly parse the output or single input value as JSON
    if (isOutput) {
      return JSON.parse(str);
    }

    if (!str.includes('|')) {
      return [JSON.parse(str)];
    }

    // For multiple inputs, split by '|', trim, and parse each part
    return str.split('|').map(value => {
      value = value.trim();
      if (value === 'null') return null;
      if (value.startsWith('"') && value.endsWith('"')) {
        // Remove quotes for explicit strings
        return value.slice(1, -1);
      }
      if (/^-?\d+\.?\d*$/.test(value)) return Number(value);
      return value; // Return as string if not explicitly marked as a string
    });
  } catch (error) {
    return str;
  }
}

export function isSolutionValid(
  content: string,
  expectedInput: string,
  expectedOutput: string
): string | boolean {
  try {
    const parsed = esprima.parseScript(
      content,
      {},
      { tolerant: true, range: true, tokens: true }
    );
    if (
      parsed.body.length === 0 ||
      parsed.body[0].type !== 'FunctionDeclaration'
    ) {
      return 'Your solution must start with a function declaration.';
    }

    const parsedInput = parseStringToJson(expectedInput);
    const parsedOutput = parseStringToJson(expectedOutput, true);
    const functionName = parsed.body[0].id.name;

    const sandbox = {
      parsedInput: parsedInput,
      result: null
    };
    const context = createContext(sandbox);

    const script = new Script(`
      ${content}
      result = (${functionName})(...parsedInput);
    `);

    script.runInContext(context);

    // Using Lodash's isEqual for deep equality comparison
    if (_.isEqual(context.result, parsedOutput)) {
      return true;
    } else {
      return `The output (${JSON.stringify(
        context.result
      )}) does not match the expected output (${JSON.stringify(
        parsedOutput
      )}).`;
    }
  } catch (error) {
    if (error instanceof Error) {
      return `An error occurred during execution: ${error.message || error}`;
    }
    return `An error occurred during execution: ${error}`;
  }
}
