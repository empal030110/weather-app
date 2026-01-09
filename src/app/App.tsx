import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/home/HomePage'
import { SearchPage } from '@/pages/search/SearchPage'
import { BookMarkPage } from '@/pages/bookmark/BookMarkPage'
import { PageContainer } from "@/shared/ui/pageContainer"
import { Sidebar } from '@/widgets/sidebar'

function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmark" element={<BookMarkPage />} />
        </Routes>
      </PageContainer>
    </BrowserRouter>
  )
}

export default App
