import { Html, Head, Main, NextScript } from 'next/document'
import { Navbar } from './components/Navbar'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Document() {
  return (
    <Html lang="en">
      <UserProvider>
      <Navbar/>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      </UserProvider>
    </Html>
  )
}
