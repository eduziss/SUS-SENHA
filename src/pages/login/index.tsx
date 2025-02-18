import { useState, FormEvent } from "react";
import { auth } from "../../service/firebaseConnection";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  async function handleSingle(event: FormEvent) {
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        toast.success("Logado com sucesso");
      }
    } catch (err) {
      alert("Erro ao fazer login. Verifique seu email ou senha senha.");
      console.error(err);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-gray-300 to-white p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Bem-vindo de volta!
        </h2>
        <form onSubmit={handleSingle}>
          <input
            value={email}
            type="email"
            placeholder="Digite seu email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
          <Link to={"/register"}>Cadastrar</Link>
        </button>
        {error && (
          <p className="text-red-500 text-center mt-2">
            Senha ou e-mail errado
          </p>
        )}
      </div>
    </div>
  );
}
