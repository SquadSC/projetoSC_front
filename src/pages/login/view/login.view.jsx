    import { useState } from "react"


    export function LoginView () {

        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");


          const handleSubmit = (e) => {
            e.preventDefault();

            console.log("Login enviado:", { email, senha });

            setEmail("");
            setSenha("");
        };

        
        return (
            <>
                <div>
                    <img src="" alt="" />
                    <h1>Bem-vindo à Elê Doces!</h1>
                    <h3>Peças seus doces de forma rápida, prática e com todo o carinho de sempre.</h3>
                </div>
                <div className="linha">
                </div>
                <h1>Que Bom te ver de novo!</h1>
                <h3>Entre e continue adoçando seus dias com a gente</h3>

                <label>Email</label>
                <br />
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Senha</label>
                <input 
                type="password" 
                value = {senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </>
        )
    }