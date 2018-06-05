export default function getBaseUrl (type) {
  // let [baseUrl, urls, protocol] = ['http://localhost:9094', location.href.toLowerCase(), 'http://']
  // // 判断协议
  // if (location.protocol === 'https:') {
  //   protocol = 'https://'
  // }
  // // 测试环境判断（这里我们都是在本地开发环境）
  // if (urls.match(/xx.xx.xx/) && urls.match(/xxx.xxx.xxx/)[0] === 'xxx.xxx.xxx') {
  //   baseUrl = protocol + 'xx.xxx.xxx'
  // }
  const baseUrl = '/api'
  return baseUrl
}
