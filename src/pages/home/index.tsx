import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../service/firebaseConnection";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebaseConnection";
import toast from "react-hot-toast";

interface Local {
  nome: string;
  senha: string;
  department: string;
}

export function Home() {
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [local, setLocal] = useState<Local[]>([]);

  //Verifica se o usuário está logado
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading === false && !user) {
    return <p>Vai fazer login zé</p>;
  }
  //Fim da verificação
  const [nomeU, setNomeU] = useState("");
  console.log(user);
  //Carrega as senhas do banco de dados
  useEffect(() => {
    async function loadPasswords() {
      const querySnapshot = await getDocs(collection(db, "senhas"));
      const senhaLista = querySnapshot.docs.map((doc) => ({
        nome: doc.data().nome,
        senha: doc.data().senha,
        department: doc.data().department,
      }));
      //Adiciona as senhas no estado local
      setLocal(senhaLista);
    }
    loadPasswords();
  }, []);
  //Fim do useEffect

  function handleAdd(password: string) {
    //Para adicionar mais de um item em um array:
    const infos = {
      nome: nomeU,
      senha: password,
      department: department,
    };
    //Adiciona o novo item no array
    setLocal((prev) => [...prev, infos]);
  }

  //Função para gerar a senha e adicionar no banco de dados
  function handlePassword() {
    if (nomeU === "") {
      return alert("Digite seu nome");
    }
    const password = Math.random().toString(36).slice(-8);
    setPassword(password);
    handleAdd(password);

    addDoc(collection(db, "senhas"), {
      nome: nomeU,
      senha: password,
      department: department,
    })
      .then(() => {
        toast.success("Senha adicionada no painel com sucesso");

        setNomeU("");
      })
      .catch((error) => {
        alert("Erro ao gerar senha");
        console.log(error);
      });
  }
  //Fim da função handlePassword

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-gray-300 to-white p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Gerar Senha
        </h2>
        <input
          onChange={(e) => setNomeU(e.target.value)}
          value={nomeU}
          type="text"
          placeholder="Digite seu nome"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um tipo de senha</option>
          <option value="preferencial">Preferencial</option>
          <option value="publico">Publico</option>
          <option value="normal">Normal</option>
        </select>
        <button
          onClick={handlePassword}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600 transition"
        >
          Gerar senha
        </button>
      </div>

      <div className="mt-6 w-full max-w-xl">
        <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">
          Resultados
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nome</th>
              <th className="border border-gray-300 px-4 py-2">Senha</th>
              <th className="border border-gray-300 px-4 py-2">
                Tipo de Senha
              </th>
            </tr>
          </thead>
          <tbody>
            {local.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {item.nome}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.senha}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
