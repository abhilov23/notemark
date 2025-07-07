/* eslint-disable prettier/prettier */

import { RootLayout, Sidebar, Content, DraggableTopBar, NotePreviewList,  } from "./components"
import ActionButtonRow from "./components/ActionButtonRow"
import MarkdownEditor from "./components/MarkdownEditor"



function App(): React.JSX.Element {
  return (
    <>
    <DraggableTopBar/>
    <RootLayout> 
      <Sidebar className="glass p-2 bg-black/80 backdrop-blur-3xl">
      <ActionButtonRow className="flex justify-between mt-1"/>
      <NotePreviewList className="mt-3 space-y-1"/>
      </Sidebar>
      <Content className="glass bg-black/90 border-l backdrop-blur-3xl border-l-white/20">
      <MarkdownEditor/>
      </Content>
    </RootLayout>
    </>
  )
}

export default App