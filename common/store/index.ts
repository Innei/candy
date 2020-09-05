/*
 * @Author: Innei
 * @Date: 2020-04-29 17:27:02
 * @LastEditTime: 2020-09-05 11:20:09
 * @LastEditors: Innei
 * @FilePath: /candy/common/store/index.ts
 * @Copyright
 */

import { createContext, useContext } from 'react'
import ActionStore from './action'
import AppStore from './app'

import PageStore from './pages'
import SocialStore from './social'
import { Stores } from './types'

export const appStore = new AppStore()
export default function createMobxStores(): Stores {
  return {
    appStore,

    socialStore: new SocialStore(),

    pageStore: new PageStore(),

    actionStore: new ActionStore(),
  }
}

export const StoreContext = createContext<Stores>(createMobxStores())
export const StoreProvider = StoreContext.Provider
export const useStore = (): Stores => useContext(StoreContext)
