/* eslint-disable prettier/prettier */

import { RootLayout, Sidebar, Content, DraggableTopBar,  } from "./components"
import ActionButtonRow from "./components/ActionButtonRow"



function App(): React.JSX.Element {
  return (
    <>
    <DraggableTopBar/>
    <RootLayout> 
      <Sidebar className="glass p-2">
      <ActionButtonRow className="flex justify-between mt-1"/>
      </Sidebar>
      <Content className="border-l bg-zinc-950/50 border-l-white/10">Content</Content>
    </RootLayout>
    </>
  )
}

export default App