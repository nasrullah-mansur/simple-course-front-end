
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/modules/auth/auth.api";
import { loginUser } from "@/redux/reducers/userReducer";
import { authToken } from "@/utils/authToken";
import { useEffect, type ComponentType } from "react";
import { Navigate } from "react-router";

type TRole = "student" | "admin";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {

    const token = authToken.getTokenFromLocalStorage();
    const { data, isLoading, isError } = useUserInfoQuery(token);

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (data) {
        dispatch(loginUser(data.user));
      }
    }, [data, dispatch]);

    if (!token || isError) {
      return <Navigate to="/login" />
    }

    if (requiredRole && !isLoading && requiredRole !== data?.user?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};