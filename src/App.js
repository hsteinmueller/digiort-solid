import { useSession } from "@inrupt/solid-ui-react";
import LoginComponent from "./components/login";
import WelcomeComponent from "./components/welcome";

function App() {
  const { session } = useSession();

  return !session.info.isLoggedIn ? <LoginComponent /> : <WelcomeComponent />;
}

export default App;
