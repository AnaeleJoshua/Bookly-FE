import { ApolloProvider } from "@apollo/client/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { createApolloClient } from "./client";

type Props = {
  children: React.ReactNode;
};

export function ApolloWrapper({ children }: Props) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useMemo(() => {
    if (!isAuthenticated) return null;

    return createApolloClient(async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
             scope: "read:books write:books",
          },
          cacheMode: "on",
        });
        return token;
      } catch (err: any) {
        console.error("Failed to get access token:", err?.message || err);
        // Continue without token if retrieval fails
        return undefined;
      }
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!client) return <>{children}</>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
