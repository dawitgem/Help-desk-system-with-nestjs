import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordUpdateException extends HttpException {
  constructor(message: string) {
    console.log(message);
    super({ message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
  }
}
