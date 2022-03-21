import React, { useCallback, useEffect, useRef } from 'react';

const Loading = ({ progress, setLoaded }) => {
  const ref = useRef();

  const handleClick = useCallback(() => {
    ref.current.classList.add('out');
    setLoaded(true);
  }, [setLoaded]);

  useEffect(() => {
    const handleAnimationEnd = (e) => {
      if (e.animationName === 'out' && e.target === ref.current) {
        ref.current.style.display = 'none';
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
          <p className={progress === 1 ? 'out' : ''}>
            {parseInt(progress * 100)}%
          </p>
          <div
            className={`bar ${progress === 1 ? 'out' : ''}`}
            style={{ transform: `scaleX(${progress})` }}
          />
          <button
            className={`${progress === 1 ? 'in' : ''}`}
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
