import { ProjectDocument } from '@/types'

export function parseMetadataFromFile(fileName: string): Partial<ProjectDocument> {
  const base = fileName.replace(/\.[^.]+$/, '')
  const parts = base.split('_')

  // Recommended naming: DOCNO_REV_TITLE_YYYY-MM-DD
  const [documentNo, revision, ...rest] = parts
  const title = rest.join(' ').trim() || base

  return {
    documentNo: documentNo || `TMP-${Date.now()}`,
    revision: revision || 'A00',
    title,
  }
}
