import merge from 'lodash/merge'
import { NextSeo, NextSeoProps } from 'next-seo'
import type { OpenGraph } from 'next-seo/lib/types'
import { FC } from 'react'
import { observer } from 'utils/mobx'
import configs from '../../configs'
import { getRandomImage } from '../../utils/utils'
type SEOProps = {
  title: string
  description?: string
  openGraph?: { type?: 'website' | 'article' } & OpenGraph
} & NextSeoProps

export const SEO: FC<SEOProps> = observer((props) => {
  const { title, description, openGraph, ...rest } = props

  const Title = title + ' - ' + configs.title
  return (
    <NextSeo
      {...{
        title,
        titleTemplate: '%s - ' + configs.title,
        openGraph: merge(
          {
            profile: {
              username: configs.author,
            },
            type: 'article',
            locale: 'zh-cn',
            site_name: configs.title,
            description: description || '',
            article: {
              authors: [configs.author],
            },
            title: Title,
            images: [
              {
                url: getRandomImage().pop() as string,
                alt: title + ' - ' + configs.title,
              },
            ],
          } as OpenGraph,
          openGraph,
        ),
        description: description || '',
        twitter: {
          cardType: 'summary',
          site: configs.url,
        },

        ...rest,
      }}
    />
  )
})

export const Seo = SEO
