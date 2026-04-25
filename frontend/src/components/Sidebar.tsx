import { NavLink } from 'react-router-dom'

const items = [
  ['Dashboard', '/'],
  ['Documents', '/documents'],
  ['Transmittals', '/transmittals'],
  ['Schedule 8', '/schedule-8'],
  ['Procurement', '/procurement'],
  ['Review Workflow', '/workflow'],
  ['AI Assistant', '/ai-assistant'],
  ['Settings', '/settings'],
]

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white p-4 sticky top-0">
      <h1 className="text-xl font-semibold mb-1">Windfarm EPC DMS</h1>
      <p className="text-xs text-slate-300 mb-6">Internal Project Document Control</p>
      <nav className="space-y-2">
        {items.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'hover:bg-slate-700'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
