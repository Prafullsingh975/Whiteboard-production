import { Link, useNavigate } from "react-router-dom";
import Timer from "./Clock";
import { userState } from "../context/UserContext";

const HomeNav = () => {
  const { user, setUser } = userState();

  const handleLogout = async () => {
    if (user.googleId) {
      window.open("https://whiteboard-production.onrender.com/api/whiteboard/auth/logout", "_self");
    }
    sessionStorage.clear("u");
    setUser(null);
  };

  return (
    <>
      <nav className="fixed flex w-full items-center justify-between border-b-2 border-teal-700 bg-slate-900 px-8 py-3 text-white shadow-sm max-sm:px-3">
        <div className="text-xl font-bold max-sm:text-base">
          <Link to={"/"}>
            <h2>Real Time White Board</h2>
          </Link>
        </div>
        {!user?._id && (
          <li className="flex list-none items-center gap-5 font-normal">
            <ul>
              <Link
                to={"/signup"}
                className="rounded-lg bg-teal-600 px-2 py-2 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 max-sm:text-sm"
              >
                Sign Up
              </Link>
            </ul>
            <ul>
              <Link
                to={"/signin"}
                className="rounded-lg bg-teal-600 px-3 py-2 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 max-sm:text-sm"
              >
                Sign In
              </Link>
            </ul>
          </li>
        )}
        {/* SHOW WHEN USER IS LOGIN */}
        {user?._id && (
          <div className="flex list-none items-center gap-5 font-normal">
            <Timer />
            <h4>{user.displayName}</h4>
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <img
                className="object-cover"
                src={
                  user?.dp
                    ? user?.dp
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1704457550~exp=1704458150~hmac=0ff63ef05b7947e2d956bb8bd374cfda65a529d2c7926334e50806ffd6d0c514"
                }
                alt=""
              />
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-teal-600 px-3 py-2 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 max-sm:text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default HomeNav;
