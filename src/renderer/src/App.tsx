/* eslint-disable prettier/prettier */

import { RootLayout, Sidebar, Content } from "./components"



function App(): React.JSX.Element {
  return (
    <RootLayout> 
      <Sidebar className="p-2 border-4 border-red-300">Sidebar</Sidebar>
      <Content className="border-4 border-blue-500">Content</Content>
    </RootLayout>
  )
}

export default App