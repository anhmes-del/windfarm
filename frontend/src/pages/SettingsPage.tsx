export default function SettingsPage() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-1">Project Profile</h3>
          <p className="text-sm text-slate-600">Windfarm EPC Internal DMS - Demo configuration.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-1">Notification</h3>
          <p className="text-sm text-slate-600">Email notification can be enabled when backend is connected.</p>
        </div>
      </div>
    </div>
  )
}
