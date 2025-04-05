import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter.jsx";
import { store } from "./app/store.jsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Toaster richColors position="top-center" />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
