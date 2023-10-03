import Image from 'next/image'
import NaviBar from '../components/NaviBar/NaviBar'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen`}
    >
      <NaviBar 
        avatar={"/avatar-placeholder.jpg"}
        name={"Nguyễn Văn A"}
      />
      <div>
        <div>
          
        </div>
      </div>
    </main>
  )
}
