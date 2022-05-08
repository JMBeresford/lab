import { Flex, Box } from '@react-three/flex';
import { useEffect, useMemo, useRef, useState } from 'react';
import ExperimentImage from './ExperimentImage';

import { useFrame, useThree } from '@react-three/fiber';
import { damp, lerp } from 'three/src/math/MathUtils';
import getData from '@/helpers/data';

const IMAGE_SIZE = 4;
const MAX_COLUNMS = 4;

const ExperimentList = () => {
  const viewport = useThree((state) => state.viewport);
  const ref = useRef();
  const scroll = useRef(0);
  const touchY = useRef(0);

  const size = useMemo(() => {
    let maxWidth = MAX_COLUNMS * IMAGE_SIZE;

    let width = Math.min(
      Math.max(Math.floor(viewport.width * 0.9), 1),
      maxWidth
    );
    let height = Math.max(Math.floor(viewport.height * 0.6), 1);

    return { width, height };
  }, [viewport]);

  const [height, setHeight] = useState(0);

  const data = getData();

  useEffect(() => {
    const handleScroll = (e) => {
      scroll.current += e.deltaY * 0.01;
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      let y = e.touches[0].clientY;

      let dy = y - touchY.current;

      scroll.current -= dy * 0.02;

      touchY.current = y;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    let columns = Math.floor(size.width / IMAGE_SIZE);
    let rows = ref.current.children.length;

    // height of entire list in threejs units
    let h = Math.ceil(rows / columns - 1) * IMAGE_SIZE;

    h = Math.max(0, h);

    setHeight(h);
  }, [size]);

  useFrame((state, delta) => {
    if (scroll.current < 0) {
      scroll.current = 0;
    } else if (scroll.current > height) {
      scroll.current = height;
    }

    ref.current.position.y = damp(
      ref.current.position.y,
      -0.25 + scroll.current,
      4,
      delta
    );
  });

  return (
    <Flex
      ref={ref}
      justifyContent='center'
      alignItems='center'
      position={[0, -0.25, 0]}
      flexDirection='row'
      flexWrap='wrap'
      size={[size.width, size.height, 0]}
      centerAnchor
    >
      {data.map((experiment, idx) => (
        <Box
          key={idx}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          padding={1}
          centerAnchor
        >
          <ExperimentImage experiment={experiment} id={idx} />
        </Box>
      ))}
    </Flex>
  );
};

export default ExperimentList;
