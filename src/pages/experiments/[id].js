import dynamic from 'next/dynamic';
import getData from '@/helpers/data';
import Link from 'next/link';
import { useEffect } from 'react';
import useStore from '@/helpers/store';

// dom components goes here
const DOM = ({ experiment }) => {
  const experimentLoaded = useStore((state) => state.experimentLoaded);

  return (
    <>
      <div className='experiment'>
        <div className={`loadingIndicator ${experimentLoaded ? 'out' : ''}`}>
          <h3>loading experiment</h3>
          <h1>{experiment.name.toUpperCase()}</h1>
          <div className='bar' />
        </div>
        <div className='hud' style={{ color: experiment.hudColor }}>
          <Link href={'/'}>
            <a style={{ color: experiment.hudColor }}>back to experiments</a>
          </Link>
          <h1 style={{ pointerEvents: 'none', touchAction: 'none' }}>
            {experiment.name.toLowerCase()}
          </h1>
        </div>
      </div>
    </>
  );
};

// canvas components goes here
const R3F = ({ experiment }) => {
  const Experiment = dynamic(
    () => import(`@/components/canvas/experiments/${experiment.page}`),
    { ssr: false }
  );

  return (
    <>
      <Experiment />
    </>
  );
};

const Experiment = ({ experiment }) => {
  return (
    <>
      <DOM experiment={experiment} />
      <R3F r3f experiment={experiment} />
    </>
  );
};

export default Experiment;

export async function getStaticProps({ params }) {
  const experiment = getData().find((e) => e.page === params.id);

  return {
    props: {
      title: experiment.name,
      experiment,
    },
  };
}

export async function getStaticPaths() {
  const data = getData();

  const paths = data.map((experiment) => {
    return {
      params: {
        id: experiment.page,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}