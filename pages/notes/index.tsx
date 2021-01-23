/*
 * @Author: Innei
 * @Date: 2021-01-23 20:02:56
 * @LastEditTime: 2021-01-23 20:34:17
 * @LastEditors: Innei
 * @FilePath: /candy/pages/notes/index.tsx
 * @Mark: Coding with Love
 */

import { Core } from 'core'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NoteIndex: NextPage<{ latestNid: number }> = ({ latestNid }) => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/notes/[id]', `/notes/${latestNid}`, {
      shallow: true,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <main></main>
}
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { latestNid: Core.fetcher.notes.tail.nid },
  }
}
export default NoteIndex
