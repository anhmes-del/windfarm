import { ProjectDocument } from '@/types'

interface Props {
  documents: ProjectDocument[]
}

const badgeClass: Record<ProjectDocument['status'], string> = {
  Open: 'bg-amber-100 text-amber-800',
  Closed: 'bg-emerald-100 text-emerald-800',
  Overdue: 'bg-rose-100 text-rose-800',
}

export default function DocumentsPage({ documents }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Master Document Register</h2>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">Document No.</th>
            <th className="p-3">Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Discipline</th>
            <th className="p-3">Issue Purpose</th>
            <th className="p-3">Transmittal</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr key={d.id} className="border-t align-top">
              <td className="p-3 font-medium">{d.documentNo} ({d.revision})</td>
              <td className="p-3">{d.title}</td>
              <td className="p-3">{d.typeOfDocument}</td>
              <td className="p-3">{d.discipline}</td>
              <td className="p-3">{d.issuePurpose}</td>
              <td className="p-3">{d.transmittalNo}</td>
              <td className="p-3">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeClass[d.status]}`}>{d.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
