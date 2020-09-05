/*
 * @Author: Innei
 * @Date: 2020-06-11 12:25:50
 * @LastEditTime: 2020-09-05 11:11:33
 * @LastEditors: Innei
 * @FilePath: /candy/components/MD-render/rules/index.ts
 * @Coding with Love
 */

import { mentions } from './mentions'
import { spoiler } from './spoiler'

export const plugins = { mentions, spoiler }

export default Object.values(plugins)
