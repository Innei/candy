/*
 * @Author: Innei
 * @Date: 2020-09-05 12:56:33
 * @LastEditTime: 2020-09-05 13:31:01
 * @LastEditors: Innei
 * @FilePath: /candy/core/utils.ts
 * @Coding with Love
 */
import * as fs from 'fs'
// @ts-ignore
import * as parser from 'markdown-yaml-metadata-parser'
import { basename } from 'path'
export const readMarkdownFile = (path: string) => {
  const stat = fs.statSync(path)
  if (!/\.md$/.test(path) || stat.isDirectory()) {
    throw new ReferenceError('ext must be .md')
  }

  const filenameWithoutExt = basename(path)
    .replace(/\.md$/, '')
    .replace(' ', '-')

  const raw = fs.readFileSync(path, { encoding: 'utf-8' })
  // stat.
  const { metadata = {}, content } = parser(raw)
  const created = new Date(metadata.created || metadata.date)
  const modified = new Date(metadata.modified || metadata.updated)

  return {
    stat,
    raw,
    created,
    modified,
    content,
    text: content,
    metadata,
    title: metadata.title || filenameWithoutExt,
  }
}
