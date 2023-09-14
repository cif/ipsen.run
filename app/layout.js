import './globals.css'

export const metadata = {
  title: 'IPSEN DA IDA, UNIPESSOAL LDA',
  description: 'ipsen.run is owned by IPSEN DA IDA, UNIPESSOAL LDA, Portugal.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
