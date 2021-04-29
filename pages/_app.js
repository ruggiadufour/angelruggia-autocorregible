import "../styles/globals.css";
import Layout from "../Components/Layout";
import { ProviderUserState } from "../Context/User";

function MyApp({ Component, pageProps }) {
  return (
    <ProviderUserState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderUserState>
  );
}

export default MyApp;
