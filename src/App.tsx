import MainMenu from "./components/MainMenu";
import { AppProvider } from "./contexts/AppContext";

const App = () => {
  return <MainMenu />;
};

const AppWithContext = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWithContext;
