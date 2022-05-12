import { useThree } from '@react-three/fiber'
import Sky from './Sky'
import Ocean from './Ocean'
import { useEffect } from 'react'
import useStore from '@/helpers/store'
import Controls from './Controls'
import { OrbitControls } from '@react-three/drei'

const Experiment = () => {
  const camera = useThree((state) => state.camera)

  // useEffect(() => {
  //   camera.position.set(0, 3.5, 0)
  //   camera.rotation.reorder('YXZ')
  // }, [camera.position, camera.rotation])

  useEffect(() => {
    useStore.setState({ experimentLoaded: true })
  }, [])

  return (
    <>
      <Sky />
      <Ocean />
      {/* <Controls /> */}

      <OrbitControls
        position={[0, 2.5, 0]}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.075}
        target={[0, 2.5, 0]}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default Experiment
