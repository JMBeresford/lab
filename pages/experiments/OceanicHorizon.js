import Link from 'next/link';
import React from 'react';
import Experiment from '../../components/experiments/OceanicHorizon';

const OceanicHorizon = () => {
  return (
    <div className='experiment'>
      <div className='hud'>
        <Link href={'/'}>back to experiments</Link>
        <h1>oceanic horizon</h1>
      </div>
      <Experiment />
    </div>
  );
};

export default OceanicHorizon;
