import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUser'
import { useEffect } from 'react'

export const ProtectedRoute = ({children}) => {
    const { user } = useUserContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user?.id) {
            navigate('/login')
        }
    },[user])
    return children
}
