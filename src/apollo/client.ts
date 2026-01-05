import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const createApolloClient = (
  getToken: () => Promise<string | undefined>
) => {
  const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:3000/graphql";

  if (!import.meta.env.VITE_GRAPHQL_URL) {
    console.warn(
      `VITE_GRAPHQL_URL not set, falling back to ${GRAPHQL_URL}. If your backend runs elsewhere, set VITE_GRAPHQL_URL in your .env.`
    );
  }

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
     headers: {
    "Content-Type": "application/json",
  },
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    console.log(`Using token: ${token}`);
    console.log(`authorization: Bearer ${token}`);
    return {
     headers: {
  ...headers,
  ...(token && { authorization: `Bearer ${token}` }),
},
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
