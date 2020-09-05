import { useRouter } from 'next/router'
import { FC } from 'react'

const errorToText = (statusCode: number) => {
  switch (statusCode) {
    case 404:
      return '抱歉啦, 页面走丢了'
    case 403:
      return '不要做一些不允许的事情啦'
    case 401:
      return '这是主人的小秘密哦, 你是我的主人吗'
    case 500:
    default:
      return '抱歉, 出了点小问题'
  }
}

export const Error: FC<{ statusCode: number }> = ({ statusCode }) => {
  const router = useRouter()
  return (
    <div className="error">
      <div className="error_wrap">
        <h1>{statusCode}</h1>
        <div className="desc">
          <h2>{errorToText(statusCode)}</h2>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          className={'btn red'}
          style={{ marginRight: '12px' }}
          onClick={() => router.push('/')}
        >
          回到首页
        </button>
        <button className={'btn yellow'} onClick={() => router.reload()}>
          刷新
        </button>
      </div>
    </div>
  )
}
