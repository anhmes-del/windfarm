import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import KPI from '@/components/KPI'
import { ProjectDocument } from '@/types'

interface Props {
  documents: ProjectDocument[]
  kpi: { total: number; open: number; closed: number; overdue: number }
}

const colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed']

export default function DashboardPage({ documents, kpi }: Props) {
  const byType = Object.values(documents.reduce((acc, d) => {
    acc[d.typeOfDocument] = acc[d.typeOfDocument] || { name: d.typeOfDocument, value: 0 }
    acc[d.typeOfDocument].value += 1
    return acc
  }, {} as Record<string, { name: string; value: number }>))

  const byDiscipline = Object.values(documents.reduce((acc, d) => {
    acc[d.discipline] = acc[d.discipline] || { name: d.discipline, count: 0 }
    acc[d.discipline].count += 1
    return acc
  }, {} as Record<string, { name: string; count: number }>))

  const bySender = ['VES', 'REE', 'TE'].map((sender) => ({ sender, count: documents.filter((d) => d.sender === sender).length }))

  const byMonth = Object.values(documents.reduce((acc, d) => {
    const month = d.date.slice(0, 7)
    acc[month] = acc[month] || { month, count: 0 }
    acc[month].count += 1
    return acc
  }, {} as Record<string, { month: string; count: number }>))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard quản lý document EPC</h2>
      <div className="grid md:grid-cols-4 gap-4">
        <KPI title="Total documents" value={kpi.total} />
        <KPI title="Open" value={kpi.open} />
        <KPI title="Closed" value={kpi.closed} />
        <KPI title="Overdue" value={kpi.overdue} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 h-80">
          <h3 className="font-semibold mb-3">Document by type</h3>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie data={byType} dataKey="value" nameKey="name" outerRadius={100}>
                {byType.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 h-80">
          <h3 className="font-semibold mb-3">Document by discipline</h3>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={byDiscipline}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 h-80">
          <h3 className="font-semibold mb-3">VES vs REE vs TE submission</h3>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={bySender}>
              <XAxis dataKey="sender" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 h-80">
          <h3 className="font-semibold mb-3">Timeline theo tháng</h3>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={byMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="count" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
