const steps = ['Submit', 'Review', 'Comment', 'Resubmit', 'Approve', 'Close']

export default function WorkflowPage() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Workflow Board</h2>
      <div className="grid md:grid-cols-6 gap-3">
        {steps.map((s) => (
          <div key={s} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-sm font-medium">
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
