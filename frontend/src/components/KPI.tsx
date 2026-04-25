interface KPIProps {
  title: string
  value: number
}

export default function KPI({ title, value }: KPIProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-2">{value}</div>
    </div>
  )
}
