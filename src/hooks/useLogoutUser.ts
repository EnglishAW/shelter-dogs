import { useNavigate } from 'react-router-dom';
import { logout } from 'network/authentication';

export const useLogoutUser = () => {
   const navigate = useNavigate()

    const logoutUser = () => {
        logout()
        navigate('/login')
    }

    return logoutUser
}