import dynamic from 'next/dynamic';
import getData from '@/helpers/data';
import Link from 'next/link';

// dom components goes here
const DOM = ({ experiment }) => {
  return (
    <div className='experiment'>
      <div className='hud'>
        <Link href={'/'}>
          <a>back to experiments</a>
        </Link>
        <h1>{experiment.name.toLowerCase()}</h1>
      </div>
    </div>
  );
};

// canvas components goes here
const R3F = ({ experiment }) => {
  const Experiment = dynamic(() =>
    import(`@/components/canvas/experiments/${experiment.page}`)
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
