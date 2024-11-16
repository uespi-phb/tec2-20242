
export class Stack<T> {
  private elements: T[] = []
  private size?: number

  constructor(size?: number) {
    if (size !== undefined) {
      if (size < 0) throw new InvalidStackSizeError('Stack size must be non-negative')
      if (!Number.isInteger(size)) throw new InvalidStackSizeError('Stack size must be a whole number')
    }
    this.size = size
  }

  count(): number {
    return this.elements.length
  }

  push(value: T): void {
    if (this.full()) throw new StackOverflowError()
    this.elements.push(value)
  }

  pop(): T {
    if (this.empty()) throw new StackUnderflowError()
    return this.elements.pop()!
  }

  empty(): boolean {
    return this.elements.length === 0
  }

  full(): boolean {
    return (this.size != undefined) ? this.elements.length === this.size : false
  }
}

export class InvalidStackSizeError extends Error {
  constructor(message?: string) {
    super(message)
  }
}

export class StackUnderflowError extends Error {
  constructor(message?: string) {
    super(message)
  }
}

export class StackOverflowError extends Error {
  constructor(message?: string) {
    super(message)
  }
}
