import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function Downloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleDownload = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Erreur pendant le téléchargement')
      }
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-2">Téléchargeur universel</h2>
      <p className="text-blue-200/80 mb-4">Collez un lien YouTube, TikTok ou Facebook. Nous récupérons la meilleure qualité disponible.</p>

      <form onSubmit={handleDownload} className="flex gap-3">
        <input
          type="url"
          required
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:opacity-60"
        >
          {loading ? 'Téléchargement...' : 'Télécharger'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-700">
          <p className="text-white font-medium mb-2">{result.title || 'Média'}</p>
          {result.thumbnail && (
            <img src={result.thumbnail} alt="thumb" className="w-64 rounded-lg border border-slate-700" />
          )}
          <div className="text-sm text-blue-200/80 mt-2">
            <p>Plateforme: {result.platform || 'N/A'}</p>
            <p>Durée: {result.duration ? Math.round(result.duration) + 's' : 'N/A'}</p>
            {result.file_url && (
              <a href={result.file_url} className="text-blue-400 underline" download>
                Télécharger le fichier
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
