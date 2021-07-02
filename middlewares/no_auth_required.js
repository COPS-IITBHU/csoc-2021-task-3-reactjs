import { useEffect} from 'react'
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router'

export default function noAuthReq(){
    const {token} = useAuth();
    const router = useRouter()
    useEffect(() => {  
        if(token){
            router.push('/')
        }
    },[token])
}