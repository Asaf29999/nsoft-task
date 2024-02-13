// // logging.interceptor.ts
// import {
//     Injectable,
//     NestInterceptor,
//     ExecutionContext,
//     CallHandler,
//     Logger,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//         const request = context.switchToHttp().getRequest();
//         const method = request.method;
//         const url = request.url;
//         const payload = request.body;

//         return next.handle().pipe(
//             tap((response) => {
//                 if (response) {
//                     const status = response.statusCode || response.status;
//                     const responseBody = response.body;

//                     Logger.log(
//                         `HTTP ${method} ${url} | Request Payload: ${JSON.stringify(
//                             payload,
//                         )} | Response Status: ${status} | Response Payload: ${JSON.stringify(
//                             responseBody,
//                         )}`,
//                         'LoggingInterceptor',
//                     );
//                 }
//             }),
//             map((response) => (response ? response.body : null)),
//             catchError((error) => {
//                 Logger.error(`Error in LoggingInterceptor: ${error.message}`, '', 'LoggingInterceptor');
//                 throw error;
//             }),
//         );
//     }
// }

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const payload = request.body;

    return next.handle().pipe(
      tap(response => {
        this.logger.log(`Method: ${method} | URL: ${url} | Request Payload: ${JSON.stringify(payload)} | Response Status: ${response?.status} | Response Data: ${JSON.stringify(response?.data || response)}`);
      }),
    );
  }
}