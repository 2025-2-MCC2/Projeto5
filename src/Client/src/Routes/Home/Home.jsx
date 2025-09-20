import "./Home.css"
import homeAnimation from "../../assets/homeAnimation.svg"
import HeaderComponent from "../../Components/Header/Header";

function Home() {
   
    return (
        <>
            <HeaderComponent />
            
            <main className="main-home">
               
                <div className="container-home">
                    <h1>Seja Bem-Vindo ao <h1 className="leadTitle">L.E.A.D</h1></h1>
                    <p>O painel admnistrativo L.E.A.D é uma aplicação web desenvolvida por alunos de Ciência da Computação da FECAP como Projeto 
                    Interdisciplinar para a organização Lideranças Empáticas. Nossa aplicação web tem como objetivo auxiliar os alunos e professores
                    a acompanhar o cadastro de arrecadações e doações.</p>

                    <button className="meus-projetosBtn">
                        Meus projetos
                    </button>

                </div>
                        <img src={homeAnimation} alt="" className="homeImage"/>
                
            </main>
        </>

    );
}

export default Home