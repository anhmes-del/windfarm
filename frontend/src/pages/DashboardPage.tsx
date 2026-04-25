import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import KPI from '@/components/KPI'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: async () => (await api.get('/dashboard/summary')).data,
  })

  const { data: byType = [] } = useQuery({
    queryKey: ['byType'],
    queryFn: async () => (await api.get('/dashboard/by-type')).data,
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Project Dashboard</h2>
      <div className="grid md:grid-cols-4 gap-4">
        <KPI title="Total Documents" value={summary?.total_documents ?? 0} />
        <KPI title="Open" value={summary?.open_documents ?? 0} />
        <KPI title="Closed" value={summary?.closed_documents ?? 0} />
        <KPI title="Overdue" value={summary?.overdue_documents ?? 0} />
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold mb-4">Documents by Type</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byType}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
