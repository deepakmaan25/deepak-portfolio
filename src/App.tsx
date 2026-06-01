import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation'

// Pages — lazy loaded for performance
import { lazy, Suspense } from 'react'

const HomePage      = lazy(() => import('./pages/HomePage'))
const ShippedPage   = lazy(() => import('./pages/ShippedPage'))
const WritingsPage  = lazy(() => import('./pages/WritingsPage'))
const ArticlePage   = lazy(() => import('./pages/ArticlePage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

// Minimal loading fallback — invisible, just prevents layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-bg" aria-hidden="true" />
)

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                       element={<HomePage />} />
          <Route path="/shipped"                element={<ShippedPage />} />
          <Route path="/writings"               element={<WritingsPage />} />
          <Route path="/writings/:slug"         element={<ArticlePage />} />
          <Route path="/case-study/:slug"       element={<CaseStudyPage />} />
          {/* Catch-all — redirect to home */}
          <Route path="*"                       element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
