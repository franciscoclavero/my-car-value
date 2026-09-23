import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before the request is handled by the request handler

    console.log('Im running before the request is handled', context);
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent back to the client
        console.log(
          'Im running before the response is sent back to the client',
          data,
        );
      }),
    );
  }
}
