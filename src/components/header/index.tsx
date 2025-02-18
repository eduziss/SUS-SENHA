import { Link, Navigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../service/firebaseConnection";
import { FaUser } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";

export function Header() {
  //signOut é uma função que desloga o usuário
  const [signOut] = useSignOut(auth);
  //user é o usuário logado
  const [user] = useAuthState(auth);

  async function handleSignOut() {
    const success = await signOut();
    if (success) {
      toast.success("Deslogado com sucesso");
      <Toaster position="bottom-center" reverseOrder={false} />;
      return <Navigate to="/login" />;
    }
  }

  //Se o usuário estiver logado, ele verá o botão de sair
  return (
    //mx = margin x, auto = centraliza o conteúdo
    <div className="bg-blue-500">
      <header className=" flex justify-between items-center mx-auto max-w-5xl p-4">
        <Link className="text-3xl font-bold text-slate-50" to={"/"}>
          Sus
        </Link>
        <nav className="space-x-4 text-slate-50 flex">
          <Link to="/">Home</Link>

          {!user && <Link to="/register">Cadastro</Link>}

          {user && (
            <>
              <Link to={`/listEnfermeiros/${user?.uid}`}>
                Lista Enfermeiros
              </Link>
              <Link to={`/alter/${user?.uid}`}>
                <FaUser color="#fff" size={20} />
              </Link>
              <button className="cursor-pointer" onClick={handleSignOut}>
                Sair
              </button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
