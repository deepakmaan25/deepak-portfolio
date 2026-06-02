import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'

const HomePage      = lazy(() => import('./pages/HomePage'))
const ShippedPage   = lazy(() => import('./pages/ShippedPage'))
const WritingsPage  = lazy(() => import('./pages/WritingsPage'))
const ArticlePage   = lazy(() => import('./pages/ArticlePage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const NotFound      = lazy(() => import('./pages/NotFound'))

const Loader = () => <div style={{ minHeight: '100vh', backgroundColor: 'hsl(0,0%,98%)' }} />

function AppInner() {
  const location = useLocation()
  const showFooter = location.pathname !== '/'
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"                 element={<HomePage />} />
          <Route path="/shipped"          element={<ShippedPage />} />
          <Route path="/writings"         element={<WritingsPage />} />
          <Route path="/writings/:slug"   element={<ArticlePage />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="*"                 element={<NotFound />} />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
