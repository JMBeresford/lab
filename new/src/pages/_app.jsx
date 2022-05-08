import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Balance from '@/helpers/Balance'
import '@/styles/globals.scss'
import Script from 'next/script'
import * as ga from '../../lib/ga'

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header title={pageProps.title} experiment={pageProps.experiment} />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-77KMRW6WVC'
      />
      <Script strategy='afterInteractive' id='gtag'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-77KMRW6WVC', {page_path: window.location.pathname});
          `}
      </Script>
      {child && child.length > 1 ? (
        <Balance child={child} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default App
