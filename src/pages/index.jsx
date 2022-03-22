import { useState, useEffect } from 'react';
import Loading from '@/components/dom/Loading';
import dynamic from 'next/dynamic';

const Experiments = dynamic(() => import('@/components/canvas/Experiments'), {
  ssr: false,
});

// dom components goes here
const DOM = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(1);
  }, []);

  return <Loading progress={progress} setLoaded={setLoaded} />;
};

// canvas components goes here
const R3F = () => {
  return (
    <>
      <Experiments />
    </>
  );
};

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'Lab - John Beresford',
    },
  };
}
