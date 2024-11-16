import { InvalidStackSizeError, Stack, StackOverflowError, StackUnderflowError } from '../src/stack'


describe('Stack', () => {
  let stack: Stack<number>

  beforeEach(() => {
    stack = new Stack()
  })

  it('should returns the number of staked elements', () => {
    // Act
    const count = stack.count()
    // Assert
    expect(count).toBe(0)
  })

  it('should stack elements', () => {
    // Act
    stack.push(10)
    stack.push(20)
    stack.push(30)
    // Assert
    expect(stack.count()).toBe(3)
  })

  it('should unstack the same element that was stacked', () => {
    // Arrange
    const stackedValue = 10
    stack.push(stackedValue)
    // Act
    const unstackedValue = stack.pop()
    // Assert
    expect(stack.count()).toBe(0)
    expect(unstackedValue).toBe(stackedValue)
  })

  it('should be empty after instantiation (creation)', () => {
    // Act
    const isEmpty = stack.empty()
    // Assert
    expect(isEmpty).toBe(true)
  })

  it('should check if stack is not empty', () => {
    // Arrange
    stack.push(10)
    // Act
    const isEmpty = stack.empty()
    // Assert
    expect(isEmpty).toBe(false)
  })

  it('should check if stack is full', () => {
    // Act
    const isFull = stack.full()
    // Assert
    expect(isFull).toBe(false)
  })

  it('should have a limited size', () => {
    // Arrange
    stack = new Stack(3)
    stack.push(10)
    stack.push(20)
    stack.push(30)
    // Act
    const isFull = stack.full()
    // Assert
    expect(isFull).toBe(true)
  })

  it('should have an unlimited size', () => {
    // Arrange
    stack.push(10)
    stack.push(20)
    stack.push(30)
    // Act
    const isFull = stack.full()
    // Assert
    expect(isFull).toBe(false)
  })

  it('elements of a Stack<number> must be numbers', () => {
    // Arrange
    stack.push(10)
    // Act
    const unstackedValue = stack.pop()
    // Assert
    expect(typeof unstackedValue).toBe('number')
  })

  it('elements of a Stack<string> must be strings', () => {
    // Arrange
    const stack = new Stack<string>()
    stack.push('any_string')
    // Act
    const unstackedValue = stack.pop()
    // Assert
    expect(typeof unstackedValue).toBe('string')
  })

  it('should throw InvalidStackSizeError if size is negative', () => {
    // Arrange / Act / Assert
    expect(() => { new Stack(-1) }).toThrow(InvalidStackSizeError)
  })

  it('should throw InvalidStackSizeError if size is not a whole number (integer)', () => {
    // Arrange / Act / Assert
    expect(() => { new Stack(1.5) }).toThrow(InvalidStackSizeError)
  })

  it('should throw StackUnderflowError if pop on an empty stack', () => {
    // Arrange / Act / Assert
    expect(() => { stack.pop() }).toThrow(StackUnderflowError)
  })

  it('should throw StackOverflowError if push on an full stack', () => {
    // Arrange 
    stack = new Stack(3)
    stack.push(10)
    stack.push(20)
    stack.push(30)
    // Act / Assert
    expect(() => { stack.push(40) }).toThrow(StackOverflowError)
  })
})
