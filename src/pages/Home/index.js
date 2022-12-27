import "./home.css";
import { useState, useEffect } from "react";
import {auth, db} from "../../firebaseConnetion"
import { signOut } from "firebase/auth";
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
  } from 'firebase/firestore'
import { async } from "@firebase/util";





export default function Home(){

    const [nota, setNota] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})


    const [notas, setNotas] = useState([])


    useEffect(()=>{
        async function loadNotas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                
                const notaRef = collection(db, "notas")
                const q = query(notaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        
                const unsub = onSnapshot(q, (snapshot) => {
                  let lista = [];
        
                  snapshot.forEach((doc)=> {
                    lista.push({
                      id: doc.id,
                      nota: doc.data().nota,
                      userUid: doc.data().userUid
                    })
                  })
                  
                  setNotas(lista);
        
        
                })
        
              }
        }

        loadNotas();
    },[])


    async function handleRegister(e){
        e.preventDefault(e)

        if(nota === ''){
            alert('Digite uma nota!')
            return;
        }
        if(edit?.id){
            handleUpdateNota();
            return;
        }

        await addDoc(collection(db, "notas"), {
            nota: nota,
            created: new Date(),
            userUid: user?.uid
          })
          .then(() => {
            console.log("NOTA REGISTRADA")
            setNota('')
          })
          .catch((error) => {
            console.log("ERRO AO REGISTRAR " + error)
          })
    }

    async function handleLogout(){
        await signOut(auth);
    }

    async function deleteNota(id){
        const docRef = doc(db, "notas", id)
        await deleteDoc(docRef)
    }
    
    function editNota(item){
        setNota(item.nota)
        setEdit(item);
    }
    
    
    async function handleUpdateNota(){
        const docRef = doc(db, "notas", edit?.id)
        await updateDoc(docRef, {
        nota: nota
        })
        .then(() => {
        console.log("NOTA ATUALIZADA")
        setNota('')
        setEdit({})
        })
        .catch(() => {
        console.log("ERRO AO ATUALIZAR")
        setNota('')
        setEdit({})
        })
    }

    

    return(
        <main>
            <div className="container col-12 col-md-6">
                <div className="row align-items-center justify-content-center">
                    <div className='text-center' id="text-center-home">
                        <h1>Notas</h1>
                        <form onSubmit={handleRegister} >
                                <div className='form-floating'>
                                    <textarea
                                    rows="3"
                                    type='text'
                                    className='form-contro-lg-dark'
                                    id='content'
                                    name='content'
                                    value={nota}
                                    onChange={(e) => setNota(e.target.value) }
                                    />
                                </div>
                                {Object.keys(edit).length > 0 ? (
                                <input className='btn-sm btn-dark' type="submit" value="Atualizar"/>
                                ) : (
                                <input className='btn-sm btn-dark' type="submit" value="Salvar"/>
                                )}
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row text-center">
                    {notas.map((item)=>(
                        <div className="col-12" key={item.id}>
                            <article>
                                <p className="h5">{item.nota}</p>
                            </article>
                            <div>
                                <button onClick={ () => editNota(item) } className='btn-sm btn-dark btn-home'>Editar</button>
                                <button onClick={ () => deleteNota(item.id) } className='btn-sm btn-dark btn-home'>Deletar</button>
                            </div>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={handleLogout} className='btn-sm btn-dark btn-home' id="btn-sair" >Sair</button>
            </div>
        </main>
        
    )
}