import { Image, Text as T, useCursor } from '@react-three/drei'
import { useFlexSize } from '@react-three/flex'
import font from '@/fonts/MajorMonoDisplay.ttf'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { lerp } from 'three/src/math/MathUtils'
import { useSpring, animated } from 'react-spring'
import useStore from '@/helpers/store'

const Text = animated(T)

const ExperimentImage = ({ experiment, id }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef()
  const [w, h] = useFlexSize()
  useCursor(hovered)

  const router = useStore((state) => state.router)

  const { opacity } = useSpring({
    opacity: hovered ? 1 : 0,
  })

  useEffect(() => {
    ref.current.material.depthTest = false
    ref.current.material.depthWrite = false
    ref.current.material.transparent = true
  }, [])

  useFrame(() => {
    if (ref.current) {
      let spring = hovered ? 0 : 0.75
      let zoom = hovered ? 1.25 : 1
      let scale = hovered ? 1.1 : 1

      ref.current.material.grayscale = lerp(
        ref.current.material.grayscale,
        spring,
        0.05
      )

      ref.current.material.zoom = lerp(ref.current.material.zoom, zoom, 0.05)
      ref.current.scale.x = lerp(ref.current.scale.x, scale, 0.05)
      ref.current.scale.y = lerp(ref.current.scale.y, scale, 0.05)
    }
  })

  return (
    <group scale={[w * 0.8, h * 0.8, 1]}>
      <Image
        url={experiment.image}
        alt={`${experiment.name} preview`}
        onPointerOver={() => {
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
        onClick={() => router.push(`/experiments/${experiment.page}`)}
        ref={ref}
      />
      <Text
        text={`-${id}-\n\n${experiment.name.toLowerCase()}`}
        font={font}
        color='black'
        textAlign='center'
        fontSize={0.135}
        maxWidth={0.9}
        fillOpacity={opacity}
        strokeOpacity={opacity}
        outlineWidth={'20%'}
        outlineColor='white'
        outlineBlur={'20%'}
        outlineOpacity={opacity}
        position={[0, 0, 0.1]}
      />
    </group>
  )
}

export default ExperimentImage
