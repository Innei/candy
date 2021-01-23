import { useStore } from 'common/store'
import { Error } from 'components/Error'
import Markdown from 'components/MD-render'
import OutdateNotice from 'components/Outdate'
import { Core } from 'core'
import { PostStructure } from 'core/fetch'
import dayjs from 'dayjs'
import { ArticleLayout } from 'layouts/ArticleLayout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { observer } from 'utils/mobx'
import { getSummaryFromMd } from 'utils/utils'
import { Copyright, CopyrightProps } from '../../components/Copyright'
import { Seo } from '../../components/SEO'
import configs from '../../configs'

export const PostView: NextPage<PostStructure> = (props) => {
  const { content, title, slug } = props

  const [copyrightInfo, setCopyright] = useState({} as CopyrightProps)
  const description = getSummaryFromMd(props.content).slice(0, 150)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [props])

  const { appStore } = useStore()

  useEffect(() => {
    appStore.headerNav = {
      title: props.title,
      meta: '文章',
      show: true,
    }
    return () => {
      appStore.headerNav.show = false
    }
  }, [appStore, props.title])

  useEffect(() => {
    setCopyright({
      date: dayjs(props.modified).format('YYYY年MM月DD日 H:mm'),
      title,
      link: new URL(location.pathname, configs.url).toString() + '.html',
    })
  }, [props, title])
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <Error statusCode={404} />
  }
  return (
    <ArticleLayout title={title}>
      <Seo
        title={props.title}
        description={description}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: props.created.toString(),
            modifiedTime: props.modified.toString(),
          },
        }}
      />

      <OutdateNotice time={props.modified} />

      <Markdown value={content} escapeHtml={false} toc />

      <Copyright {...copyrightInfo} />
    </ArticleLayout>
  )
}

export const getStaticProps: GetStaticProps<PostStructure | {}> = async (
  context,
) => {
  const { params } = context
  const { slug } = params as any
  const post = Core.fetcher.getPostBySlug(slug as string)
  return {
    props: post || {},
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Core.fetcher.articles.getKeys().map((k) => {
    return {
      params: {
        slug: k,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export default observer(PostView)
