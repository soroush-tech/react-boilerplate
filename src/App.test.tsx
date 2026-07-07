import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
}

describe('App', () => {
  it('renders the headline', () => {
    renderApp()

    expect(screen.getByRole('heading', { name: 'Vite + React' })).toBeInTheDocument()
  })

  it('shows the user returned by the mocked API', async () => {
    renderApp()

    expect(await screen.findByRole('heading', { name: 'John' })).toBeInTheDocument()
  })
})
