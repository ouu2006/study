import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lv5App from './lv5/Lv5App'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Lv5App />} />
      </Routes>
    </BrowserRouter>
  )
}
