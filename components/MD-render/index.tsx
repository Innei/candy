import { useStore } from 'common/store'
import { ImageLazyWithPopup } from 'components/Image'
import Toc from 'components/Toc'
import Router from 'next/router'
import React, {
  createElement,
  DOMAttributes,
  ElementType,
  FC,
  useCallback,
  useMemo,
} from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import { observer } from 'utils/mobx'
import CodeBlock from '../CodeBlock'
import styles from './index.module.scss'
import CustomRules from './rules'

interface MdProps extends ReactMarkdownProps {
  value: string
  showTOC?: boolean
  [key: string]: any
  style?: React.CSSProperties
  readonly renderers?: { [nodeType: string]: ElementType }
}

const Heading: () => FC<{
  level: 1 | 2 | 3 | 4 | 5 | 6
  key?: number
}> = () => {
  let index = 0
  return function RenderHeading(props) {
    return createElement<DOMAttributes<HTMLHeadingElement>, HTMLHeadingElement>(
      `h${props.level}`,
      {
        id: index++ + '¡' + (props.children?.[0].props.value as string),
      } as any,
      props.children,
    )
  }
}
const RenderLink: FC<{
  href: string
  key?: string
  children?: JSX.Element | JSX.Element[]
}> = (props) => {
  const ExtendIcon = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
      >
        <path
          fill="var(--shizuku-text-color)"
          d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
        ></path>
        <polygon
          fill="var(--shizuku-text-color)"
          points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
        ></polygon>
      </svg>
    ),
    [],
  )
  const handleRedirect = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const href = props.href
      const locateUrl = new URL(location.href)

      const toUrlParser = new URL(href)

      if (
        toUrlParser.host === locateUrl.host ||
        (process.env.NODE_ENV === 'development' &&
          toUrlParser.host === 'innei.ren')
      ) {
        e.preventDefault()
        const pathArr = toUrlParser.pathname.split('/').filter(Boolean)
        const headPath = pathArr[0]

        switch (headPath) {
          case 'posts': {
            Router.push('/posts/[category]/[slug]', toUrlParser.pathname)
            break
          }
          case 'notes': {
            Router.push('/notes/[id]', toUrlParser.pathname)
            break
          }
          case 'category': {
            Router.push('/category/[slug]', toUrlParser.pathname)
            break
          }
          default: {
            Router.push(toUrlParser.pathname)
          }
        }
      }
    },
    [props.href],
  )
  return (
    <div className={styles['link']}>
      <a href={props.href} target={'_blank'} onClick={handleRedirect}>
        {props.children}
      </a>
      <div className={styles['popup']}>{props.href}</div>
      {ExtendIcon}
    </div>
  )
}

const Image: FC<{ src: string; alt?: string }> = (props) => {
  const { src, alt } = props
  return (
    <ImageLazyWithPopup src={src} alt={alt} style={{ padding: '1rem 0' }} />
  )
}

const RenderSpoiler: FC<{ value: string }> = (props) => {
  return (
    <span className={'spoiler'} title={'你知道的太多了'}>
      {props.value}
    </span>
  )
}

const RenderParagraph: FC<{}> = (props) => {
  return <div className={'paragraph'}>{props.children}</div>
}

const RenderCommentAt: FC<{ value: string }> = ({ value }) => {
  return <>@{value}</>
}

const _TOC = observer(() => {
  const { appStore } = useStore()
  const { isPadOrMobile } = appStore
  return !isPadOrMobile ? <Toc /> : null
})
const Markdown: FC<MdProps> = observer((props) => {
  const { value, renderers, style, ...rest } = props

  return (
    <div id="write" style={style}>
      <ReactMarkdown
        source={value}
        {...rest}
        renderers={{
          code: CodeBlock,
          pre: CodeBlock,
          image: Image,
          heading: Heading(),
          link: RenderLink,
          spoiler: RenderSpoiler,
          paragraph: RenderParagraph,
          // eslint-disable-next-line react/display-name
          commentAt: RenderCommentAt,
          ...renderers,
        }}
        plugins={CustomRules}
      />
      {props.showTOC && <_TOC />}
    </div>
  )
})

export default Markdown
