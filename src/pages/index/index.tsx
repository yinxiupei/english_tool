import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Textarea } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtIcon } from 'taro-ui'

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
        text: '',
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
    if (!word) {
      Taro.showToast({
        title: '请输入需要查询的内容',
        icon: 'none'
      })
      return
    }
    Taro.request({
      url: `http://dict-co.iciba.com/api/dictionary.php?w=${word.text}&key=1F3E23AD0633149F2383ABA2BAFE4548&type=json`,
      method: 'GET'
    }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        console.log(res)
      }
    })
  }

  translateSentence = () => {
    const { sentense } = this.state
    Taro.request({
      url: 'http://fy.iciba.com/ajax.php?a=fy',
      data: {
        f: 'auto',
        t: 'auto',
        w: sentense.text
      },
      header: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'POST'
    }).then(response => [
      console.log(response)
    ])
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
                  <AtIcon className='icon' value='close-circle' size='18' color='#bbb'></AtIcon>
                  <Input type='text' value={word.text} onInput={this.onInput} placeholder='请输入需要查询的单词' placeholderStyle='color: #999'/>
                  <AtButton className='btn' type='primary' size='small' onClick={this.translateWord}>查一下</AtButton>
                </View>
                <View className='result'></View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={active} index={1}>
              <View className='content'>
                <View className='translate sentence'>
                  <Textarea value={sentense.text} placeholder='请输入需要查询的句子' />
                  <View className='operation'>
                    <AtButton className='btn' type='primary' size='small' onClick={this.translateSentence}>翻译</AtButton>
                  </View>
                </View>
                { sentense.result && <View className='result'>
                  <View></View>
                </View> }
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

