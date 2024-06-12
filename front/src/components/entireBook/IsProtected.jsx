import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/useUser'

export const IsProtected = () => {
    const { user } = useUserContext()
    const navigate = useNavigate()

    if (!user?.id) {
        navigate('/login')
        return false
    } else {
        return true
    }

}