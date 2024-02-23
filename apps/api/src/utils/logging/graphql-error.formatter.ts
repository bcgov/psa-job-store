import { Logger } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

// Sanitizes outbound graphql responses
export function formatGraphQLError(error: GraphQLFormattedError): GraphQLFormattedError {
  const logger = new Logger('GraphQL');
  logger.error({ message: `GraphQL Error: ${error.message}`, error });
  // Exclude stacktrace and locations from the error object
  const formattedError: GraphQLFormattedError = {
    message: error.message,
    extensions: {
      code: error.extensions?.code,
    },
  };

  return formattedError;
}
