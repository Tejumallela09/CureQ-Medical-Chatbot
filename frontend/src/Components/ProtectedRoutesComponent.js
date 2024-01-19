import {Outlet,Navigate} from 'react-router-dom';
const ProtectedRoutesComponents = ()=>{
    const auth = true
    return auth ? <Outlet/> :<Navigate to ="/login"/>
}
export default ProtectedRoutesComponents;