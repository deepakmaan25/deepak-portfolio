import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navigation from './components/layout/Navigation'

const HomePage      = lazy(() => import('./pages/HomePage'))
const ShippedPage   = lazy(() => import('./pages/ShippedPage'))
const WritingsPage  = lazy(() => import('./pages/WritingsPage'))
const ArticlePage   = lazy(() => import('./pages/ArticlePage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

const Loader = () => (
  <div style={{ minHeight:'100vh', backgroundColor:'hsl(0,0%,98%)' }} />
)

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/shipped"            element={<ShippedPage />} />
          <Route path="/writings"           element={<WritingsPage />} />
          <Route path="/writings/:slug"     element={<ArticlePage />} />
          <Route path="/case-study/:slug"   element={<CaseStudyPage />} />
          <Route path="*"                   element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
