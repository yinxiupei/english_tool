import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image, OpenData } from '@tarojs/components';
import BG_IMG from '../../assets/images/self-bg.jpg';
import './Index.scss';

interface PageState {
  readonly bgImg: any;
}

export default class Index extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  constructor (props) {
    super(props)
    this.state = {
      bgImg: BG_IMG
    }
  }

  render () {
    const { bgImg } = this.state
    return (
      <View className='main-container'>
        <View className='head'>
          <View className='user-info'>
            <View className='avatar'>
              <OpenData type='userAvatarUrl'/>
            </View>
            <OpenData className='name' type='userNickName'/>
          </View>
          <Image src={bgImg} ></Image>
        </View>
        <View className='content'>
          <View className='list'>
            <View className='item'>最近查询记录</View>
            <View className='item'>关于小程序</View>
            <View className='item'>问题反馈</View>
          </View>
        </View>
      </View>
    )
  }
}
