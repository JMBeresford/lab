import { extend, useThree } from '@react-three/fiber'
import { Effects, OrbitControls } from '@react-three/drei'
import HeroModel from './3d/HeroModel'
import Sky from './3d/Sky'
import { Suspense, useEffect } from 'react'
import useStore from '@/helpers/store'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BloomPass } from 'three-stdlib'

extend({ BloomPass })

const Experiment = () => {
  const { gl, camera, size } = useThree()

  useEffect(() => {
    camera.position.set(0, 5, 22.5)
    camera.rotation.reorder('YXZ')
    camera.rotation.set(0, 0, 0)

    camera.fov = 50
  }, [camera])

  useEffect(() => {
    gl.setClearColor('#000000', 0)
  }, [gl])

  useEffect(() => {
    useStore.setState({ experimentLoaded: true })
  }, [])

  const { threshold, smoothing, intensity } = useControls('Bloom', {
    intensity: { value: 0.85, min: 0, max: 1, step: 0.05 },
    smoothing: { value: 0.9, min: 0, max: 1, step: 0.05 },
    threshold: { value: 0.3, min: 0, max: 1, step: 0.05 },
  })

  return (
    <>
      <HeroModel />
      <OrbitControls
        maxDistance={50}
        minDistance={10}
        enablePan={false}
        enableDamping={true}
      />
      <Sky position={[0, 0, -20]} />

      <EffectComposer antialias={8}>
        <Bloom
          intensity={intensity}
          luminanceSmoothing={smoothing}
          luminanceThreshold={threshold}
          width={200}
          height={200}
        />
      </EffectComposer>
    </>
  )
}

export default Experiment
