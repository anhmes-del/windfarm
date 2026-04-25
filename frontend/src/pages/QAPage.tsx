import { useState } from 'react'
import { ProjectDocument } from '@/types'

interface Props {
  documents: ProjectDocument[]
}

export default function QAPage({ documents }: Props) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string>('')

  const ask = () => {
    const top = documents.slice(0, 3)
    setAnswer(
      `Trả lời AI mẫu: Dựa trên ${top.length} tài liệu gần nhất, bạn cần ưu tiên xử lý hồ sơ overdue.\n` +
      top.map((d) => `- ${d.documentNo} | ${d.fileName || 'N/A'} | page: 1`).join('\n'),
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
      <h2 className="text-xl font-semibold">AI Q&A (Offline Demo)</h2>
      <p className="text-sm text-slate-500">Bản local demo cho người mới, chưa cần backend/API key.</p>
      <textarea
        className="w-full border rounded-lg p-3"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ví dụ: Tài liệu nào đang overdue?"
      />
      <button onClick={ask} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Ask AI</button>
      {answer && <pre className="rounded-lg bg-slate-50 p-4 whitespace-pre-wrap text-sm">{answer}</pre>}
    </div>
  )
}
