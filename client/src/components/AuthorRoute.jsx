import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthorRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser.isAuthor ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default AuthorRoute;
