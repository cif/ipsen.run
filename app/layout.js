import './globals.css'

export const metadata = {
  title: 'IPSEN DA IDA, UNIPESSOAL LDA',
  description: 'ipsen.run is owned by IPSEN DA IDA, UNIPESSOAL LDA, Portugal.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🏃‍♂️</text></svg>" />
      <body>{children}</body>
    </html>
  )
}
