import { useState } from 'react'
import { api } from '@/lib/api'

export default function QAPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<any>(null)

  const ask = async () => {
    const res = await api.post('/qa/ask', { question })
    setAnswer(res.data)
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
      <h2 className="text-xl font-semibold">AI Q&A</h2>
      <textarea
        className="w-full border rounded-lg p-3"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about document content, outstanding comments, due dates..."
      />
      <button onClick={ask} className="bg-brand-500 text-white px-4 py-2 rounded-lg">
        Ask AI
      </button>
      {answer && (
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="font-medium">{answer.answer}</p>
          <ul className="mt-3 list-disc ml-5 text-sm text-slate-600">
            {answer.sources.map((s: any, i: number) => (
              <li key={i}>{`${s.document_no} | ${s.file} | page ${s.page}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
