import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import DashboardPage from '@/pages/DashboardPage'
import MdrPage from '@/pages/MdrPage'
import TransmittalPage from '@/pages/TransmittalPage'
import Schedule8Page from '@/pages/Schedule8Page'
import WorkflowPage from '@/pages/WorkflowPage'
import QAPage from '@/pages/QAPage'

export default function App() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/mdr" element={<MdrPage />} />
          <Route path="/transmittal" element={<TransmittalPage />} />
          <Route path="/schedule-8" element={<Schedule8Page />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/qa" element={<QAPage />} />
        </Routes>
      </main>
    </div>
  )
}
