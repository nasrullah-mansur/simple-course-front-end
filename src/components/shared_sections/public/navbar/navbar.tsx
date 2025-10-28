import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLogoutMutation, useUserInfoQuery } from "@/redux/modules/auth/auth.api";
import { loginUser } from "@/redux/reducers/userReducer";
import { authToken } from "@/utils/authToken";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Logo } from "../../../ui/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const user = useAppSelector(store => store.loginUser);
  const dispatch = useAppDispatch();

  const token = authToken.getTokenFromLocalStorage();

  const { data } = useUserInfoQuery(token, {
    skip: !token,
  });


  const handleLogout = async () => {

    dispatch(loginUser({
      name: "",
      email: "",
      role: ""
    }));

    await logout(token);

    authToken.removeTokenFromLocalStorage();

    navigate("/");
  }

  useEffect(() => {
    if (data) {
      dispatch(loginUser(data.user));
    }
  }, [data, dispatch]);

  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-4">
          <div className="flex items-center gap-12">
            <Link to="/">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">

            {user.role == "student" &&
              <div className="flex gap-x-2">
                <Button asChild variant="default" className=" cursor-pointer">
                  <NavLink to="/me/my-courses">My Courses</NavLink>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="cursor-pointer">Logout</Button>
              </div>
            }

            {user.role == "admin" &&
              <div className="flex gap-x-2">
                <Button asChild variant="default" className=" cursor-pointer">
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="cursor-pointer">Logout</Button>
              </div>
            }


            {user.role == "" &&
              <Button asChild variant="default" className=" cursor-pointer">
                <NavLink to="/login">Login</NavLink>
              </Button>
            }



            <ModeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
