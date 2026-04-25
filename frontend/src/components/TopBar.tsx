import { useMemo, useState } from 'react'

interface Props {
  totalDocuments: number
  remoteMode: boolean
}

export default function TopBar({ totalDocuments, remoteMode }: Props) {
  const [q, setQ] = useState('')
  const modeLabel = useMemo(() => (remoteMode ? 'Backend Connected' : 'Mock Data Mode'), [remoteMode])

  return (
    <header className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Windfarm EPC Document Control</h1>
        <p className="text-sm text-slate-500">Total Documents: {totalDocuments} • {modeLabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-72 max-w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Search document no / title..."
        />
        <span className="rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700">EPC Internal</span>
      </div>
    </header>
  )
}
