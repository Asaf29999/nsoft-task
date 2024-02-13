import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { performance } from 'perf_hooks';

@Injectable()
export class ExecutionTimeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = performance.now();

        res.on('finish', () => {
            const duration = performance.now() - start;
            const isGraphQL = GqlExecutionContext.create({} as any).getContext().graphql;

            if (!isGraphQL) {
                Logger.log(`Execution time: ${duration}ms`, 'ExecutionTimeMiddleware');
            }
        });

        next();
    }
}