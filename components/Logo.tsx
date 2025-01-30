import Image from "next/image"
import logo from '../public/logo.png'
import Link from "next/link"

const Logo = () => {
  return (
    <Link href={'/jobs'} className="text-white font-bold flex flex-row items-center gap-3 trans cursor-pointer hover:opacity-50">
      <Image src={logo.src} alt="" width={40} height={40} className="object-contain" />
      <h3 className="hidden sm:block font-bold">JOBIFY</h3>
    </Link>
  )
}

export default Logo