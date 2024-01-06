import {Outlet,Navigate} from 'react-router-dom';
const ProtectedRoutesComponents = ()=>{
    const auth = false
    return auth ? <Outlet/> :<Navigate to ="/login"/>
}
export default ProtectedRoutesComponents;