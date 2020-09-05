import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackTop } from 'antd'
import classNames from 'classnames'
import { useStore } from 'common/store'
import { QueueAnim } from 'components/Anime'
import { FC } from 'react'
import { observer } from 'utils/mobx'

export const FooterActions: FC = observer(() => {
  const { appStore, actionStore } = useStore()
  const { isOverflow } = appStore

  return (
    <>
      <style jsx>
        {`
          .message-btn {
            position: relative;
          }
          .message-btn.count::before {
            content: attr(data-count);
            position: absolute;
            right: 0;
            top: 0;
            height: 1rem;
            width: 1rem;
            background: var(--red);
            border-radius: 50%;
            font-size: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            animation: fade-small-large 0.5s both;
          }
        `}
      </style>
      <div className="action">
        <BackTop>
          <button className={classNames('top', isOverflow ? 'active' : '')}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </BackTop>
        <QueueAnim type="scale" leaveReverse ease="easeInQuart" forcedReplay>
          {actionStore.actions.map((action, i) => {
            return (
              <button key={i} onClick={action.onClick}>
                {action.icon}
              </button>
            )
          })}
        </QueueAnim>
      </div>
    </>
  )
})
