import { faSmile, faSun } from '@fortawesome/free-regular-svg-icons'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'common/store'
import Action, { ActionProps } from 'components/Action'
import Markdown from 'components/MD-render'
import configs from 'configs'
import { Core } from 'core'
import { NoteStructure } from 'core/fetch'
import { NoteLayout } from 'layouts/NoteLayout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { observer } from 'utils/mobx'
import { parseDate, relativeTimeFromNow } from 'utils/time'
import { Seo } from '../../components/SEO'
import { getSummaryFromMd } from '../../utils'
import { Error } from 'components/Error'
const renderLines: FC<{ value: string }> = ({ value }) => {
  return <span className="indent">{value}</span>
}

const NoteView: NextPage<NoteStructure> = observer((props) => {
  const {
    content: text,
    created,
    modified,
    nid,
    title,
    mood,
    weather,
    hasNext,
    hasPrev,
  } = props

  const { appStore } = useStore()

  const router = useRouter()

  if (!router.isFallback && !props.nid) {
    return <Error statusCode={404} />
  }

  const [tips, setTips] = useState(``)

  const { description, wordCount } = getSummaryFromMd(text, { count: true })
  useEffect(() => {
    try {
      setTips(
        `创建于 ${parseDate(created, 'YYYY-MM-DD dddd')}, 修改于 ${parseDate(
          modified,
          'YYYY-MM-DD dddd',
        )}, 全文字数: ${wordCount}`,
      )
      // eslint-disable-next-line no-empty
    } catch {}
  }, [text, wordCount, created, modified])
  useEffect(() => {
    if (document.documentElement.scrollTop > 50) {
      document.documentElement.scrollTop = 50
    }
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 10)
  }, [props])

  const actions: ActionProps = {
    informs: [],
  }
  {
    if (weather) {
      actions.informs!.push({
        name: weather,
        icon: faSun,
      })
    }
    if (mood) {
      actions.informs!.push({
        name: mood,
        icon: faSmile,
      })
    }

    actions.informs!.push(
      {
        name: configs.author,
        icon: faUser,
      },
      {
        name: relativeTimeFromNow(created),
        icon: faClock,
      },
    )
  }

  useEffect(() => {
    appStore.headerNav = {
      title,
      meta: '日记',
      show: true,
    }
    return () => {
      appStore.headerNav.show = false
    }
  }, [appStore, title])

  return (
    <>
      <Seo
        {...{
          title: title,
          description,

          openGraph: {
            title,
            type: 'article',
            description,
            article: {
              publishedTime: created,
              modifiedTime: modified,
              tags: ['Note of Life'],
            },
          },
        }}
      />

      <NoteLayout title={title} date={new Date(created)} tips={tips}>
        <Markdown
          value={text}
          escapeHtml={false}
          renderers={{ text: renderLines }}
        />

        <Action {...actions} />

        {(!!hasNext || !!hasPrev) && (
          <section className="paul-more">
            {!!hasNext && (
              <button
                className="btn green"
                onClick={() => {
                  router.push('/notes/[id]', `/notes/${nid + 1}`)
                }}
              >
                后一篇
              </button>
            )}
            {
              <button
                className="btn yellow"
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  })
                  router.push('/timeline?type=note')
                }}
              >
                时间线
              </button>
            }
            {!!hasPrev && (
              <button
                className="btn green"
                onClick={() => {
                  router.push('/notes/[id]', `/notes/${nid - 1}`)
                }}
              >
                前一篇
              </button>
            )}
          </section>
        )}
      </NoteLayout>
    </>
  )
})

export const getStaticProps: GetStaticProps<NoteStructure | {}> = async (
  context,
) => {
  const { params } = context
  const { id } = params as any
  const note = Core.fetcher.notes.get(id)
  return {
    props: note || {},
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Core.fetcher.notes.getKeys().map((k) => {
    return {
      params: {
        id: k,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export default NoteView
