export class AlexandriaErrorClass extends Error {
  constructor(message: string) {
    super('ALEXANDRIA_ERROR: ' + message);
    // Set the name explicitly

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, AlexandriaErrorClass.prototype);
  }
}

export function AlexandriaError(message: string): AlexandriaErrorClass {
  return new AlexandriaErrorClass(message);
}
