export class ApplicationError extends Error {
  statusCode: number;
  entityMetadata?: Record<string, string>;
  constructor(
    message: string,
    code: number = 500,
    entityMetadata?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApplicationError';
    this.entityMetadata = entityMetadata;
    this.statusCode = code;
  }

  getMetadata() {
    return JSON.stringify(this.entityMetadata || {});
  }
}

export class NotFoundError extends ApplicationError {
  constructor(entity: string, metadata?: { entityId: string }) {
    super(`${entity} not found`, 404, metadata);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string, metadata?: { rule: string }) {
    super(message, 400, metadata);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string, metadata?: { reason: string }) {
    super(message, 404, metadata);
    this.name = 'UnauthorizedError';
  }
}
