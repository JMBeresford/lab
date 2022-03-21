import '../styles/globals.scss';
import useStore from '../src/store';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useStore.setState({ router });
  return <Component {...pageProps} />;
}

export default MyApp;
