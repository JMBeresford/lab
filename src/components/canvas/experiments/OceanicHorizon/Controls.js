import { useCursor } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { Vector2, Vector3 } from 'three';
import { lerp } from 'three/src/math/MathUtils';

const Controls = () => {
  const [dragging, setDragging] = useState(false);
  const mouse = useMemo(() => new Vector2(0, 0), []);
  const rotation = useMemo(() => new Vector3(0, 0, 0), []);

  const camera = useThree((state) => state.camera);

  useCursor(dragging, 'grabbing', 'grab');

  useEffect(() => {
    const handleMouseDown = (e) => {
      setDragging(true);

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
    };

    document.addEventListener('pointerdown', handleMouseDown);

    return () => {
      document.removeEventListener('pointerdown', handleMouseDown);
    };
  }, [setDragging]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        let x = (e.clientX / window.innerWidth) * 2 - 1;
        let y = (e.clientY / window.innerHeight) * -2 + 1;

        let dx = x - mouse.x;
        let dy = y - mouse.y;

        rotation.x -= dy;
        rotation.y += dx;

        mouse.set(x, y);
      }
    };

    document.addEventListener('pointermove', handleMouseMove);

    return () => {
      document.removeEventListener('pointermove', handleMouseMove);
    };
  }, [dragging]);

  useEffect(() => {
    const handleMouseUp = (e) => {
      setDragging(false);
    };

    document.addEventListener('pointerup', handleMouseUp);

    return () => {
      document.removeEventListener('pointerup', handleMouseUp);
    };
  }, [setDragging]);

  useFrame(() => {
    camera.rotation.x = lerp(camera.rotation.x, rotation.x, 0.1);
    camera.rotation.y = lerp(camera.rotation.y, rotation.y, 0.1);
  });

  return <></>;
};

export default Controls;
