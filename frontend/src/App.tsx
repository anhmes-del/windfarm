import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import DashboardPage from '@/pages/DashboardPage'
import DocumentsPage from '@/pages/DocumentsPage'
import TransmittalPage from '@/pages/TransmittalPage'
import Schedule8Page from '@/pages/Schedule8Page'
import ProcurementPage from '@/pages/ProcurementPage'
import WorkflowPage from '@/pages/WorkflowPage'
import QAPage from '@/pages/QAPage'
import SettingsPage from '@/pages/SettingsPage'
import UploadPage from '@/pages/UploadPage'
import { useProjectData } from '@/lib/useProjectData'

export default function App() {
  const state = useProjectData()

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-4">
        <TopBar totalDocuments={state.kpi.total} remoteMode={state.remoteMode} />
        <Routes>
          <Route path="/" element={<DashboardPage documents={state.documents} kpi={state.kpi} />} />
          <Route path="/documents" element={<DocumentsPage documents={state.documents} />} />
          <Route path="/transmittals" element={<TransmittalPage transmittals={state.transmittals} />} />
          <Route path="/schedule-8" element={<Schedule8Page schedule8={state.schedule8} />} />
          <Route path="/procurement" element={<ProcurementPage documents={state.documents} />} />
          <Route path="/workflow" element={<WorkflowPage documents={state.documents} updateWorkflow={state.updateWorkflow} />} />
          <Route path="/ai-assistant" element={<QAPage documents={state.documents} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/upload" element={<UploadPage uploadFiles={state.uploadFiles} />} />
        </Routes>
      </main>
    </div>
  )
}
