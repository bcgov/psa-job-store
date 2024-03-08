import { Logger } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

// Sanitizes outbound graphql responses
export function formatGraphQLError(error: GraphQLFormattedError): GraphQLFormattedError {
  const logger = new Logger('GraphQL');
  logger.error({ message: `GraphQL Error: ${error.message}`, error });

  // Determine message based on whether the error is a Known Error
  let errorMessage = 'Unknown error has occurred';

  // todo: check this more gracefully - wasn't able to check for type etc, so checking if stack trace contains info
  // indicating it's an AlexandriaErrorClass
  const stacktrace = error.extensions?.stacktrace as string[] | undefined;
  if (stacktrace && stacktrace.some((line) => line.includes('AlexandriaErrorClass:'))) {
    errorMessage = error.message; // If found, use the original error message
  }

  // Exclude stacktrace and locations from the error object
  const formattedError: GraphQLFormattedError = {
    message: errorMessage,
    extensions: {
      code: error.extensions?.code,
    },
  };

  return formattedError;
}
