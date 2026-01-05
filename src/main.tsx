import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { ApolloWrapper } from "./apollo/ApolloWraper";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <Provider>
    <StrictMode>
      <BrowserRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          }}
        >
          <ApolloWrapper>
            <App />
          </ApolloWrapper>
        </Auth0Provider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
