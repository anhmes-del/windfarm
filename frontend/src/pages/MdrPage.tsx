import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export default function MdrPage() {
  const { data: docs = [] } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => (await api.get('/documents')).data,
  })

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Master Document Register</h2>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">Document No.</th>
            <th className="p-3">Revision</th>
            <th className="p-3">Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Discipline</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d: any) => (
            <tr key={d.id} className="border-t">
              <td className="p-3">{d.document_no}</td>
              <td className="p-3">{d.revision}</td>
              <td className="p-3">{d.title}</td>
              <td className="p-3">{d.type_of_document || '-'}</td>
              <td className="p-3">{d.discipline || '-'}</td>
              <td className="p-3">{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
