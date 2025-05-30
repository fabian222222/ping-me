import { HttpException, HttpStatus } from '@nestjs/common';

export class MessageNotFoundException extends HttpException {
  constructor() {
    super('Message not found', HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedMessageAccessException extends HttpException {
  constructor() {
    super(
      'You are not authorized to access this message',
      HttpStatus.FORBIDDEN,
    );
  }
}

export class UnauthorizedMessageModificationException extends HttpException {
  constructor() {
    super(
      'You are not authorized to modify this message',
      HttpStatus.FORBIDDEN,
    );
  }
}
