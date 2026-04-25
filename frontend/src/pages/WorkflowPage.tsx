import { ProjectDocument, WorkflowStatus } from '@/types'

const stages: WorkflowStatus[] = ['SUBMIT', 'REVIEW', 'COMMENT', 'RESUBMIT', 'APPROVE', 'CLOSE']

interface Props {
  documents: ProjectDocument[]
  updateWorkflow: (id: string, stage: WorkflowStatus) => void
}

export default function WorkflowPage({ documents, updateWorkflow }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Workflow</h2>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="border rounded-lg p-3 flex flex-wrap items-center gap-3">
            <div className="min-w-[360px]">
              <div className="font-medium">{doc.documentNo}</div>
              <div className="text-xs text-slate-500">{doc.title}</div>
            </div>
            <select
              className="border rounded-lg p-2"
              value={doc.workflowStage}
              onChange={(e) => updateWorkflow(doc.id, e.target.value as WorkflowStatus)}
            >
              {stages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">Current: {doc.workflowStage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
