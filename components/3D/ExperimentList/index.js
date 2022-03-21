import { Flex, Box } from '@react-three/flex';
import { useEffect, useMemo, useRef, useState } from 'react';
import ExperimentImage from '../ExperimentImage';

import oceanicHorizonImage from '../../../src/img/experiments/oceanichorizon.png';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';

const ExperimentList = () => {
  const viewport = useThree((state) => state.viewport);
  const ref = useRef();
  const scroll = useRef(0);

  const size = useMemo(() => {
    let width = Math.min(Math.max(Math.floor(viewport.width * 0.9), 1), 9);
    let height = Math.max(Math.floor(viewport.height * 0.6), 1);

    return { width, height };
  }, [viewport]);

  const [height, setHeight] = useState(0);

  const data = useMemo(
    () => [
      {
        name: 'Oceanic Horizon',
        page: 'OceanicHorizon',
        image: oceanicHorizonImage.src,
      },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = (e) => {
      scroll.current += e.deltaY * 0.01;

      if (scroll.current < 0) {
        scroll.current = 0;
      } else if (scroll.current > height) {
        scroll.current = height;
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [height]);

  useEffect(() => {
    let columns = size.width / 3;
    let rows = ref.current.children.length;

    // height of entire list in threejs units
    let h = (rows / columns - 1) * 3;

    setHeight(h);
  }, [size]);

  useFrame(() => {
    ref.current.position.y = lerp(
      ref.current.position.y,
      -0.25 + scroll.current,
      0.1
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
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
      <Box width={3} height={3} padding={1} centerAnchor>
        <ExperimentImage experiment={data[0]} />
      </Box>
    </Flex>
  );
};

export default ExperimentList;
