import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center w-screen h-screen text-slate-200">
      <h1>Home Page</h1>
      <Link className="rounded-lg bg-teal-600 px-3 py-2 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 max-sm:text-sm" to={"/room"} >Create / Join Room</Link>
    </div>
  );
};

export default Home;
