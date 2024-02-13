import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { performance } from 'perf_hooks';

export const ExecutionTime = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const isGraphQL = GqlExecutionContext.create(ctx).getContext().graphql;

    const start = performance.now();
    
    return {
      provide: 'executionTime',
      useValue: { start, isGraphQL },
    };
  },
);

export const LogExecutionTime = () => SetMetadata('logExecutionTime', true);