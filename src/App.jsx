import Downloader from './components/Downloader'
import StoryCourseGenerator from './components/StoryCourseGenerator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_10%,rgba(59,130,246,0.15),transparent),radial-gradient(400px_200px_at_90%_20%,rgba(99,102,241,0.12),transparent),radial-gradient(500px_200px_at_50%_100%,rgba(14,165,233,0.12),transparent)] pointer-events-none"></div>

      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-12 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <img src="/flame-icon.svg" alt="Flames" className="w-12 h-12 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
          <span className="text-blue-200/80 tracking-widest text-sm">FLAMES BLUE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
          Téléchargez vos vidéos et créez des contenus avec l'IA
        </h1>
        <p className="text-blue-200/90 text-lg max-w-3xl mx-auto">
          Supporte YouTube, TikTok, Facebook et plus encore. Générez des histoires et des plans de cours 
          clairs et prêts à l'emploi — le tout instantanément.
        </p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Downloader />
        <StoryCourseGenerator />
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-12 text-center text-blue-300/60">
        <p>Conseil: définissez VITE_BACKEND_URL si vous utilisez un backend distant.</p>
      </footer>
    </div>
  )
}

export default App
