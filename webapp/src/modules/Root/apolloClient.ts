import {API_URL} from "@config/baseUrls";
import {
  ApolloClient,
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
// import introspectionResult from "@generated/introspection-result";

const httpLink = createHttpLink({
  uri: API_URL,
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  // introspectionQueryResultData:
});

const cache = new InMemoryCache({
  fragmentMatcher,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
