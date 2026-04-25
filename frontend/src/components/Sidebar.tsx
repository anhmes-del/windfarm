import { NavLink } from 'react-router-dom'

const items = [
  ['Dashboard', '/'],
  ['Master Document Register', '/mdr'],
  ['Transmittal Log', '/transmittal'],
  ['Schedule 8', '/schedule-8'],
  ['Workflow Board', '/workflow'],
  ['AI Q&A', '/qa'],
]

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-xl font-semibold mb-6">Windfarm EPC DMS</h1>
      <nav className="space-y-2">
        {items.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand-700' : 'hover:bg-slate-700'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
