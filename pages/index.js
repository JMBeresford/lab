import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Experiments from '../components/Experiments';
import Head from 'next/head';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(1);
  }, []);

  return (
    <div>
      <Head>
        <title>UNDER CONSTRUCTION</title>
        <meta property='og:url' content='http://lab.john-beresford.com/' />
        <meta property='og:title' content='John Beresford - Lab Experiments' />
        {/* <meta property='og:description' content={desc} /> */}
        <meta property='og:type' content='website' />
        {/* <meta property='og:image' content='https://i.imgur.com/7jTV5ql.png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' /> */}
        <meta name='theme-color' content='#ff9e9e' />
      </Head>
      <Loading progress={progress} setLoaded={setLoaded} />
      <Experiments />
    </div>
  );
}
