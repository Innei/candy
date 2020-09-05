/*
 * @Author: Innei
 * @Date: 2020-06-25 15:03:16
 * @LastEditTime: 2020-09-05 15:54:24
 * @LastEditors: Innei
 * @FilePath: /candy/common/store/types.ts
 * @Coding with Love
 */
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { UrlObject } from 'url'
import ActionStore from './action'
import AppStore from './app'
import PageStore from './pages'
import SocialStore from './social'

export interface PageModel {
  order: number
  created: string
  modified: string
  title: string
  slug: string
}

export declare enum LayoutType {
  Post,
  Note,
  Page,
  Home,
  Project,
  Music,
  Bangumi,
  Custom,
}

export interface MenuModel {
  title: string
  type?: keyof typeof LayoutType
  path: string
  subMenu?: MenuModel[]
  icon?: IconDefinition
  as?: string | UrlObject
  independent?: boolean
}

export interface SocialLinkModel {
  icon: IconDefinition
  title?: string
  url: string
  color?: string
}

export interface ViewportRecord {
  w: number
  h: number
  mobile: boolean
  pad: boolean
  hpad: boolean
  wider: boolean
  widest: boolean
}

export interface Stores {
  appStore: AppStore

  socialStore: SocialStore
  pageStore: PageStore

  actionStore: ActionStore
}
