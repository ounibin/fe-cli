import ora from 'ora'
import shell from 'shelljs'
import fs from 'fs'
import inquirer from 'inquirer'

async function init(targetDir) {
  const templateMap = {
    'h5-vue3': 'https://github.com/ounibin/template-vue3'
  }

  const quesion = [
    {
      type: 'list',
      name: 'templateName',
      message: '选择模板',
      choices: Object.keys(templateMap),
    },
  ]

  const answer = await inquirer.prompt(quesion)
  const { templateName } = answer

  const gitUrl = templateMap[templateName]

  if (!targetDir) {
    shell.echo(`Please input project name.`)
    shell.exit(1)
  }
  // 是否有重名文件夹
  if (fs.existsSync(targetDir)) {
    shell.echo(`${targetDir} is exist.`)
    shell.exit(1)
  }
  // 是否有安装git
  if (!shell.which('git')) {
    shell.echo('Please install git.')
    shell.exit(1)
  }
  // 下载仓库
  const spinner = ora('Download...\n').start()
  shell.exec(`git clone ${gitUrl} ${targetDir}`)
  // shell.exec(`sed -i '' -e "s/xxx/${env}/g" ./xxx/package.json`)
  spinner.stop()
}

export default init
