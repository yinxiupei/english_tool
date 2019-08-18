import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  render () {
    // const content = (
    //   <view className=''></view>
    // )
    return (
      <View className='main-container'>
        <View className='head'>
          <View className='avatar'></View>
        </View>
        <View className=''></View>
      </View>
    )
  }
}