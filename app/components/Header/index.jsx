import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">SeguroWeb</h1>
                  <p className="text-xs text-gray-600">Suipacha 245 piso 6 (C1008AAE)</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block text-right text-sm text-gray-600">
              <p>Teléfonos: (011) 0810-220-2373 / (011)5263-2373</p>
              <p>
                e-mail:{" "}
                <Link href="mailto:info@seguroweb.com.ar" className="text-blue-600 hover:underline">
                  info@seguroweb.com.ar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header