/*
 * @Author: Innei
 * @Date: 2020-09-05 10:08:58
 * @LastEditTime: 2020-09-05 16:40:36
 * @LastEditors: Innei
 * @FilePath: /candy/utils/collection.ts
 * @Coding with Love
 */
export default class Collection<K extends string, V = unknown> extends Map<
  K,
  V
> {
  toObject() {
    // @ts-ignore
    const obj: Record<K, V> = {}
    for (const [k, v] of this.entries()) {
      obj[k] = v
    }
    return obj
  }
  toJSON() {
    return JSON.stringify(this.toObject())
  }
  get tail() {
    return [...this.values()][this.size - 1]
  }
  slice(start: number, end: number) {
    if (start < 0 || start > end) {
      return []
    }

    const entries = [...this.values()]
    const arr: V[] = []
    for (let index = start; index < Math.min(end, this.size); index++) {
      arr.push(entries[index])
    }
    return arr
  }
  getKeys() {
    return [...this.entries()].map(([k]) => k)
  }

  getValues() {
    return [...this.entries()].map(([, v]) => v)
  }

  map<T = unknown>(cb: (value: V, key: K, index: number) => T) {
    const e = this.entries()
    let index = 0
    const arr: T[] = []
    for (const [k, v] of e) {
      const item = cb.call(this, v, k, index++)
      arr.push(item)
    }

    return arr
  }

  uniqueSet(key: K, value: V) {
    const hasKey = this.has(key)
    if (hasKey) {
      const postfixRegexp = /-(\d+)$/
      const hasPostfix = postfixRegexp.exec(key)
      if (!hasPostfix) {
        return this.set(key.concat('-1') as K, value)
      } else {
        const now = hasPostfix[1]
        const next = now + 1
        return this.set(key.concat('-', next.toString()) as K, value)
      }
    } else {
      return this.set(key, value)
    }
  }
}
