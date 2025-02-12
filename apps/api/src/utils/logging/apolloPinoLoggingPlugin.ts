import { ApolloServerPlugin } from '@apollo/server';
import { globalLogger } from './logger.factory';

export const apolloPinoLoggingPlugin: ApolloServerPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async requestDidStart(_requestContext) {
    // Log the incoming GraphQL query
    return {
      async didEncounterErrors(rc) {
        // remove png data from log if error happened during pr submission
        const vars = rc.request.variables;
        if (vars.orgchart_png) vars.orgchart_png = '[REDACTED]';

        globalLogger.error(
          {
            query: rc.request.query,
            variables: rc.request.variables,
            errors: rc.errors,
          },
          'GraphQL Query with Error',
        );

        // Log the error details
        // rc.errors.forEach((error) => {
        //   globalLogger.error(
        //     {
        //       error: {
        //         message: error.message,
        //         locations: error.locations,
        //         path: error.path,
        //         extensions: error.extensions,
        //       },
        //     },
        //     'GraphQL Error',
        //   );
        // });
      },
    };
  },
};
