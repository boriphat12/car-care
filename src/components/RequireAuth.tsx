import type { PropsWithChildren } from "react";
import { useAppSelector } from "../hooks";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({children}: PropsWithChildren) => {
    const auth = useAppSelector((state) => state.auth)    
    const location = useLocation();

    if(!auth.token){
        return <Navigate to='/login' state={{from: location}} replace/>
    }

    return children;
}

export default RequireAuth;