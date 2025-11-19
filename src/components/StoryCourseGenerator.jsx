import { useState } from 'react'

function resolveBackendURL() {
  const env = import.meta.env.VITE_BACKEND_URL
  if (env && typeof env === 'string' && env.trim().length > 0) return env.trim()
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    let candidate = origin
      .replace('-3000.', '-8000.')
      .replace(':3000', ':8000')
    return candidate
  }
  return 'http://localhost:8000'
}

const BACKEND_URL = resolveBackendURL()

export default function StoryCourseGenerator() {
  const [tab, setTab] = useState('story')

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('story')} className={`px-4 py-2 rounded-lg ${tab==='story' ? 'bg-blue-600 text-white' : 'bg-slate-900/60 text-blue-200'}`}>Histoire IA</button>
        <button onClick={() => setTab('course')} className={`px-4 py-2 rounded-lg ${tab==='course' ? 'bg-blue-600 text-white' : 'bg-slate-900/60 text-blue-200'}`}>Cours IA</button>
      </div>
      {tab === 'story' ? <StoryForm/> : <CourseForm/>}
    </div>
  )
}

function StoryForm(){
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('narratif')
  const [chapters, setChapters] = useState(5)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, style, chapters })
      })
      if(!res.ok){
        const j = await res.json().catch(()=>({}))
        throw new Error(j.detail || 'Erreur de génération')
      }
      const j = await res.json()
      setData(j)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-2">Créer une histoire avec l'IA</h2>
      <p className="text-blue-200/80 mb-4">Générez une trame claire et exploitable en quelques secondes.</p>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-3">
        <input className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2" placeholder="Sujet / Thème" value={topic} onChange={e=>setTopic(e.target.value)} required />
        <input className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Style (narratif, humoristique, etc.)" value={style} onChange={e=>setStyle(e.target.value)} />
        <input type="number" min={2} max={12} className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Chapitres" value={chapters} onChange={e=>setChapters(Number(e.target.value))} />
        <button disabled={loading} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:opacity-60 sm:col-span-3">{loading? 'Génération...' : 'Générer'}</button>
      </form>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      {data && (
        <div className="mt-6 space-y-3">
          {data.chapters.map((c, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
              <p className="text-white font-medium">{c.title}</p>
              <p className="text-blue-200/80 text-sm">{c.summary}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-blue-300/60 mt-4">Serveur API détecté: <span className="font-mono">{BACKEND_URL}</span></p>
    </div>
  )
}

function CourseForm(){
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('débutant')
  const [lessons, setLessons] = useState(6)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level, lessons })
      })
      if(!res.ok){
        const j = await res.json().catch(()=>({}))
        throw new Error(j.detail || "Erreur de génération")
      }
      const j = await res.json()
      setData(j)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-2">Créer un cours avec l'IA</h2>
      <p className="text-blue-200/80 mb-4">Obtenez un plan de cours structuré par leçons et objectifs.</p>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-3">
        <input className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2" placeholder="Sujet / Thème" value={topic} onChange={e=>setTopic(e.target.value)} required />
        <input className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Niveau (débutant, intermédiaire, avancé)" value={level} onChange={e=>setLevel(e.target.value)} />
        <input type="number" min={3} max={20} className="px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre de leçons" value={lessons} onChange={e=>setLessons(Number(e.target.value))} />
        <button disabled={loading} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:opacity-60 sm:col-span-3">{loading? 'Génération...' : 'Générer'}</button>
      </form>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      {data && (
        <div className="mt-6 space-y-3">
          {data.lessons.map((l, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
              <p className="text-white font-medium">{l.title}</p>
              <ul className="text-blue-200/80 text-sm list-disc pl-5">
                {l.objectives.map((o, i)=> <li key={i}>{o}</li>)}
              </ul>
              <p className="text-blue-200/80 text-sm mt-2">{l.content}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-blue-300/60 mt-4">Serveur API détecté: <span className="font-mono">{BACKEND_URL}</span></p>
    </div>
  )}
