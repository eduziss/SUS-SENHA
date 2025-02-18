//Link do repositorio:https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md#usecreateuserwithemailandpassword

import { useState, FormEvent } from "react";
import { db, auth } from "../../service/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export function Register() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "" || department === "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Primeiro, cria o usuário no Firebase Authentication
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res || !res.user) {
        alert("Erro ao criar usuário!");
        return;
      }

      // Depois, adiciona os dados ao Firestore
      await addDoc(collection(db, "users"), {
        uid: res.user.uid, // Relacionando com a autenticação
        name,
        email,
        department,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar usuário!");
      console.error(err);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-300 to-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Cadastro
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Departamento</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um departamento</option>
              <option value="admin">Administração</option>
              <option value="medico">Médico</option>
              <option value="enfermeiro">Enfermagem</option>
              <option value="suporte">Suporte</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-2">Erro: {error.message}</p>
        )}
      </div>
    </div>
  );
}
