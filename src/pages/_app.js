import { Poppins } from 'next/font/google'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@/styles/globals.css'

const queryClient = new QueryClient();

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }) {
  return (
      <>
        <style jsx global>{`
        :root {
          --base-font: ${poppins.style.fontFamily};
        }
      `}</style>

        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </>
  )
}
