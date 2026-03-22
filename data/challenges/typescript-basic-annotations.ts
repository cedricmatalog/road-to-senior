import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-basic-annotations',
  title: 'Add Type Annotations',
  description: 'A teammate passed a string where a number was expected and it broke in production. Add annotations so TypeScript catches it at compile time.',
  type: 'code',
  difficulty: 'junior',
  skills: ['typescript'],
  content: {
    overview: 'TypeScript annotations tell the compiler what types values should be. Annotating function parameters and return types catches bugs before the code runs — a typo or wrong type becomes a red underline, not a runtime crash. In a codebase without annotations, JavaScript silently coerces mismatched types, which is how "£undefined" ends up on a checkout page.',
    starterCode: `// The e-commerce checkout page has a bug: prices sometimes render as "£NaN"
// because callers pass a string like "9.99" instead of the number 9.99.
// Add type annotations so TypeScript flags that mistake at compile time.
function formatPrice(amount, currency) {
  return \`\${currency}\${amount.toFixed(2)}\`
}`,
    solution: `function formatPrice(amount: number, currency: string): string {
  return \`\${currency}\${amount.toFixed(2)}\`
}`,
    explanation: 'Parameter annotations go after the name: `amount: number`. The return type goes after the closing parenthesis: `): string`. TypeScript will now error if a caller passes a string — the bug is caught at compile time, not in production.',
    hints: [
      'Parameter annotations go after the name: `name: type`',
      'Return type goes after the closing parenthesis: `): type {`',
      '`amount` should be `number`, `currency` should be `string`, and the return is `string`',
    ],
    testCases: [
      {
        description: 'formats integer price',
        testCode: `assert.strictEqual(formatPrice(10, '$'), '$10.00')`,
      },
      {
        description: 'formats decimal price',
        testCode: `assert.strictEqual(formatPrice(9.5, '€'), '€9.50')`,
      },
      {
        description: 'formats zero',
        testCode: `assert.strictEqual(formatPrice(0, '£'), '£0.00')`,
      },
    ],
  },
}
export default challenge
