import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AppLayout } from "./layouts/AppLayout"
import { Home } from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App