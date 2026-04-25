import { useMemo, useState } from 'react'
import { initialDocuments, initialSchedule8, initialTransmittals } from '@/data/sampleData'
import { parseMetadataFromFile } from '@/lib/metadata'
import { ProjectDocument } from '@/types'

const STORAGE_KEY = 'windfarm-epc-dms'

function loadDocs() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return initialDocuments
  try {
    return JSON.parse(raw) as ProjectDocument[]
  } catch {
    return initialDocuments
  }
}

export function useProjectData() {
  const [documents, setDocuments] = useState<ProjectDocument[]>(loadDocs)

  const saveDocs = (next: ProjectDocument[]) => {
    setDocuments(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const uploadFiles = (files: FileList) => {
    const additions = Array.from(files).map((f, idx) => {
      const parsed = parseMetadataFromFile(f.name)
      const today = new Date().toISOString().slice(0, 10)
      return {
        id: `${Date.now()}-${idx}`,
        documentNo: parsed.documentNo || `TMP-${Date.now()}-${idx}`,
        revision: parsed.revision || 'A00',
        title: parsed.title || f.name,
        date: today,
        sender: 'VES' as const,
        receiver: 'REE',
        typeOfDocument: f.name.endsWith('.pdf') ? 'Drawing' : f.name.endsWith('.xlsx') ? 'Procurement Plan' : 'Method Statement',
        discipline: 'General',
        issuePurpose: 'IFI' as const,
        transmittalNo: 'AUTO-TRM-0001',
        status: 'Open' as const,
        dueDate: today,
        overdueDays: 0,
        workflowStage: 'SUBMIT' as const,
        fileName: f.name,
      }
    })
    saveDocs([ ...additions, ...documents ])
  }

  const updateWorkflow = (id: string, stage: ProjectDocument['workflowStage']) => {
    const next = documents.map((d) => (d.id === id ? { ...d, workflowStage: stage, status: stage === 'CLOSE' ? 'Closed' : d.status } : d))
    saveDocs(next)
  }

  const kpi = useMemo(() => {
    const total = documents.length
    const closed = documents.filter((d) => d.status === 'Closed').length
    const overdue = documents.filter((d) => d.status === 'Overdue' || d.overdueDays > 0).length
    return { total, closed, overdue, open: total - closed }
  }, [documents])

  return {
    documents,
    transmittals: initialTransmittals,
    schedule8: initialSchedule8,
    uploadFiles,
    updateWorkflow,
    kpi,
  }
}
