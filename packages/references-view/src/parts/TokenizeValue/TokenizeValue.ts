const keywords = [
  'var',
  'let',
  'const',
  'if',
  'else',
  'for',
  'while',
  'return',
  'class',
  'extends',
  'new',
  'this',
  'super',
  'import',
  'export',
  'default',
  'async',
  'await',
  'try',
  'catch',
  'finally',
  'throw',
  'switch',
  'case',
  'break',
  'continue',
  'do',
  'in',
  'of',
  'typeof',
  'instanceof',
  'delete',
  'void',
  'null',
  'undefined',
  'true',
  'false',
  'Infinity',
  'NaN',
]

const operators = [
  '=',
  '==',
  '===',
  '!=',
  '!==',
  '<',
  '<=',
  '>',
  '>=',
  '+',
  '-',
  '*',
  '/',
  '**',
  '%',
  '++',
  '--',
  '&&',
  '||',
  '!',
  '&',
  '|',
  '^',
  '~',
  '<<',
  '>>',
  '>>>',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '**=',
  '&=',
  '|=',
  '^=',
  '<<=',
  '>>=',
  '>>>=',
  '=>',
  '?',
  '?.',
  '??',
  '??=',
  '...',
]

const punctuation = ['(', ')', '[', ']', '{', '}', ';', ',', '`', ':', '.']

const isWhitespace = (char: string): boolean => /\s/.test(char)
const isDigit = (char: string): boolean => /[0-9]/.test(char)
const isLetter = (char: string): boolean => /[a-zA-Z_]/.test(char)
const isIdentifierChar = (char: string): boolean => isLetter(char) || isDigit(char) || char === '_' || char === '$'

const readWhitespace = (input: string, current: number, tokens: string[]): number => {
  let whitespace = ''
  let pos = current
  while (pos < input.length && isWhitespace(input[pos])) {
    whitespace += input[pos]
    pos++
  }
  if (whitespace) {
    tokens.push(whitespace, 'WhiteSpace')
  }
  return pos
}

const readString = (input: string, current: number, tokens: string[]): number => {
  const quote = input[current]
  let string = quote
  let pos = current + 1
  while (pos < input.length && input[pos] !== quote) {
    if (input[pos] === '\\') {
      string += input[pos]
      pos++
      if (pos < input.length) {
        string += input[pos]
        pos++
      }
    } else {
      string += input[pos]
      pos++
    }
  }
  if (pos < input.length) {
    string += input[pos]
    pos++
  }
  tokens.push(string, 'String')
  return pos
}

const readNumber = (input: string, current: number, tokens: string[]): number => {
  let number = ''
  let pos = current
  if (input[pos] === '0' && pos + 1 < input.length) {
    const next = input[pos + 1].toLowerCase()
    if (next === 'x' || next === 'b' || next === 'o') {
      number += input[pos] + input[pos + 1]
      pos += 2
      while (pos < input.length && /[0-9a-fA-F]/.test(input[pos])) {
        number += input[pos]
        pos++
      }
      tokens.push(number, 'Number')
      return pos
    }
  }
  while (pos < input.length && isDigit(input[pos])) {
    number += input[pos]
    pos++
  }
  if (pos < input.length && input[pos] === '.' && pos + 1 < input.length && isDigit(input[pos + 1])) {
    number += input[pos]
    pos++
    while (pos < input.length && isDigit(input[pos])) {
      number += input[pos]
      pos++
    }
  }
  if (pos < input.length && (input[pos] === 'e' || input[pos] === 'E')) {
    number += input[pos]
    pos++
    if (pos < input.length && (input[pos] === '+' || input[pos] === '-')) {
      number += input[pos]
      pos++
    }
    while (pos < input.length && isDigit(input[pos])) {
      number += input[pos]
      pos++
    }
  }
  tokens.push(number, 'Number')
  return pos
}

const readIdentifier = (input: string, current: number, tokens: string[]): number => {
  let identifier = ''
  let pos = current
  while (pos < input.length && isIdentifierChar(input[pos])) {
    identifier += input[pos]
    pos++
  }
  if (identifier === 'function') {
    tokens.push(identifier, 'Function')
  } else if (keywords.includes(identifier)) {
    tokens.push(identifier, 'Keyword')
  } else {
    tokens.push(identifier, 'Identifier')
  }
  return pos
}

const readOperator = (input: string, current: number, tokens: string[]): number => {
  let operator = ''
  let maxLength = 0
  let pos = current
  for (const op of operators) {
    if (input.slice(pos, pos + op.length) === op && op.length > maxLength) {
      maxLength = op.length
      operator = op
    }
  }
  if (operator) {
    tokens.push(operator, 'Operator')
    pos += operator.length
  } else {
    tokens.push(input[pos], 'Punctuation')
    pos++
  }
  return pos
}

const readComment = (input: string, current: number, tokens: string[]): number => {
  let comment = ''
  let pos = current
  if (input[pos] === '/' && pos + 1 < input.length) {
    if (input[pos + 1] === '/') {
      comment = '//'
      pos += 2
      while (pos < input.length && input[pos] !== '\n') {
        comment += input[pos]
        pos++
      }
    } else if (input[pos + 1] === '*') {
      comment = '/*'
      pos += 2
      while (pos < input.length - 1) {
        comment += input[pos]
        if (input[pos] === '*' && input[pos + 1] === '/') {
          comment += '/'
          pos += 2
          break
        }
        pos++
      }
    }
  }
  if (comment) {
    tokens.push(comment, 'Comment')
  }
  return pos
}

export const tokenizeValue = (input: string): string[] => {
  const tokens: string[] = []
  let current = 0
  while (current < input.length) {
    const char = input[current]
    if (isWhitespace(char)) {
      current = readWhitespace(input, current, tokens)
    } else if (char === '"' || char === "'" || char === '`') {
      current = readString(input, current, tokens)
    } else if (isDigit(char)) {
      current = readNumber(input, current, tokens)
    } else if (isLetter(char) || char === '_' || char === '$') {
      current = readIdentifier(input, current, tokens)
    } else if (char === '/' && current + 1 < input.length && (input[current + 1] === '/' || input[current + 1] === '*')) {
      current = readComment(input, current, tokens)
    } else if (
      operators.includes(char) ||
      (current + 1 < input.length && operators.includes(char + input[current + 1])) ||
      (current + 2 < input.length && operators.includes(char + input[current + 1] + input[current + 2]))
    ) {
      current = readOperator(input, current, tokens)
    } else if (punctuation.includes(char)) {
      tokens.push(char, 'Punctuation')
      current++
    } else {
      tokens.push(char, 'Punctuation')
      current++
    }
  }
  return tokens
}
