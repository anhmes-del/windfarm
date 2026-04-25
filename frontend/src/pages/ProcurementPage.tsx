import { ProjectDocument } from '@/types'

interface Props {
  documents: ProjectDocument[]
}

export default function ProcurementPage({ documents }: Props) {
  const items = documents.filter((d) => d.typeOfDocument.toLowerCase().includes('procurement') || d.procurementPackage)

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Procurement Tracking</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-slate-50">
            <th className="p-3">Package</th>
            <th className="p-3">Document</th>
            <th className="p-3">Vendor</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-3">{row.procurementPackage || 'General Package'}</td>
              <td className="p-3">{row.documentNo}</td>
              <td className="p-3">{row.sender}</td>
              <td className="p-3">{row.dueDate}</td>
              <td className="p-3">{row.status}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td className="p-3 text-slate-500" colSpan={5}>No procurement rows yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
