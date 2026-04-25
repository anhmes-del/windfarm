import { ProjectDocument } from '@/types'

interface Props {
  documents: ProjectDocument[]
}

export default function MdrPage({ documents }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Master Document Register</h2>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">Document No.</th>
            <th className="p-3">Rev</th>
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Sender</th>
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
              <td className="p-3 font-medium">{d.documentNo}</td>
              <td className="p-3">{d.revision}</td>
              <td className="p-3">{d.title}</td>
              <td className="p-3">{d.date}</td>
              <td className="p-3">{d.sender}</td>
              <td className="p-3">{d.typeOfDocument}</td>
              <td className="p-3">{d.discipline}</td>
              <td className="p-3">{d.issuePurpose}</td>
              <td className="p-3">{d.transmittalNo}</td>
              <td className="p-3">{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
