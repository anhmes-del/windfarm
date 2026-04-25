import { Transmittal } from '@/types'

interface Props {
  transmittals: Transmittal[]
}

export default function TransmittalPage({ transmittals }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Transmittal Log</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-slate-50">
            <th className="p-3">Transmittal No.</th>
            <th className="p-3">Sender</th>
            <th className="p-3">Receiver</th>
            <th className="p-3">Issue Date</th>
            <th className="p-3">Total Docs</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {transmittals.map((t) => (
            <tr key={t.transmittalNo} className="border-t">
              <td className="p-3">{t.transmittalNo}</td>
              <td className="p-3">{t.sender}</td>
              <td className="p-3">{t.receiver}</td>
              <td className="p-3">{t.issueDate}</td>
              <td className="p-3">{t.totalDocs}</td>
              <td className="p-3">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
