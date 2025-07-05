/* eslint-disable prettier/prettier */

import { RootLayout, Sidebar, Content, DraggableTopBar,  } from "./components"
import ActionButtonRow from "./components/ActionButtonRow"



function App(): React.JSX.Element {
  return (
    <>
    <DraggableTopBar/>
    <RootLayout> 
      <Sidebar className="p-2 border-4 border-green-900 bg-zinc-800/50">
      <ActionButtonRow className="flex justify-between mt-1"/>
      </Sidebar>
      <Content className="border-l bg-zinc-900/50 border-l-white/50">Content</Content>
    </RootLayout>
    </>
  )
}

export default App