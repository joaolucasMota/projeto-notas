import './register.css'
import register from '../../assets/register.svg'
import { auth } from '../../firebaseConnetion'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from "../../components/Footer"


export default function Register(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
    
        if(email !== '' && password !== ''){
          
          await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            // navegar para /admin
            navigate('/', { replace: true } )
          })
          .catch(() => {
            console.log("ERRO AO FAZER O LOGIN")
          })
    
        }else{
          alert("Preencha todos os campos!")
        }
    
    
      }
    return(
        
        <div>
            <Header/>
            <main className="container col-11 col-md-9" id='form-container'>
                    <div className="row align-items-center gx-5">
                        <div className='col-md-6 order-md-1 text-center'>
                            <h2>Registro</h2>
                            <form onSubmit={handleRegister} >
                                <div className='form-floating mb-3'>
                                    <input 
                                    type='email' 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    placeholder='Digite seu email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value) }
                                    
                                    />
                                    <label type='email' className='forma-label'>Digite seu email</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    
                                    <input 
                                    type='password'
                                    className='form-control' 
                                    id='password' 
                                    name='password' 
                                    placeholder='Digite sua senha'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value) }
                                    />

                                    <label type='password' className='forma-label'>Digite sua senha</label>
                                </div>
                                <input className='btn btn-dark' type='submit' value='Registrar' id='btn-login'/>
                            </form>
                            <div className='col-12 secondary-color' id='link-container'>
                                <Link to="/login">Já possui cadastro? clique aqui</Link>
                            </div>
                        </div>
                        <div className='col-md-6 order-md-2'>
                            <div className='col-12'>
                                <img src={register} className="img-fluid" alt='imagem de registro' id='logo-registro'/>
                            </div>
                        </div>
                    </div>
            </main>
            <Footer/>
        </div>

    
    )
}