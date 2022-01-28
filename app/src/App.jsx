import React, { useEffect, useState } from 'react'
import { Stack, TextField, Dropdown, Icon, MessageBar, MessageBarType } from '@fluentui/react'

const sourceOptions = [
  { key: 'auto', text: '检测语言' },
  { key: 'en', text: '英语' },
  { key: 'zh', text: '简体中文' },
  { key: 'zh-TW', text: '繁体中文' },
  { key: 'ja', text: '日语' },
  { key: 'ko', text: '韩语' }
]

const options = [
  { key: 'en', text: '英语' },
  { key: 'zh', text: '简体中文' },
  { key: 'zh-TW', text: '繁体中文' },
  { key: 'ja', text: '日语' },
  { key: 'ko', text: '韩语' }
]

const App = () => {
  const [timer, setTimer] = useState(null)
  const [resultText, setResultText] = useState("")
  const [sourceText, setSourceText] = useState("")
  const [server, setServer] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("zh")

  useEffect(() => {
    chrome.storage.local.get({ server: '' }, function (local) {
      setServer(local.server)
    })
  }, [])

  const dropdownStyles = { dropdown: { width: '100%' } }

  const send = (value) => {
    if (value !== '') {
      fetch(`${server}/tmt?text=${value}&source=${sourceLanguage}&target=${targetLanguage}`)
        .then(response => response.json())
        .then(json => {
          setResultText(json.targetText)
        })
    }
  }

  const onSourceTextChange = (_, value) => {
    setSourceText(value)

    if (timer !== null) {
      clearTimeout(timer)
    }
    if (value === '') {
      setResultText('')
    } else {
      setTimer(setTimeout(() => {
        send(value)
      }, 500))
    }
  }

  const onBlur = () => {
    if (timer !== null) {
      clearTimeout(t)
    }
    send(sourceText)
  }

  const onSourceSelectorChange = (_, option) => {
    setSourceLanguage(option.key)
  }

  const onTargetSelectorChange = (_, option) => {
    setTargetLanguage(option.key)
  }

  const errorBar = () => (
    <MessageBar className="server-not-config-error-bar"
      messageBarType={MessageBarType.error}
      isMultiline={false}
    >
      首先右键打开扩展选项进行配置。
    </MessageBar>
  )

  return <>
    <Stack>
      {sourceText !== "" && server === "" && <Stack.Item grow className="error-bar">
        {errorBar()}
      </Stack.Item>}
      <Stack.Item grow>
        <Stack horizontal className="language-selection">
          <Stack.Item grow>
            <Dropdown
              placeholder="Select an option"
              onChange={onSourceSelectorChange}
              styles={dropdownStyles}
              options={sourceOptions}
              defaultSelectedKey={'auto'}
            />
          </Stack.Item>
          <Stack.Item className="switch-icon">
            <Icon iconName="Switch" />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              placeholder="Select an option"
              onChange={onTargetSelectorChange}
              styles={dropdownStyles}
              options={options}
              defaultSelectedKey={'zh'}
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item grow className="source">
        <TextField multiline resizable={false} onChange={onSourceTextChange} onBlur={onBlur} autoFocus />
      </Stack.Item>
      {resultText !== "" && <Stack.Item grow className="target">
        <TextField multiline resizable={false} disabled readOnly value={resultText} />
      </Stack.Item>}
    </Stack>

  </>
}
export default App