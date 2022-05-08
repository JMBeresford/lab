import dynamic from 'next/dynamic'
import getData from '@/helpers/data'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import useStore from '@/helpers/store'
import { Stats } from '@react-three/drei'
import { Leva } from 'leva'
import Balance from '@/helpers/Balance'

const LoadingExperiment = () => {
  useEffect(() => {
    useStore.setState({ experimentLoaded: false })

    return () => {
      useStore.setState({ experimentLoaded: true })
    }
  }, [])

  return <></>
}

const HUD = ({ experiment }) => {
  const { experimentLoaded, debug, hideLeva, showcase, collapseLeva } =
    useStore()

  useEffect(() => {
    if (window.location.hash.includes('debug')) {
      useStore.setState({ debug: true })
    } else {
      useStore.setState({ debug: false })
    }
  }, [])

  useEffect(() => {
    if (window.location.hash.includes('showcase')) {
      useStore.setState({ showcase: true })
    } else {
      useStore.setState({ showcase: false })
    }
  }, [])

  return (
    <>
      <div className='experiment'>
        {debug && <Stats />}
        <div className={`loadingIndicator ${experimentLoaded ? 'out' : ''}`}>
          <h3>loading experiment</h3>
          <h1>{experiment.name.toUpperCase()}</h1>
          <div className='bar' />
        </div>
        <div
          className='hud'
          style={{ color: experiment.hudColor, opacity: showcase ? 0 : 1 }}
        >
          <div className='back'>
            <Link href={'/'}>
              <a style={{ color: experiment.hudColor }}>back to experiments</a>
            </Link>
            <div
              className='backdrop'
              style={{ backgroundColor: experiment.themeColor }}
            />
          </div>
          <h1 style={{ pointerEvents: 'none', touchAction: 'none' }}>
            {experiment.name.toLowerCase()}
          </h1>

          <div
            className='codeBtn'
            style={{
              backgroundColor: experiment.themeColor,
              boxShadow: `0px 0px 10px 2px ${experiment.hudColor}88`,
            }}
          >
            <a
              style={{ color: experiment.hudColor }}
              rel='noreferrer'
              target='_blank'
              href={`https://github.com/JMBeresford/lab/tree/main/src/components/canvas/experiments/${experiment.page}`}
            >
              {'</>'}
            </a>
          </div>
        </div>
      </div>
      <Leva
        hidden={hideLeva}
        collapsed={{
          collapsed: collapseLeva,
          onChange: (collapsed) => {
            useStore.setState({ collapseLeva: collapsed })
          },
        }}
      />
    </>
  )
}

const Experiment = ({ experiment }) => {
  const Scene = dynamic(
    () => import(`@/components/canvas/experiments/${experiment.page}/Scene`),
    { ssr: false, suspense: true }
  )

  const DOM = dynamic(
    () => import(`@/components/canvas/experiments/${experiment.page}`),
    { ssr: false }
  )

  return (
    <>
      <HUD experiment={experiment} />
      <DOM />

      <Scene r3f />
    </>
  )
}

export default Experiment

export async function getStaticProps({ params }) {
  const experiment = getData().find((e) => e.page === params.id)

  return {
    props: {
      title: experiment.name,
      experiment,
    },
  }
}

export async function getStaticPaths() {
  const data = getData()

  const paths = data.map((experiment) => {
    return {
      params: {
        id: experiment.page,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
