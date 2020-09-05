import { faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from 'common/store'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { observer } from 'utils/mobx'
import configs from '../../configs'
import { FooterActions as _FooterActions } from './actions'
const FooterActions = dynamic(
  () => import('components/Footer/actions').then((m) => m.FooterActions) as any,
  { ssr: false },
) as typeof _FooterActions
export const Footer: FC = observer(() => {
  const { appStore } = useStore()
  const thisYear = new Date().getFullYear()

  return (
    <footer>
      <style jsx>{`
        .row {
          padding-bottom: 18px;
        }
      `}</style>
      <div className="wrap">
        <div className="row">
          <div className="col-m-6 left to-center">
            <p>
              © {thisYear !== 2020 && '2020-'}
              {thisYear}{' '}
              <a href={configs.url ?? '#'} target="_blank">
                {configs.author}
              </a>
              .{' '}
              <span title={'Stay hungry. Stay foolish. -- Steve Jobs'}>
                Stay hungry. Stay foolish.
              </span>
            </p>
            <p>
              Powered by <FontAwesomeIcon icon={faReact} />
              <a
                href="https://github.com/mx-space"
                title={
                  process.env.VERSION && '开发版本: ' + process.env.VERSION
                }
              >
                {' mx-space '}
              </a>
              <FontAwesomeIcon icon={faNodeJs} />.{' '}
              {!!configs.icp && !!configs.icp.name && !!configs.icp.url && (
                <a href={configs.icp.url} target={'_blank'} rel={'noreferrer'}>
                  {configs.icp.name}
                </a>
              )}
            </p>
          </div>
          <div className="col-m-6 right to-center">
            <p style={{ marginRight: appStore.viewport.mobile ? '' : '3rem' }}>
              <Link href="/[page]" as="/about">
                <a>关于</a>
              </Link>
              ·
              <Link href="/[page]" as="/message">
                <a>留言</a>
              </Link>
              ·
              <Link href="/friends">
                <a>友链</a>
              </Link>
              ·
              <a href="/feed" target="_blank">
                RSS 订阅
              </a>
              ·
              <a href="/sitemap.xml" target={'_blank'}>
                站点地图
              </a>
              {configs.travellings && (
                <Fragment>
                  ·
                  <a href="https://travellings.now.sh/" target={'_blank'}>
                    开往
                  </a>
                </Fragment>
              )}
            </p>
          </div>
        </div>
      </div>
      <FooterActions />
    </footer>
  )
})
