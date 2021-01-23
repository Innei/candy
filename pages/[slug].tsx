import { useStore } from 'common/store'
import Markdown from 'components/MD-render'
import { Seo } from 'components/SEO'
import { Core } from 'core'
import { PageStructure } from 'core/fetch'
import { ArticleLayout } from 'layouts/ArticleLayout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import RemoveMarkdown from 'remove-markdown'
import { observer } from 'utils/mobx'

const Page: NextPage<PageStructure> = (props) => {
  const { content: text, subtitle, title } = props

  const { appStore } = useStore()

  useEffect(() => {
    appStore.headerNav = {
      title,
      meta: subtitle,
      show: true,
    }
    return () => {
      appStore.headerNav.show = false
    }
  }, [appStore, subtitle, title])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [props])
  return (
    <ArticleLayout title={title} subtitle={subtitle}>
      <Seo
        title={title}
        openGraph={{ type: 'article' }}
        description={RemoveMarkdown(text).slice(0, 100).replace('\n', '')}
      />

      <Markdown value={text} escapeHtml={false} toc />
    </ArticleLayout>
  )
}

export const getStaticProps: GetStaticProps<PageStructure | {}> = async (
  context,
) => {
  const { params } = context
  const { slug } = params as any
  const page = Core.fetcher.pages.get(slug)
  return {
    props: page || {},
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Core.fetcher.pages.getKeys().map((k) => {
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

export default observer(Page)
