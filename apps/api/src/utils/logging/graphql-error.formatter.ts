import { Logger } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

// Sanitizes outbound graphql responses
export function formatGraphQLError(error: GraphQLFormattedError): GraphQLFormattedError {
  const logger = new Logger('GraphQL');
  logger.error({ message: `GraphQL Error: ${error.message}`, error });

  // Determine message based on whether the error is a Known Error
  let errorMessage = 'Unknown error has occurred';

  if (error.message.startsWith('ALEXANDRIA_ERROR: ')) {
    errorMessage = error.message; //.replace('ALEXANDRIA_ERROR: ', '');
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
