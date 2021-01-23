import { QueueAnim } from 'components/Anime'
import { SEO } from 'components/SEO'
import { Core } from 'core'
import { ArticleLayout } from 'layouts/ArticleLayout'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import styles from './index.module.scss'

type BaseType = {
  _id: string
  title: string
  created: string
}
interface TimeLineViewProps {
  posts: ({
    slug: string
    summary: string
  } & BaseType)[]
  notes: ({
    nid: number
    weather?: string
    mood?: string
  } & BaseType)[]
}
enum ArticleType {
  Post,
  Note,
}
type mapType = {
  title: string
  meta: string[]
  date: Date
  href: string
  as: string
  type: ArticleType
  id: string
}
const TimeLineView: NextPage<TimeLineViewProps> = (props) => {
  const sortedMap = new Map<number, mapType[]>()

  const { posts = [], notes = [] } = props

  const getDelayTime = (year: number): number => {
    const prevYear = year + 1
    const itemsLength = sortedMap.get(prevYear)?.length

    if (itemsLength) {
      return itemsLength * 100 + getDelayTime(prevYear)
    } else {
      return 0
    }
  }

  posts /* .reverse() */
    .forEach((post) => {
      const date = new Date(post.created)
      const year = date.getFullYear()
      const data: mapType = {
        title: post.title,
        meta: ['博文'],
        date: date,
        as: `/posts/${post.slug}`,
        href: `/posts/[slug]`,
        type: ArticleType.Post,
        id: post._id,
      }
      sortedMap.set(
        year,
        sortedMap.get(year) ? sortedMap.get(year)!.concat(data) : [data],
      )
    })

  notes /* .reverse() */
    .forEach((note) => {
      const date = new Date(note.created)
      const year = date.getFullYear()
      const data: mapType = {
        title: note.title,
        meta: ['这天的心情: ' + (note.mood || '一般'), '随记'].filter(
          (_) => _,
        ) as string[],
        date,
        as: `/notes/${note.nid}`,
        href: '/notes/[id]',
        type: ArticleType.Note,
        id: note._id,
      }

      sortedMap.set(
        year,
        sortedMap.get(year) ? sortedMap.get(year)!.concat(data) : [data],
      )
    })

  sortedMap.forEach((val, key) => {
    sortedMap.set(
      key,
      val.sort((a, b) => b.date.getTime() - a.date.getTime()),
    )
  })

  return (
    <ArticleLayout
      title={'时间线'}
      subtitle={`共有${posts.length + notes.length}篇文章, 再接再厉`}
    >
      <SEO title={'时间线'} />
      {Array.from(sortedMap).map(([year, value], j) => {
        return (
          <article className="post-content kami-note article-list" key={year}>
            <div className="note-item">
              <QueueAnim delay={getDelayTime(year)} type={'bottom'}>
                <h1 key={1}>{year}</h1>
              </QueueAnim>
              <ul className={styles['timeline-wrap']}>
                {value.map((item, i) => {
                  return (
                    <QueueAnim
                      type={'bottom'}
                      key={item.id}
                      delay={getDelayTime(year) + i * 100}
                    >
                      <li key={i * j}>
                        <Link href={item.href} as={item.as}>
                          <a>
                            <span className={'date'}>
                              {(item.date.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}
                              /{item.date.getDate().toString().padStart(2, '0')}
                            </span>
                            <span className={'title'}>{item.title}</span>
                          </a>
                        </Link>

                        <span className={'meta'}>
                          {item.meta.map((m, i) => (i === 0 ? m : '/' + m))}
                        </span>
                      </li>
                    </QueueAnim>
                  )
                })}
              </ul>
            </div>
          </article>
        )
      })}
    </ArticleLayout>
  )
}

export const getStaticProps: GetStaticProps<TimeLineViewProps> = async () => {
  const { articles, notes } = Core.fetcher
  const props: TimeLineViewProps = {
    notes: notes.map((n, i) => ({
      _id: i,
      created: n.created,
      nid: n.nid,
      title: n.title,
      mood: n.mood || '',
      weather: n.weather || '',
    })),
    posts: articles.map((n, i) => ({
      _id: i,
      created: n.created,
      slug: n.slug,
      summary: '',
      title: n.title,
    })),
  }
  return { props }
}
export default TimeLineView
