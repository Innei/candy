/*
 * @Author: Innei
 * @Date: 2020-09-05 09:27:38
 * @LastEditTime: 2020-09-05 16:51:06
 * @LastEditors: Innei
 * @FilePath: /candy/configs.ts
 * @Coding with Love
 */

import { faGithub, faQq, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faBookOpen,
  faDotCircle,
  faFeatherAlt,
  faGlasses,
  faHistory,
} from '@fortawesome/free-solid-svg-icons'
import { MenuModel, SocialLinkModel } from 'common/store/types'

const menu: MenuModel[] = [
  {
    title: '源',
    path: '/',
    type: 'Home',
    icon: faDotCircle,
    subMenu: [],
  },
  {
    title: '文',
    path: '/posts',
    type: 'Post',
    subMenu: [],
    icon: faGlasses,
  },
  {
    title: '记',
    type: 'Note',
    path: '/notes',
    icon: faFeatherAlt,
  },
  {
    title: '览',
    icon: faHistory,
    path: '/timeline',
    subMenu: [
      {
        title: '生活',
        icon: faFeatherAlt,
        path: '/timeline?type=note',
      },
      {
        title: '博文',
        icon: faBookOpen,
        path: '/timeline?type=post',
      },
    ],
  },
  // {
  //   title: '友',
  //   icon: faUserFriends,
  //   path: '/friends',
  // },
]

const social: SocialLinkModel[] = [
  {
    url: 'https://github.com/Innei',
    title: 'GitHub',
    icon: faGithub,
    color: 'var(--black)',
  },
  {
    url: 'https://jq.qq.com/?_wv=1027&k=5t9N0mw',
    title: 'QQ',
    icon: faQq,
    color: '#12b7f5',
  },
  {
    url: 'https://twitter.com/_oQuery',
    title: 'twitter',
    icon: faTwitter,
    color: '#02A4ED',
  },
]
export const configs = {
  title: '静之森',
  description: '一个测试站点',
  keywords: ['blog'],
  menu,
  url: 'https://innei.ren',
  author: 'Innei',
  social,
  icp: {
    name: ' ',
    url: 'http://www.beian.miit.gov.cn/',
  },
  travellings: true, // 开往
  donate: 'https://afdian.net/@Innei',
  avatar:
    'https://avatars0.githubusercontent.com/u/41265413?s=460&u=8c14b9682794c353995029327f439d736571426e&v=4',
}

export default configs
