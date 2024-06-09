import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUser'
import { useEffect } from 'react'

export const ProtectedRoute = ({children}) => {
    const { userId } = useUserContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (!userId || userId === null) {
            navigate('/login')
        }
    },[userId])
    return children
}
