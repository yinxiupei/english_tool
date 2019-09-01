import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Textarea } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'

import './index.scss'

// type PageState = {
//   active: number;
//   result: string;
//   translate: any;
// }

interface PageState {
  active: number;
  sentense: {
    text: string,
    result: any
  };
  word: {
    text: string,
    result: any
  }
}

export default class Index extends Component<{}, PageState> {

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
      active: 0,
      sentense: {
        text: 'hello',
        result: ''
      },
      word: {
        text: '',
        result: ''
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = index => {
    this.setState({
      active: index,
      word: {
        text: '',
        result: ''
      }
    })
  }

  onInput = (e) => {
    let detail = e.detail
    this.setState({
      word: {
        text: detail.value,
        result: ''
      }
    })
  }

  translateWord = () => {
    const { word } = this.state
    console.log(word)
    if (!word) {
      Taro.showToast({
        title: '请输入需要查询的内容',
        icon: 'none'
      })
      return
    }
    Taro.request({
      url: `http://dict-co.iciba.com/api/dictionary.php?w=${word.text}&key=1F3E23AD0633149F2383ABA2BAFE4548`,
      method: 'GET'
    }).then(res => {
      console.log(res)
    })
  }

  translateSentence = () => {
  }

  render () { 
    const tabList = [{ title: '单词查词' }, { title: '文本翻译'}]
    const { active, sentense, word } = this.state
    return (
      <View className='main-container'>
        <View className='content'>
          <AtTabs current={active} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={active} index={0} >
              <View className='content'>
                <View className='translate'>
                  <Input type='text' value={word.text} onInput={this.onInput} placeholder='请输入需要查询的单词' placeholderStyle='color: #999'/>
                  <AtButton type='primary' size='small' onClick={this.translateWord}>查询</AtButton>
                </View>
                <View className='result'></View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={active} index={1}>
              <View className='content'>
                <View className='translate'>
                  <Textarea value={sentense.text} autoHeight placeholder='' />
                  <Text className='btn' onClick={this.translateSentence}>翻译</Text>
                </View>
                <View className='result'></View>
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        <View className='footer'>
          <View className='desc'>每日一句</View>
          <View className='sentence'>this is a good day</View>
        </View>
      </View>
    )
  }
}

