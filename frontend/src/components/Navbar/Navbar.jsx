import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../NavItem";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const { isAuth } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <NavItem text="Home" url="/" />

          {isAuth && (
            <>
              <NavItem text="New Article" icon="ion-compose" url="/editor" />
              <DropdownMenu />
            </>
          )}

          {!isAuth && (
            <>
              <NavItem text="Sign in" url="/login" />
              <NavItem text="Sign up" url="/register" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
