/*
 * @Author: Innei
 * @Date: 2021-01-07 20:13:09
 * @LastEditTime: 2021-01-23 20:36:38
 * @LastEditors: Innei
 * @FilePath: /candy/layouts/NoteLayout.tsx
 * @Mark: Coding with Love
 */
import dayjs from 'dayjs'
import { FC, forwardRef } from 'react'
import { observer } from 'utils/mobx'
import { QueueAnim } from '../components/Anime'

interface NoteLayoutProps {
  title: string
  tips?: string
  date: Date
}
export const animatingClassName: [string, string] = [
  '',
  'absolute padding-b100 max-w-full',
]

const NoteLayout: FC<NoteLayoutProps> = observer(
  forwardRef(({ children, date, title, tips }, ref: any) => {
    const dateFormat = dayjs(date).locale('cn').format('YYYY年M月D日 dddd')

    return (
      <main className="is-article is-note post-content kami-note" ref={ref}>
        <QueueAnim
          type={['bottom', 'top']}
          delay={500}
          forcedReplay
          // leaveReverse
          animatingClassName={animatingClassName}
        >
          <article key={dateFormat} className={'note-article'}>
            <h1>{dateFormat}</h1>

            <h2 title={tips} style={{ textAlign: 'center' }}>
              {title}
            </h2>

            {children}
          </article>
        </QueueAnim>
      </main>
    )
  }),
)

export { NoteLayout }
