import Image from "next/image"
import logo from '../public/logo.png'

const Logo = () => {
  return (
    <div className="text-white font-bold flex flex-row items-center gap-3">
      <Image src={logo.src} alt="" width={40} height={40} className="object-contain" />
      <h3 className="hidden md:block font-bold">JOBIFY</h3>
    </div>
  )
}

export default Logo