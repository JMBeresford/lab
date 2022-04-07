import { useState, useEffect } from 'react';
import Loading from '@/components/dom/Loading';
import dynamic from 'next/dynamic';
import { useProgress } from '@react-three/drei';
import useStore from '@/helpers/store';
import PortfolioLink from '@/components/dom/PortfolioLink';

const Experiments = dynamic(() => import('@/components/canvas/Experiments'), {
  ssr: false,
});

// dom components goes here
const DOM = () => {
  const experienceStarted = useStore((state) => state.experienceStarted);

  const { progress } = useProgress();

  return (
    <>
      {!experienceStarted && <Loading progress={progress} />}
      <PortfolioLink />
    </>
  );
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
