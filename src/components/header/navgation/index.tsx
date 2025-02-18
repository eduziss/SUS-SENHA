import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

export function Navigate() {
  return (
    <div className="bg-blue-500">
      <header className=" flex justify-between items-center mx-auto max-w-5xl p-4">
        <Link className="text-3xl font-bold text-slate-50" to={"/"}>
          <FaArrowLeft size={30} color="#fff" />
        </Link>
        <nav className="space-x-4 text-slate-50 flex">
          <Link to="/">Home</Link>
        </nav>
      </header>
    </div>
  );
}
