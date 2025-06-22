// @ts-ignore
import FtpDeploy from 'ftp-deploy'
const ftpDeploy = new FtpDeploy()
import env from 'dotenv'

const config = {
  user: env.config().parsed.FTP_USER,
  password: env.config().parsed.FTP_PASSWORD,
  host: env.config().parsed.FTP_HOST,
  port: 21,
  localRoot: './dist',
  remoteRoot: '/',
  include: ['*', '**/*', '.*'],
  exclude: ['dist/**/*.map', 'node_modules/**', 'node_modules/**/.*', '.git/**'],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
}

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err))
