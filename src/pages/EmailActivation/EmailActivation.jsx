import React from 'react'
import CardActivation from '../../components/Card/CardActivation/Index'
import { useUserActivationQuery } from '../../features/auth/authApiSlice'
import { useSearchParams } from 'react-router-dom'


const EmailActivation = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {data, isLoading, isSuccess, isError} = useUserActivationQuery({
    token : searchParams.get('token'),
    role: searchParams.get('role')
  }, {skip: searchParams.get('token') ? false : true})
  return (
    <main style={{ background: "#F0F5F9" }}>
      {isLoading ? 'Loading ...' : (
        <CardActivation
          title={isSuccess ? "Register Succes, Email aleready Active!" : `Register Failed!`}
          description={isSuccess ? "Selamat!!, email Anda berhasil diaktivasi. Silakan login ke akun Anda untuk mulai menggunakan layanan kami." : "Mohon maaf, sepertinya ada masalah saat mengaktivasi email Anda. Silakan daftar kembali untuk mendapatkan akun baru."}
        >
            <button
            className="btn bg-purple mt-3 mb-3 rounded-pill px-4"
          >
            <a href={`/login/${searchParams.get('role')}`} className="text-decoration-none btn btn-danger rounded-pill bg-danger text-light">
              Login Now!  
            </a>
          </button>
        </CardActivation> 
      )}
    </main>
  )
}

export default EmailActivation