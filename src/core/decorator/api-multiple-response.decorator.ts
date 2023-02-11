import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export interface Options {
  status: number;
  examples: Record<string, string>;
}

export const ApiMultipleResponseDecorator = (options: Options) => {
  const { status, examples } = options;

  const apiResponseOptions: ApiResponseOptions = {
    status,
    content: {
      'application/json': {
        examples: {},
      },
    },
  };

  Object.keys(examples).forEach((key) => {
    apiResponseOptions.content['application/json'].examples[key] = {
      value: examples[key],
    };
  });

  return ApiResponse(apiResponseOptions);
};
