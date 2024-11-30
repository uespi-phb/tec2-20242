/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateCpf } from "../src/validate-cpf"

describe('validateCpf', () => {
test.each([
      '177.594.490-54',
      '515.070.430-07',
      '784.373.310-80'
  ])('Should validate a valid CPF: %s', (cpf: string) => {
    // Act
    const isValidCpf = validateCpf(cpf)
    // Assert
    expect(isValidCpf).toBe(true)
  })
    
  test.each([
    null,
    undefined,
    '1234567890',
    '123456789000'
  ])('Should not validate an invalid CPF: %s', (cpf: any) => {
    // Act
    const isValidCpf = validateCpf(cpf)
    // Assert
    expect(isValidCpf).toBe(false)
  })

  test('Should not validate a CPF width all digits the same: 11111111111', () => {
    // Arrange
    const cpf = '11111111111'
    // Act
    const isValidCpf = validateCpf(cpf)
    // Assert
    expect(isValidCpf).toBe(false)
  })

})
