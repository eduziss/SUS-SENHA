import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { db, auth } from "../../service/firebaseConnection";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";

interface User {
  id: string;
  name: string;
  email: string;
  departamento: string;
}

export function ListeEnefermeiros() {
  const { uid } = useParams(); // Pega o id da URL
  const [users, setUsers] = useState<User[]>([]);
  const [user] = useAuthState(auth); // Obtém o usuário autenticado
  const [redirectToHome, setRedirectToHome] = useState(false); // Estado para redirecionar
  const [signOut] = useSignOut(auth);

  async function handleDeleteUser(id: string) {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      toast.success("Usuário deletado com sucesso");
      await signOut();

      // Se o usuário deletou a própria conta, ativa o redirecionamento
      if (user?.uid === uid) {
        toast("Você excluiu sua própria conta. Redirecionando...");
        await signOut();
        setRedirectToHome(true);
      }

      // Atualizar a lista após deletar
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário.");
    }
  }

  useEffect(() => {
    async function listUsers() {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        departamento: doc.data().department,
      }));
      setUsers(usersList);
    }
    listUsers();
  }, []);

  // Se precisar redirecionar, retorna o Navigate
  if (redirectToHome) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">
        Resultados
      </h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Departamento</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id} className="text-center items-center">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.departamento}
              </td>
              <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                <FaTrash
                  onClick={() => handleDeleteUser(item.id)}
                  color="red"
                  size={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
