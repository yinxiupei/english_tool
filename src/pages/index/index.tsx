import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Textarea } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      translate: {
        text: ''
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeTab = e => {
    console.log(e)
  }

  render () {
    return (
      <View className='main-container'>
        <View className='tabbar'>
          <View onClick={this.changeTab} className='bar-item active'>查词</View>
          <View onClick={this.changeTab} className='bar-item'>翻译</View>
        </View>
        <View className='content'>
          <View className='search'>
            <View className=''>
              <Input type='text' placeholder='请输入需要查询的单词' placeholderStyle='color: #666'/>
              <Button>查询</Button>
            </View>
          </View>
          <View className='translate'>
            <Textarea value={this.translate.text} autoHeight placeholder='' />
          </View>
        </View>
        <View className='footer'>
          <View className='desc'>每日一句</View>
          <View className='sentence'>this is a good day</View>
        </View>
      </View>
    )
  }
}

