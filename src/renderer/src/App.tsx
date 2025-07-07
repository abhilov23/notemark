/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { useRef } from "react"
import { RootLayout, Sidebar, Content, DraggableTopBar, NotePreviewList,  } from "./components"
import ActionButtonRow from "./components/ActionButtonRow"
import FloatingNoteTitle from "./components/FloatingNoteTitle"
import MarkdownEditor from "./components/MarkdownEditor"



function App(): React.JSX.Element {
  const contentContainerRef = useRef<HTMLDivElement>(null)
   
const resetScroll = () => {
  contentContainerRef.current?.scrollTo(0, 0)
}


  return (
    <>
    <DraggableTopBar/>
    <RootLayout> 
      <Sidebar className="glass p-2 bg-black/80 backdrop-blur-3xl">
      <ActionButtonRow className="flex justify-between mt-1"/>
      <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
      </Sidebar>
      <Content ref={contentContainerRef} className="glass bg-black/90 border-l backdrop-blur-3xl border-l-white/20">
      <FloatingNoteTitle className="pt-2"/>
      <MarkdownEditor/>
      </Content>
    </RootLayout>
    </>
  )
}

export default App