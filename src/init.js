import ora from 'ora'
import shell from 'shelljs'
import fs from 'fs'
import inquirer from 'inquirer'

async function init(targetDir) {
  const quesion = [{
    type: 'list',
    name: 'templateName',
    message: '选择模板',
    choices: [
      'vue3',
      'nuxt3'
    ]
  }]

  const answer = await inquirer.prompt(quesion)
  const { templateName } = answer

  const templateMap = {
    'vue3': 'https://git.nykjsrv.cn/front-end/template-vue3',
    'nuxt3': 'https://git.nykjsrv.cn/front-end/template-nuxt3'
  }


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
// init()
export default init