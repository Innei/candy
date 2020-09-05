import { message } from 'antd'
import 'assets/styles/main.scss'
import { useStore } from 'common/store'
import Loader from 'components/Loader'
import configs from 'configs'
import { BasicLayout } from 'layouts/BasicLayout'
import throttle from 'lodash/throttle'
import { LogoJsonLd, NextSeo, SocialProfileJsonLd } from 'next-seo'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Router } from 'next/router'
import 'normalize.css'
import React, { FC, useCallback, useState } from 'react'
import useMount from 'react-use/lib/useMount'
import useUnmount from 'react-use/lib/useUnmount'
import { UAParser } from 'ua-parser-js'
import Package from '../package.json'

let _currentY = 0
const Content: FC = (props) => {
  const [loading, setLoading] = useState(true)
  const { appStore: app } = useStore()
  useMount(() => {
    printToConsole()
    setLoading(false)
    app.setLoading(false)
    checkBrowser()
    registerRouterEvents()
    registerEvent()
    initColorMode()

    setPages()
  })
  const setPages = useCallback(() => {
    fetch('/data/pages.json').then((res) => {
      res.json().then((json) => {
        const pages = Object.values(json)

        app.setPage(
          pages.map((i: any) => ({
            created: i.created,
            modified: i.modified,
            order: i.order,
            slug: i.slug,
            title: i.title,
          })),
        )
      })
    })
  }, [])

  const registerEvent = useCallback(() => {
    const resizeHandler = throttle(() => {
      app.updateViewport()
    }, 300)
    window.onresize = resizeHandler
    app.updateViewport()

    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScroll = useCallback(
    throttle(() => {
      const currentY = document.documentElement.scrollTop
      const direction = _currentY >= currentY ? 'up' : 'down'
      app.updatePosition(direction)
      _currentY = currentY
    }, 13),
    [],
  )
  const checkBrowser = useCallback(() => {
    const parser = new UAParser(window.navigator.userAgent)
    const browser = parser.getBrowser()
    const isOld: boolean = (() => {
      if (browser.name === 'IE') {
        alert(
          '欧尼酱, 乃真的要使用 IE 浏览器吗, 不如换个 Chrome 好不好嘛（o´ﾟ□ﾟ`o）',
        )
        location.href = 'https://www.google.com/chrome/'
        return true
      }
      // check build-in methods
      const ObjectMethods = ['fromEntries', 'entries']
      const ArrayMethods = ['flat']
      if (
        !window.Reflect ||
        !(
          ObjectMethods.every((m) => Reflect.has(Object, m)) &&
          ArrayMethods.every((m) => Reflect.has(Array.prototype, m))
        ) ||
        !window.requestAnimationFrame ||
        !window.Proxy
      ) {
        return true
      }

      return false
    })()
    if (isOld) {
      message.warn('欧尼酱, 乃的浏览器太老了, 更新一下啦（o´ﾟ□ﾟ`o）')
      class BrowserTooOldError extends Error {
        constructor() {
          const { name: osName, version: osVersion } = parser.getOS()
          super(
            `User browser(${browser.name} ${browser.version}) is too old. OS: ${osName}/${osVersion}`,
          )
        }
      }

      throw new BrowserTooOldError()
    }
  }, [])
  useUnmount(() => {
    window.onresize = null
    document.removeEventListener('scroll', handleScroll)
  })
  const initColorMode = useCallback(() => {
    const getColormode = <T extends { matches: boolean }>(e: T) => {
      app.colorMode = e.matches ? 'dark' : 'light'
      return app.colorMode
    }
    app.colorMode = getColormode(
      window.matchMedia('(prefers-color-scheme: dark)'),
    )
    try {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (app.autoToggleColorMode) {
            getColormode(e)
          }
        })
      // eslint-disable-next-line no-empty
    } catch {}
  }, [])

  const registerRouterEvents = useCallback(() => {
    Router.events.on('routeChangeStart', (url) => {
      setTimeout(() => {
        if (app.loading) {
          setLoading(true)
        }
      }, 500)
      app.setLoading(true)
    })
    Router.events.on('routeChangeComplete', () => {
      // window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
      setLoading(false)

      app.setLoading(false)
    })

    Router.events.on('routeChangeError', () => {
      // window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
      setLoading(false)
      app.setLoading(false)
      message.error('出现了未知错误, 刷新试试?')
    })
  }, [])

  return (
    <>
      <NextSeo
        title={configs.title + ' · ' + configs.description}
        description={configs.description}
      />
      <LogoJsonLd
        logo={new URL('/custom-icon.svg', configs.url).toString()}
        url={configs.url}
      />
      <SocialProfileJsonLd
        type={'Person'}
        name={configs.author || ''}
        url={configs.url}
        sameAs={configs.social.map(({ url }) => url)}
      />

      <div id="next" style={{ display: loading ? 'none' : '' }}>
        {props.children}
      </div>
      <Loader />
    </>
  )
}

export default function MyApp(ctx: AppProps) {
  const { Component, pageProps, err } = ctx

  return (
    <Content>
      <BasicLayout>
        <Component {...pageProps} err={err} />
      </BasicLayout>
    </Content>
  )
}

function printToConsole() {
  try {
    const text = `
    This Blog Powered By Mix Space.
    --------
    Stay hungry. Stay foolish. --Steve Jobs
    `
    document.documentElement.prepend(document.createComment(text))

    // eslint-disable-next-line no-empty
  } catch {
  } finally {
    console.log(
      '%c Kico Style %c https://paugram.com ',
      'color: #fff; margin: 1em 0; padding: 5px 0; background: #3498db;',
      'margin: 1em 0; padding: 5px 0; background: #efefef;',
    )
    console.log(
      `%c Candy ${Package.version} %c https://innei.ren `,
      'color: #fff; margin: 1em 0; padding: 5px 0; background: #2980b9;',
      'margin: 1em 0; padding: 5px 0; background: #efefef;',
    )
  }
}
