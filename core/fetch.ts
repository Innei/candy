/*
 * @Author: Innei
 * @Date: 2020-09-05 09:33:40
 * @LastEditTime: 2020-09-05 16:41:48
 * @LastEditors: Innei
 * @FilePath: /candy/core/fetch.ts
 * @Coding with Love
 */
import dayjs from 'dayjs'
import * as fs from 'fs'
import * as path from 'path'
import { resolve } from 'path'
import Collection from '../utils/collection'
import { isValidDate, UUID } from '../utils/utils'
import { readMarkdownFile } from './utils'

const curDir = process.cwd()

const rootDir = path.resolve(curDir, './_posts')

class Fetcher {
  public articles = new Collection<string, PostStructure>()
  public notes = new Collection<string, NoteStructure>()

  public pages = new Collection<string, PageStructure>()
  constructor() {
    if (typeof window !== 'undefined') {
      throw new Error('must in Node.JS runtime environment')
    }
    this.init()
  }

  private init() {
    const posts = this.getAllPosts()
    this.articles.clear()
    for (const post of posts) {
      this.articles.uniqueSet(post.slug, post)
    }

    const notes = this.getAllNotes()
    this.notes.clear()
    for (const note of notes) {
      this.notes.set(note.nid.toString(), note)
    }

    const pages = this.getAllPages()
    this.pages.clear()
    for (const page of pages) {
      this.pages.uniqueSet(page.slug.toString(), page)
    }
  }

  resolvePostDir(type: 'articles' | 'notes' | 'pages') {
    return resolve(rootDir, type)
  }

  getAllFilesInDir(dir: string) {
    return fs.readdirSync(dir).map((d) => path.resolve(dir, d))
  }

  private getAllPosts() {
    const dir = this.resolvePostDir('articles')

    const files = this.getAllFilesInDir(dir)
    const all: {
      title: any
      slug: any
      created: string
      modified: string
      content: any
    }[] = []

    for (const p of files) {
      try {
        const {
          content,
          created,
          metadata,
          modified,
          stat,
          title,
        } = readMarkdownFile(p)
        all.push({
          title,
          slug:
            metadata.slug ||
            dayjs(stat.ctime).format('YYYY-MM-DD') ||
            new UUID().uuid,
          created: isValidDate(created) || stat.ctime.toISOString(),
          modified: isValidDate(modified) || stat.mtime.toISOString(),
          content,
        })
      } catch {
        continue
      }
    }

    return all.sort(
      (b, a) => new Date(a.created).getTime() - new Date(b.created).getTime(),
    )
  }

  getPostBySlug(slug: string) {
    return this.articles.get(slug)
  }

  getPostsByPager({ page = 1, size = 10 } = {}): PagerResult {
    size = size || this.articles.size
    page = page || 1
    const totalPage = Math.ceil(this.articles.size / size)
    const skip = (page - 1) * size
    const posts = this.articles.slice(skip, skip + size)

    return {
      posts,
      query: {
        currentPage: page,
        hasNext: page + 1 <= totalPage,
        hasPrev: page - 1 > 0,
        size: size,
        totalPage,
      },
    }
  }

  getAllNotes() {
    const dir = this.resolvePostDir('notes')

    const paths = this.getAllFilesInDir(dir)
    const all: NoteStructure[] = []
    let i = 1
    for (const path of paths) {
      try {
        const {
          content,
          created,
          metadata,
          modified,
          stat,
          title,
        } = readMarkdownFile(path)
        all.push({
          title,
          nid: i++,
          created: isValidDate(created) || stat.ctime.toISOString(),
          modified: isValidDate(modified) || stat.mtime.toISOString(),
          content,
          mood: metadata.mood || '',
          weather: metadata.weather || '',
          hasNext: false,
          hasPrev: false,
        })
      } catch {
        continue
      }
    }

    return all
      .sort((a, b) => {
        return new Date(a.created).getTime() - new Date(b.created).getTime()
      })
      .map((i, index) => {
        return {
          ...i,
          nid: index,
          hasNext: index < all.length - 1,
          hasPrev: index > 1,
        }
      })
  }

  getAllPages() {
    const dir = this.resolvePostDir('pages')

    const paths = this.getAllFilesInDir(dir)
    const all: PageStructure[] = []

    for (const path of paths) {
      try {
        const {
          content,
          created,
          metadata,
          modified,
          stat,
          title,
        } = readMarkdownFile(path)
        all.push({
          title,
          subtitle: metadata.subtitle || '',
          slug: metadata.slug || title,
          created: isValidDate(created) || stat.ctime.toISOString(),
          modified: isValidDate(modified) || stat.mtime.toISOString(),
          content,
          order: metadata.order,
        })
      } catch {
        continue
      }
    }
    // asc
    return all
      .sort((a, b) => a.order - b.order)
      .map((n, i) => ({
        ...n,
        order: i,
      }))
  }
}

export default new Fetcher()

type BaseStructure = {
  title: string
  created: string
  modified: string
  content: string
}
export type PostStructure = {
  slug: string
} & BaseStructure

export type PagerResult = {
  query: {
    size: number
    totalPage: number
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
  }
  posts: PostStructure[]
}

export type NoteStructure = {
  mood: string
  weather: string
  nid: number
  hasNext: boolean
  hasPrev: boolean
} & BaseStructure

export type PageStructure = {
  subtitle: string
  order: number
  slug: string
} & BaseStructure
