#! /usr/bin/env node
import { program } from 'commander'
import { readFile } from 'fs/promises'
import command_init from './init.js'
;(async () => {
  const PACKAGE_JSON = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url)),
  )

  // 查看版本
  program.version(PACKAGE_JSON.version, '-v, --version')

  // 命令
  program
    .command('init <app-name>')
    .description('create project')
    .action(command_init)

  // 处理参数入口
  program.parse(process.argv)
})()
