import { PostBlock } from 'components/PostBlock'
import { Core } from 'core'
import { PagerResult } from 'core/fetch'
import { ArticleLayout } from 'layouts/ArticleLayout'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { observer } from 'utils/mobx'
import { SEO } from '../../components/SEO'

const Post: NextPage<PagerResult> = observer((props) => {
  const { query: page, posts } = props

  const router = useRouter()

  const {
    query: { page: currentPage },
  } = router

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <ArticleLayout>
      <SEO title={'博文'} />

      <article className="paul-note">
        {posts.map((post) => {
          const { slug, content, created, title } = post

          return (
            <PostBlock
              title={title}
              date={created}
              key={slug}
              text={content}
              slug={slug}
              // category={}
            />
          )
        })}
      </article>

      {
        <section className="paul-more">
          {page.hasPrev && (
            <button
              className="btn brown"
              onClick={() => {
                router.push('/posts?page=' + (page.currentPage - 1))
              }}
            >
              上一页
            </button>
          )}
          {page.hasNext && (
            <button
              className="btn brown"
              style={
                page.hasNext && page.hasPrev ? { marginLeft: '6px' } : undefined
              }
              onClick={() => {
                router.push('/posts?page=' + (page.currentPage + 1))
              }}
            >
              下一页
            </button>
          )}
        </section>
      }
    </ArticleLayout>
  )
})

export const getStaticProps: GetStaticProps<PagerResult> = async (context) => {
  const pager = Core.fetcher.getPostsByPager()
  return {
    props: pager,
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = Core.fetcher.articles.getKeys().map((k) => {
//     return {
//       params: {
//         slug: k,
//       },
//     }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }
export default Post
