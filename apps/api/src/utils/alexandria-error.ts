export class AlexandriaErrorClass extends Error {
  constructor(
    message: string,
    public code: string = 'ALEXANDRIA_ERROR',
  ) {
    super(message);
    // Set the name explicitly
    this.name = 'AlexandriaErrorClass';

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, AlexandriaErrorClass.prototype);
  }
}

export function AlexandriaError(message: string): AlexandriaErrorClass {
  return new AlexandriaErrorClass(message);
}
