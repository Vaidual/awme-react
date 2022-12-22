import { useSelector } from 'react-redux'
import {selectMe, selectRoles, selectUserId} from "../redux/auth/authSelector";

const useAuth = () => {
    const user = useSelector(selectMe);
    const userId = useSelector(selectUserId);
    const roles = useSelector(selectRoles);

    return { user, userId, roles }
}
export default useAuth