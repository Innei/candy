import defaultAvatar from 'assets/images/default-avatar.png'
import { FC, memo, useEffect, useState } from 'react'

import { Avatar } from '../Avatar'
import styles from './index.module.scss'
export const FriendItem: FC = memo((props) => {
  // return (
  //   <a className={styles['avatar-item']} href={props.url} target={'_blank'}>
  //     <Avatar
  //       {...{
  //         imageUrl: props.avatar || defaultAvatar,
  //         alt: props.name,
  //         url: props.url,
  //       }}
  //     />
  //     <span className={styles['avatar-name']}>{props.name}</span>
  //   </a>
  // )
  return null
})

export const FriendsSection: FC = memo(() => {
  // const [friends, setFriends] = useState<LinkModel[]>([])
  // useEffect(() => {
  //   Rest('Link')
  //     .gets({ page: 1, size: 20 })
  //     .then((res: any) => {
  //       const data = res.data as LinkModel[]
  //       setFriends(
  //         data.filter(
  //           (i) =>
  //             i.type === LinkType.Friend &&
  //             (i.state !== LinkState.Audit || i.hide),
  //         ),
  //       )
  //     })
  // }, [])
  // return (
  //   <div className={styles['friends-wrap']}>
  //     {friends.map((item) => {
  //       return <FriendItem {...item} key={item._id} />
  //     })}
  //   </div>
  // )
  return null
})
