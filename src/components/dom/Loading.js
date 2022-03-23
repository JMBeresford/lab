import useStore from '@/helpers/store';
import React, { useCallback, useEffect, useRef } from 'react';

const Loading = ({ progress }) => {
  const ref = useRef();

  const handleClick = useCallback(() => {
    ref.current.classList.add('out');
  }, []);

  useEffect(() => {
    const handleAnimationEnd = (e) => {
      if (e.animationName === 'out' && e.target === ref.current) {
        useStore.setState({ loaded: true });
      }
    };

    document.addEventListener('animationend', handleAnimationEnd);

    return () => {
      document.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  return (
    <div ref={ref} id='loading'>
      <div className='content'>
        <div className='text'>
          <h1>john beresford</h1>
          <h3>lab experiments</h3>
        </div>

        <div className='loadbar'>
          <p className={progress >= 100 ? 'out' : ''}>{parseInt(progress)}%</p>
          <div
            className={`bar ${progress >= 100 ? 'out' : ''}`}
            style={{ transform: `scaleX(${progress / 100})` }}
          />
          <button
            className={`${progress >= 100 ? 'in' : ''}`}
            onClick={handleClick}
          >
            enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loading;
