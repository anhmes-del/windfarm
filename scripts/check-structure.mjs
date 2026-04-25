import fs from 'node:fs'

const required = [
  'frontend',
  'backend',
  'package.json',
  'README.md',
  'vercel.json',
  'frontend/package.json',
  'frontend/index.html',
  'frontend/vite.config.js',
  'frontend/src/main.jsx',
  'frontend/src/App.jsx',
  'frontend/src/styles.css',
]

const optionalCommon = ['src', 'app', 'backend/main.py', 'backend/src', 'backend/requirements.txt']

const missing = required.filter((item) => !fs.existsSync(item))
if (missing.length > 0) {
  console.error('Missing files/folders:\n' + missing.map((m) => `- ${m}`).join('\n'))
  process.exit(1)
}

const presentOptionals = optionalCommon.filter((item) => fs.existsSync(item))
console.log('Project structure OK ✅')
console.log('Detected optional paths:', presentOptionals.join(', ') || 'none')
