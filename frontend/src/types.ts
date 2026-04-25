export type IssuePurpose = 'IFI' | 'IFA' | 'IFR' | 'IFC' | 'ASB' | 'IFV'
export type WorkflowStatus = 'SUBMIT' | 'REVIEW' | 'COMMENT' | 'RESUBMIT' | 'APPROVE' | 'CLOSE'

export interface ProjectDocument {
  id: string
  documentNo: string
  revision: string
  title: string
  date: string
  sender: 'VES' | 'REE' | 'TE' | 'OWNER'
  receiver: string
  typeOfDocument: string
  discipline: string
  issuePurpose: IssuePurpose
  transmittalNo: string
  status: 'Open' | 'Closed' | 'Overdue'
  dueDate: string
  replyDate?: string
  overdueDays: number
  workflowStage: WorkflowStatus
  procurementPackage?: string
  fileName?: string
}

export interface Transmittal {
  transmittalNo: string
  sender: string
  receiver: string
  issueDate: string
  totalDocs: number
  status: 'Open' | 'Closed'
}

export interface Schedule8Item {
  id: string
  item: string
  owner: string
  requiredBy: string
  submittedDate?: string
  status: 'Pending' | 'Submitted' | 'Late'
}
