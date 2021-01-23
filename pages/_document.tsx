/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: Innei
 * @Date: 2020-04-29 17:27:02
 * @LastEditTime: 2021-01-23 20:41:32
 * @LastEditors: Innei
 * @FilePath: /candy/pages/_document.tsx
 * @MIT
 */

import configs from 'configs'
import { Core } from 'core'
import { resolve } from 'path'
import { mkdirSync, writeFileSync } from 'fs'
import Document, { Head, Main, NextScript } from 'next/document'

const writeJson = (filename: string, data: string) => {
  mkdirSync(resolve(process.cwd(), './public/data/'), { recursive: true })
  writeFileSync(
    resolve(process.cwd(), './public/data/' + filename + '.json'),
    data,
    {
      encoding: 'utf-8',
    },
  )
}
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    try {
      const pages = Core.fetcher.pages.toJSON()
      const notes = Core.fetcher.notes.toJSON()
      const posts = Core.fetcher.articles.toJSON()
      const total = {
        pages,
        notes,
        posts,
      }
      for (const [k, v] of Object.entries(total)) {
        writeJson(k, v)
      }
      writeJson('raw', JSON.stringify(total))
      return { ...initialProps }
    } catch {
      throw new Error('parsing error, please check _post folder.')
    }
  }
  render() {
    return (
      <html>
        <Head lang={'zh-cn'}>
          <meta charSet="UTF-8" />
          {/* <link rel="manifest" href="/manifest.json" /> */}

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content={configs.title} />
          <meta name="apple-mobile-web-app-title" content={configs.title} />
          <meta name="msapplication-tooltip" content={configs.title} />
          <meta name="theme-color" content="#ffc107" />
          <meta name="msapplication-navbutton-color" content="#ffc107" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <meta name="msapplication-starturl" content="/" />

          <link
            href="https://fonts.googleapis.com/css?family=Noto+Serif+SC"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://cdn.jsdelivr.net/gh/Innei/zshrc@0.1.1/webfont/OperatorMono.css"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          {/* <link rel="sitemap" href="/sitemap.xml" /> */}
        </Head>

        <body id={'app'} className="loading">
          <Main />
          <NextScript />

          <script
            src={`https://cdn.jsdelivr.net/npm/smooth-scroll@16.1.3/dist/smooth-scroll.min.js`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `new SmoothScroll('a[href*="#"]', {
                            speed: 500,
                            offset: 150,
                            easing: 'easeInOutCubic',
                            durationMax: 1000,
                            durationMin: 350,
                            topOnEmptyHash: true,
                            emitEvents: false,
                            updateURL: false,
                            popstate: false
                          })`,
            }}
          ></script>
        </body>
      </html>
    )
  }
}
