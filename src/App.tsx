import { Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './lib/project-context'
import GanttPage from './pages/GanttPage'
import BrandAssetsPage from './pages/BrandAssetsPage'
import ThumbnailPage from './pages/ThumbnailPage'
import FaviconPreviewPage from './pages/FaviconPreviewPage'
import OgPreviewPage from './pages/OgPreviewPage'
import AppleTouchPreviewPage from './pages/AppleTouchPreviewPage'

function App() {
  return (
    <ProjectProvider>
      <Routes basename="gantt-chart">
        <Route path="/" element={<GanttPage />} />
        <Route path="/brand-assets" element={<BrandAssetsPage />} />
        <Route path="/thumbnail" element={<ThumbnailPage />} />
        <Route path="/favicon-preview" element={<FaviconPreviewPage />} />
        <Route path="/og-preview" element={<OgPreviewPage />} />
        <Route path="/apple-touch-preview" element={<AppleTouchPreviewPage />} />
      </Routes>
    </ProjectProvider>
  )
}

export default App
