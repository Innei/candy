/*
 * @Author: Innei
 * @Date: 2020-08-07 16:56:07
 * @LastEditTime: 2020-09-05 10:56:21
 * @LastEditors: Innei
 * @FilePath: /candy/common/store/action.ts
 * @Coding with Love
 */
import { observable, action, computed } from 'mobx'
import { UUID } from 'utils/utils'
import { FootAction } from './types/actions'

export default class ActionStore {
  @observable private _actions: FootAction[] = []

  @action resetActions() {
    this._actions = []
  }

  /**
   * clear and set actions (replace)
   * @param actions
   */
  @action setActions(actions: FootAction[]) {
    this.resetActions()
    this._actions.push(...actions)
  }

  @action appendActions(actions: FootAction[] | FootAction) {
    if (Array.isArray(actions)) {
      this._actions.push(...actions)
    } else {
      this._actions.push(actions)
    }
  }

  @action removeAction(action: FootAction) {
    const index = this._actions.indexOf(action)
    if (index !== -1) {
      this._actions.splice(index, 1)
    }
  }
  @action removeActionByIndex(index: number) {
    this._actions.splice(index, 1)
  }

  @action removeActionByUUID(id: UUID) {
    const index = this._actions.findIndex((i) => id.equal(i.id))
    this.removeActionByIndex(index)
  }
  @computed get actions() {
    return [...this._actions]
  }
}
