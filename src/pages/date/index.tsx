import Taro, { Config, Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

interface pageState {
  dailyData: any;
  error: boolean;
}
export default class Index extends Component<{}, pageState > {
  config: Config = {
    navigationBarTitleText: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      dailyData: {},
      error: false
    }
  }

  componentDidMount () {
    this.getDailyInfo()
  }

  getDailyInfo = () => {
    Taro.request({
      url: 'http://open.iciba.com/dsapi',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'GET'
    }).then(res => {
      if (res.statusCode === 200) {
        this.setState({
          dailyData: res.data
        })
      } else {
        this.setState({
          error: true
        })
      }
    })
  }

  render () {
    const { dailyData } = this.state
    return (
      <View className='container'>
        <View className='at-article'>
          <View className='at-article__h1'>
            每日一句
          </View>
          <View className='at-article__info'>
            日期：{ dailyData.dateline }
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__h3'>{ dailyData.content }</View>
              <View className='at-article__p'>
                { dailyData.note }
              </View>
              <Image 
                className='at-article__img' 
                src={dailyData.picture2} />
              <View className='at-article__p'>
                { dailyData.translation && dailyData.translation.replace('小编的话：', '鸡汤贴：') }
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}