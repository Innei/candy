import { faBookOpen, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from 'common/store'
import SectionNews from 'components/SectionNews'
import { SectionNewsProps } from 'components/SectionNews/section'
import configs from 'configs'
import { Core } from 'core'
import { GetStaticProps, NextPage } from 'next'
import QueueAnim from 'rc-queue-anim'
import Texty from 'rc-texty'
import React from 'react'
import { getAnimationImages } from 'utils'

const IndexView: NextPage<{
  section: Record<'postSection' | 'noteSection', SectionNewsProps>
}> = (props) => {
  const { socialStore } = useStore()
  const { socialLinks } = socialStore
  const name = configs.author
  return (
    <main>
      <section className="kami-intro">
        <div className="intro-avatar ">
          <img src={configs.avatar} alt={name} style={{ width: '100%' }} />
        </div>
        <div className="intro-info">
          <h1>
            <Texty type={'mask-bottom'} mode={'smooth'}>
              {name}
            </Texty>
          </h1>
          <p>
            <Texty type={'mask-bottom'} mode={'smooth'} delay={500}>
              {configs.description}
            </Texty>
          </p>

          <QueueAnim
            delay={500}
            duration={500}
            animConfig={{ opacity: [1, 0], translateY: [0, 50] }}
          >
            <div className="social-icons" key={'a'}>
              {socialLinks.map((item) => {
                return (
                  <a
                    href={item.url}
                    target="_blank"
                    ks-text={item.title}
                    ks-tag="bottom"
                    key={item.title}
                    style={item.color ? { color: item.color } : {}}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                )
              })}
            </div>
          </QueueAnim>
        </div>
      </section>

      <section className="kami-news" style={{ minHeight: '34rem' }}>
        <QueueAnim
          className="demo-content"
          delay={1200}
          duration={500}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] },
          ]}
        >
          {[
            // @ts-ignore
            <SectionNews {...props.section?.postSection} key={1} />,
            // @ts-ignore
            <SectionNews {...props.section?.noteSection} key={2} />,
          ]}
        </QueueAnim>
      </section>
    </main>
  )
}

declare enum ContentType {
  Note,
  Post,
  Say,
}

function buildRoute<T>(
  type: keyof typeof ContentType,
  obj: T,
): { as: string; href: string } {
  switch (type) {
    case 'Post': {
      const { slug } = obj as any
      return {
        as: `/posts/${slug}`,
        href: `/posts/[slug]`,
      }
    }
    case 'Note': {
      // @ts-ignore
      const { nid } = obj
      return {
        as: `/notes/${nid}`,
        href: `/notes/[id]`,
      }
    }
    case 'Say': {
      return { as: `/says`, href: `/says` }
    }
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const images = getAnimationImages()

  const posts = [...Core.fetcher.articles.values()].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  )
  const notes = [...Core.fetcher.notes.values()].sort((a, b) => b.nid - a.nid)
  const section: Record<'postSection' | 'noteSection', SectionNewsProps> = {
    postSection: {
      title: '最新博文',
      icon: faBookOpen,
      moreUrl: 'posts',
      content: posts.slice(0, 4).map((p) => {
        return {
          title: p.title,
          background: images.pop(),
          _id: p.slug,
          ...buildRoute('Post', p),
        }
      }),
    } as SectionNewsProps,
    noteSection: {
      title: '随便写写',
      icon: faPencilAlt,
      moreUrl: 'notes',
      content: notes.slice(0, 4).map((n) => {
        return {
          title: n.title,
          background: images.pop(),
          _id: n.nid,
          ...buildRoute('Note', n),
        }
      }),
    } as SectionNewsProps,
  }

  return {
    props: { section },
  }
}
export default IndexView
