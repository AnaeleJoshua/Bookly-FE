import { Button} from "@chakra-ui/react"
import { useAuth0 } from "@auth0/auth0-react";




const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
    const handleLogin = () => {
     
      loginWithRedirect(
        {
          authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE, // your API
          scope: "read:books write:books", // API scopes
          prompt: "consent",
        }
      }
      );
    };
  return (
    <Button 
      onClick={handleLogin}
      className="button login"
    >
      Log In
    </Button>
  );
};

export default LoginButton;

