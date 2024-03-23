import Context from "./context";
import { Layout } from "./layout";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Context>
      <Layout>
        <AppRoutes />
      </Layout>
    </Context>
  );
}

export default App;
