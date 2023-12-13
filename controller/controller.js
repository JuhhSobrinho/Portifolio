import { carregarBancoDeDados } from '../model/model.js';
import { seTLocarStorage, geTLocalStorage } from "../model/model.js";

const guias = document.getElementById('guias');

const imgFicha = document.getElementById('img-ficha');
const path = window.location.pathname;

console.log(path);

let textGuiaHTML = '';

let sectionImgFicha = '';

carregarBancoDeDados()
    .then(bd => {
        // Agora você pode acessar os bd do JSO


        function saturacion(status) {

            let styleSatu = '';
            if (status === "Em desenvolvimento") {
                styleSatu = "filter: saturate(0);"
            } else {
                styleSatu = "filter: saturate(1);"
            }

            return styleSatu;
        }




        function dados() {
            sectionImgFicha = `            
            <section class="sobre-project-img">
                <a href="${bd[geTLocalStorage("AtualGuia")].linkProj}" class="projeto-container" style="${saturacion(bd[geTLocalStorage("AtualGuia")].status)}">
                    <h1 class="nome-project">${bd[geTLocalStorage("AtualGuia")].nome}</h1>
                    <img  class="img-project" id="img-project" src="${bd[geTLocalStorage("AtualGuia")].img}" alt="foto-do-projeto-${bd[geTLocalStorage("AtualGuia")].nome}">
                </a>
                <h1 class="sobre-project-titulo">Sobre o Projeto</h1>
                <p class="sobre-project-dados">
                    ${bd[geTLocalStorage("AtualGuia")].sobre}
                </p>
            </section>


            <div class="ficha-card">
                <h1 class="status">
                    status: ${bd[geTLocalStorage("AtualGuia")].status}
                </h1>
                <p class="descricao">
                    ${bd[geTLocalStorage("AtualGuia")].descricao}
                </p>
                <span class="ficha-spans" id="responsividade">Responsivo: ${bd[geTLocalStorage("AtualGuia")].responsivo}</span>
                <a href="${bd[geTLocalStorage("AtualGuia")].linkCod}">
                    <span class="ficha-spans" id="codigoLink">Codigo: ${bd[geTLocalStorage("AtualGuia")].linkCodFake}</span>
                </a>
                <a href="${bd[geTLocalStorage("AtualGuia")].linkProj}">
                    <span class="ficha-spans" id="projectLink">Project: ${bd[geTLocalStorage("AtualGuia")].linkProjFake}</span>
                </a>
            </div>`;
            imgFicha.innerHTML = sectionImgFicha;
        }

        if (path === "/view/projeto.html" || path === "/Portfolio/view/projeto.html") {
            dados();
        } else {
            main();
        }





        bd.forEach(element => {
            console.log(element);

            textGuiaHTML += `
        <div class="line" id="line-menu"></div>
        <a class="guia" id="${element.id}">
            <img id="${element.nome}" class="icon-guias" src="${element.icon}" style="${saturacion(element.status)}" alt="guia-${element.nome}" />
        </a>`;

        });
        guias.innerHTML = textGuiaHTML;





        const links = guias.querySelectorAll('a.guia');

        links.forEach(link => {
            link.addEventListener('click', function () {
                seTLocarStorage("AtualGuia", link.id);
                console.log(geTLocalStorage("AtualGuia"));


                if (link.id === "0") {
                    window.location.href = './index.html';
                } else {
                    window.location.href = './projeto.html'; // Tempo de espera em milissegundos (pode ajustar conforme necessário)
                }
            });
        });




    })
    .catch(error => {
        // Trata erros que podem ocorrer durante o carregamento
        console.error('Erro ao carregar o banco de bd:', error);
    });
console.log(geTLocalStorage("AtualGuia"));




// Inicializar o Email.js fora do evento de clique
emailjs.init("NSP0Hhxyw2c7dRuK3");

const btn = document.getElementById('btnEnviar');

btn.addEventListener('click', () => {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("msg").value;

    const templateParams = {
        to_email: "juliano.sobrinhojunior@gmail.com",
        subject: nome,
        mensagem: `Nome: ${nome}\nE-mail: ${email}\n \nMensagem:\n ${mensagem}`,
    };

    emailjs.send("service_q34eppz", "template_l8pven8", templateParams)
        .then((response) => {
            console.log("E-mail enviado com sucesso:", response);
            alert("E-mail enviado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao enviar o e-mail:", error);
            alert("Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.");
        });
});




function main() {
    var helloWorld = document.getElementById('helloWorld');
    let olamundo = 'Hello World';
    let test = 'O Portfólio';

    let textArray = helloWorld.textContent.split('');

    function trocarLetras(index, textoAlvo) {
        setTimeout(function () {
            textArray[index] = textoAlvo[index];
            helloWorld.innerHTML = textArray.join('');

            if (index < textArray.length - 1) {
                trocarLetras(index + 1, textoAlvo);
            } else {
                // Após formar a palavra alvo, aguarde por um segundo antes de trocar para 'Hello World'
                setTimeout(function () {
                    trocarLetras(0, olamundo);
                }, 200);
            }
        }, 120); // Ajuste o tempo conforme necessário
    }

    trocarLetras(0, test);

}
