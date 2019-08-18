import Taro, { Config, Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '每日一句'
  }
  render () {
    return (
      <View>every day</View>
    )
  }
}