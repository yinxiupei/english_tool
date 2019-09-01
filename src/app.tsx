import Taro, { Component, Config } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss'

interface requestParams {
  url?: string;
  wholeUrl?: string
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
// const themeColor = '#C20C0C'
// const mainColor = '#a40011'
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/date/index',
      'pages/self/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#242424',
      selectedColor: '#C20C0C',
      list: [{
        pagePath: 'pages/index/index',
        text: '翻译',
        iconPath: './assets/images/icons/home_off.png',
        selectedIconPath: './assets/images/icons/home_on.png'
      }, {
        pagePath: 'pages/date/index',
        text: '每日一句',
        iconPath: './assets/images/icons/date_off.png',
        selectedIconPath: './assets/images/icons/date_on.png'
      }, {
        pagePath: 'pages/self/index',
        text: '我的',
        iconPath: './assets/images/icons/self_off.png',
        selectedIconPath: './assets/images/icons/self_on.png'
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  getRequest = (params: requestParams) => {
    let url = ''
    if (params.wholeUrl) {
      url = params.wholeUrl
    }
    if (params.url) {
      url = params.url
    }
    return new Promise((resolve, reject) => {
      Taro.request({
        url: url,
        header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'GET'
      }).then(response => {
        if (response.statusCode === 200) {
          resolve(response.data)
        } else {
          console.log(response)
          reject(response)
        }
      })
    })
  }

  postRequest = (params) => {

  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
