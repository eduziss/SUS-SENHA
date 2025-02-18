import { useState, FormEvent, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../service/firebaseConnection";
import { useParams } from "react-router-dom";

export function UpdateUser() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  //const [password, setPassword] = useState("");

  console.log("ID recebido:", id);

  useEffect(() => {
    async function fetchUserData() {
      if (!id) return;
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setEmail(userData.email || "");
          setName(userData.name || "");
        } else {
          alert("Usuário não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUserData();
  }, [id]);

  // Atualizar os dados do usuário
  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    if (!id) {
      alert("Usuário não encontrado!");
      return;
    }

    try {
      const userDoc = doc(db, "users", id);
      // Atualizar os dados, mas sem a senha
      await updateDoc(userDoc, {
        email: email,
        name: name,
        // Não atualizamos a senha no Firestore
      });

      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar usuário.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-96 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Atualizar Dados</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            className="p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome"
            className="p-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Senha"
            className="p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
