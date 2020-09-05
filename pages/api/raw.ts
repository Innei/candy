/*
 * @Author: Innei
 * @Date: 2020-09-05 16:33:36
 * @LastEditTime: 2020-09-05 16:46:46
 * @LastEditors: Innei
 * @FilePath: /candy/pages/api/raw.ts
 * @Coding with Love
 */
import { Core } from 'core'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function raw(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { type },
  } = req
  const pages = Core.fetcher.pages.toObject()
  const notes = Core.fetcher.notes.toObject()
  const posts = Core.fetcher.articles.toObject()
  const total = {
    pages,
    notes,
    posts,
  }

  if (type && typeof type === 'string') {
    return res.json(total[type + 's'] || {})
  }
  res.json(total)
}
