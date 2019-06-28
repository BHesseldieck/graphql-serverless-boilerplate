import { ApolloServer } from 'apollo-server-lambda';
import { connectToDB } from './src/models/db';
import loaders from './src/loaders/loaders';
import resolvers from './src/graphql/resolvers';
import typeDefs from './src/graphql/typeDefs';


// FIXME: Handle this more elegant.
connectToDB(); // DB URI can be passed as a string argument here or via the environment

console.log('Env type:', process.env.environment, 'ApiURL:', process.env.apiUrl);

// If you need more info checkout: https://www.apollographql.com/docs/apollo-server/api/apollo-server.html
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: process.env.environment !== 'prod',
  // Apollo Server 2.0 creates a single GraphQL endpoint that provides data and a gui explorer depending on how the endpoint is accessed. In browser, Apollo Server returns GraphQL playground.
  // For other cases, Apollo server returns the data for GraphQL requests from other clients, such as Apollo Client, curl, Postman, or Insomnia.
  introspection: process.env.environment !== 'prod',
  debug: process.env.environment !== 'prod',
  // You can set a default cache with this
  // cacheControl: { defaultMaxAge: 240 },
  cacheControl: true,
  // If you want to get performance metrics you can activate this. However you need to do the setup of the Apollo Engine: https://www.apollographql.com/docs/references/apollo-engine
  // engine: {
  //   apiKey: 'your-apollo-engine-apikey-here',
  // },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    loaders, // DataLoaders to avoid N+1 issue
  }),
});

exports.graphqlHandler = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  /**
   * If your event loop isn’t empty lambda will hold back the handler callback by default. (e.g. you kept a connection open with your db)
   * Use this property to prevent it from responding.
   * I think “sls invoke local” should replicate this behavior to avoid confusion (will create an issue).
   */
  context.callbackWaitsForEmptyEventLoop = false;

  // Ensuring that responses with errors don't get cached
  const callbackFilter = (error, output) => {
    if (output.body && output.body.includes('errors') && JSON.parse(output.body).errors) { // output.body.includes("PersistedQueryNotFound")
      output.headers['Access-Control-Allow-Origin'] = '*';
      output.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'; // HTTP 1.1.
      output.headers.Pragma = 'no-cache'; // HTTP 1.0.
      output.headers.Expires = '0'; // Proxies.
      output.headers['Access-Control-Allow-Headers'] = 'apollographql-client-version Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'; // Proxies.
    }
    callback(error, output);
  };

  return handler(event, context, callbackFilter);
};
