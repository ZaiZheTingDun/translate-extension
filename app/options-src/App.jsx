import React, { useEffect, useState } from 'react'
import { Stack, TextField, PrimaryButton, MessageBar, MessageBarType } from '@fluentui/react'

const App = () => {
  const [server, setServer] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    chrome.storage.local.get({ server: '' }, function (local) {
      console.log(local)
      setServer(local.server)
    })
  }, [])

  const onChange = (_, server) => {
    setServer(server)
  }

  const onSave = () => {
    chrome.storage.local.set({ server }, function () {
      console.log(`Success, ${server}.`)
      setIsSaved(true)
    });
  }

  const successBar = () => (
    <MessageBar className="success-bar"
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Save Success.
    </MessageBar>
  );

  return <>
    <Stack>
      {isSaved && <Stack.Item>
        {successBar()}
      </Stack.Item>}
      <Stack.Item grow>
        <TextField onChange={onChange} value={server} label="Please input your server adddress (With http/https)" />
      </Stack.Item>
      <Stack.Item className="save-btn-stack">
        <PrimaryButton text="Save" onClick={onSave} />
      </Stack.Item>
    </Stack>

  </>
}
export default App