import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/home/HomePage'
import { SearchPage } from '@/pages/search/SearchPage'
import { BookMarkPage } from '@/pages/bookmark/BookMarkPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookmark" element={<BookMarkPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
