/* eslint-disable prettier/prettier */

import { RootLayout, Sidebar, Content, DraggableTopBar,  } from "./components"
import ActionButtonRow from "./components/ActionButtonRow"



function App(): React.JSX.Element {
  return (
    <>
    <DraggableTopBar/>
    <RootLayout> 
      <Sidebar className="glass p-2 backdrop-blur-3xl">
      <ActionButtonRow className="flex justify-between mt-1"/>
      </Sidebar>
      <Content className="glass border-l backdrop-blur-3xl border-l-white/20">Content</Content>
    </RootLayout>
    </>
  )
}

export default App