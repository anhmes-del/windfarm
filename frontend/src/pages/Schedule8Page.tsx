import { Schedule8Item } from '@/types'

interface Props {
  schedule8: Schedule8Item[]
}

export default function Schedule8Page({ schedule8 }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Schedule 8 Compliance Tracking</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left">
            <th className="p-3">Submission Item</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Required By</th>
            <th className="p-3">Submitted</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {schedule8.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.item}</td>
              <td className="p-3">{item.owner}</td>
              <td className="p-3">{item.requiredBy}</td>
              <td className="p-3">{item.submittedDate || '-'}</td>
              <td className="p-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
