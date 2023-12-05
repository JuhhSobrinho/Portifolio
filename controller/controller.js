import { carregarBancoDeDados } from '../model/model.js';

const guias = document.getElementById('guias');

const imgFicha = document.getElementById('img-ficha');
const path = window.location.pathname;

let textGuiaHTML = ''

carregarBancoDeDados()
    .then(bd => {
        // Agora você pode acessar os bd do JSO
        bd.forEach(element => {
            console.log(element);

            textGuiaHTML += `
        <div class="line" id="line-menu"></div>
        <a class="guia" id="${element.id}">
            <img id="${element.nome}" class="icon-guias" src="${element.icon}" alt="guia-meuperfil" />
        </a>`;

        });

        guias.innerHTML = textGuiaHTML;

        const links = guias.querySelectorAll('a.guia');

        links.forEach(link => {
            link.addEventListener('click', function () {
                console.log('teste');
                let sectionImgFicha = '';
                if (link.id === "0") {
                    window.location.href = './index.html';
                }else if (path === "/view/projeto.html") {
                    console.log(path);
                    dados()
                } else {
                    window.location.href = './projeto.html';
                    dados()
                }

function dados() {
    sectionImgFicha = `            
    <section class="sobre-project-img">
    <a href="${bd[link.id].LinkProj}" class="projeto-container">
        <h1 class="nome-project">${bd[link.id].nome}</h1>
            <img class="img-project" id="img-project" src="${bd[link.id].img}" alt="foto-do-projeto">
    </a>
    <h1 class="sobre-project-titulo">Sobre o Projeto</h1>
    <p class="sobre-project-dados">
    ${bd[link.id].sobre}
    </p>
</section>


<div class="ficha-card">
    <h1 class="status">
        status: ${bd[link.id].status}
    </h1>
    <p class="descricao">
    ${bd[link.id].descricao}
    </p>
    <span class="ficha-spans" id="responsividade">Responsivo: ${bd[link.id].responsivo}</span>
    <a href="${bd[link.id].linkCod}">
        <span class="ficha-spans" id="codigoLink">Codigo: ${bd[link.id].linkCodFake}</span>
    </a>
    <a href="${bd[link.id].LinkProj}">
        <span class="ficha-spans" id="projectLink">Project: ${bd[link.id].linkProjFake}</span>
    </a>
</div>`;
            imgFicha.innerHTML = sectionImgFicha;
}



                console.log(`ID do <a> clicado: ${link.id}`);


            });
        });

    })
    .catch(error => {
        // Trata erros que podem ocorrer durante o carregamento
        console.error('Erro ao carregar o banco de bd:', error);
    });


