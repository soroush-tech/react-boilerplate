import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { renderWithProvider } from './renderWithProvider.tsx'
import './index.css'

if (import.meta.env.DEV || import.meta.env.VITE_MSW) {
  import('./service/mocks/runtime')
    .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
    .catch((error: Error) => console.error('msw worker error', error))
}

ReactDOM.createRoot(document.getElementById('root')!).render(renderWithProvider(App))
