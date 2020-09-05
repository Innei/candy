import { message } from 'antd'
import { Core } from 'core'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NoteIndex: NextPage<{ latestNid: number }> = ({ latestNid }) => {
  const router = useRouter()
  useEffect(() => {
    message.info('正在跳往至最新, 请等待')

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
