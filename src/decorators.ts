function formatDate(date: Date): string {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

// Декоратор для додавання timestamp
export function withTimestamp<This, Return>(
  originalMethod: (this: This, message: string) => Return,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, message: string) => Return
  >,
) {
  return function (this: This, message: string): Return {
    const timestamp = `[${formatDate(new Date())}]`;

    return originalMethod.call(this, `${timestamp} ${message}`);
  };
}

// Декоратор для перетворення в верхній регістр
export function uppercase<This, Return>(
  originalMethod: (this: This, message: string) => Return,
  _context: ClassMethodDecoratorContext<
    This,
    (this: This, message: string) => Return
  >,
) {
  return function (this: This, message: string): Return {
    return originalMethod.call(this, message.toUpperCase());
  };
}
