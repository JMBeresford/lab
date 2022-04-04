import { useRouter } from 'next/router';
import useStore from '@/helpers/store';
import { useEffect } from 'react';
import Header from '@/config';
import Dom from '@/components/layout/dom';
import partition from '@/helpers/partition';
import '@/styles/globals.scss';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import * as ga from '../../lib/ga';

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
});

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true);

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  );
};

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const child = Component(pageProps).props.children;

  return (
    <>
      <Header title={pageProps.title} />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-77KMRW6WVC'
      />
      <Script strategy='afterInteractive' id='gtag'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-77KMRW6WVC', {page_path: window.location.pathname});
          `}
      </Script>
      {child && child.length > 1 ? (
        <Balance child={Component(pageProps).props.children} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
