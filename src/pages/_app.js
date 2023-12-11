import 'src/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthApi from '../services/auth';
import { SpinningCircles  } from 'react-loading-icons'

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const authenticateRoute = async () => {
    setLoading(true);
    const res = await AuthApi.verifyLogin();
    if (!res && router.pathname != "/login") {
      router.push("/login").then(() => {
        setLoading(false);
      })
    } else {
      setLoading(false);
    }    
  }

  useEffect(() => {
    authenticateRoute();
  }, [])

  return !loading ? (
    <>
      <NextNProgress color={"#4096ff"} height={5} />
      <Component {...pageProps}/>
    </>
  ) : (
    <>
      <div className='bg-[#FAF2E3]'>
        <NextNProgress color={"#4096ff"} height={5} />
        <SpinningCircles fill='#4096ff' speed={1.5} width={300} height={300} className='m-auto h-[100vh] min-h-[400px] flex items-center justify-center' />
      </div>
    </>
  )

}
