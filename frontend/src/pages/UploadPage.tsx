interface Props {
  uploadFiles: (files: FileList) => void
}

export default function UploadPage({ uploadFiles }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
      <h2 className="text-xl font-semibold">Upload Documents (PDF / Excel / Word)</h2>
      <p className="text-sm text-slate-600">
        Gợi ý đặt tên file: <b>DocumentNo_Revision_Title_Date.ext</b> để app tự parse metadata nhanh hơn.
      </p>
      <input
        type="file"
        multiple
        accept=".pdf,.xlsx,.xls,.doc,.docx"
        className="block w-full border rounded-lg p-3"
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
      />
      <div className="text-sm text-slate-500">Sau khi upload, vào MDR để xem danh mục đã cập nhật.</div>
    </div>
  )
}
