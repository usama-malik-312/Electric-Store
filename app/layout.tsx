import './globals.css'
import { Inter } from 'next/font/google'
// import StyledComponentsRegistry from '@/lib/antd/Registry'
import { ConfigProvider, theme } from 'antd'
import StyledComponentsRegistry from './lib/antd/Registry'
// import theme from '@/lib/antd/theme'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}