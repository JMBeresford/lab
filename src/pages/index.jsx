import { useState, useEffect } from 'react';
import Loading from '@/components/dom/Loading';
import dynamic from 'next/dynamic';
import { useProgress } from '@react-three/drei';
import useStore from '@/helpers/store';

const Experiments = dynamic(() => import('@/components/canvas/Experiments'), {
  ssr: false,
});

// dom components goes here
const DOM = () => {
  const loaded = useStore((state) => state.loaded);

  const { progress } = useProgress();

  return <>{!loaded && <Loading progress={progress} />}</>;
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
