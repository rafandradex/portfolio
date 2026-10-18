// 25 de julho de 2021 10:18
// 27 de junho de 2021 06:09

const html = document.querySelector('html')
const portfolio_cards = document.querySelector('.portfolio_cards')
const navbar = document.getElementById('navbar')
const portfolio = [
    {
        titulo: "Espaço Climatização",
        categoria: "Website empresarial",
        texto: "Website desenvolvido para uma empresa de instalação, manutenção e higienização de sistemas de climatização.",
        objetivo: "Apresentar os serviços da empresa e facilitar o acesso à informação e aos contactos.",
        contributo: "Desenvolvimento do website e organização do conteúdo sobre a empresa e os seus serviços.",
        img: "img/espacoclimatizacao.png",
        site: "https://espacoclimatizacao.com/",
        destaque: true,
    },
    {
        titulo: "Glitch Arena",
        categoria: "Comunidade de esports",
        texto: "Website de uma comunidade de torneios de jogos, criado para apresentar a marca e divulgar as competições.",
        objetivo: "Ajudar os visitantes a descobrir torneios e a participar na comunidade.",
        contributo: "Desenvolvimento do website e apresentação da comunidade e dos torneios.",
        img: "img/glitcharena.png",
        site: "https://glitcharenaofficial.netlify.app/",
        destaque: true,
    },
    {
        titulo: "Seniores Online",
        categoria: "Projeto social",
        texto: "Website de um projeto dedicado a promover atividades e novas dinâmicas para seniores em lares.",
        objetivo: "Dar a conhecer o projeto e a sua proposta de atividades para os seniores.",
        contributo: "Desenvolvimento do website e apresentação da informação do projeto.",
        img: "img/Capture.PNG",
        site: "https://senioresonline.netlify.app/",
        destaque: true,
    },
    {
        titulo: "Meu Perfil",
        categoria: "Primeiro site publicado",
        texto: "Uma das primeiras etapas do meu percurso no desenvolvimento web: criar e publicar uma página de apresentação pessoal.",
        img: "img/meuperfil.PNG",
        site: "https://rafandradex.github.io/meuperfil/",
        destaque: false,
    },
    {
        titulo: "Primeiro Portfólio",
        categoria: "Exploração e aprendizagem",
        texto: "Uma versão anterior do meu portfólio, que representa os meus primeiros passos na organização e apresentação de projetos.",
        img: "img/portfolio.PNG",
        site: "https://rafandradex.github.io/portefolio/",
        destaque: false,
    },
]
const botaoMenu = document.querySelector(".open_menu")
const botaoTema = document.querySelector(".tema_site")
const vistaMobile = window.matchMedia("(width < 768px)")

function definirMenu(aberto) {
    navbar.classList.toggle("hidden_menu", !aberto)

    botaoMenu.setAttribute("aria-expanded", String(aberto))
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    )

    botaoMenu.innerHTML = `
        <i
            class="bi ${aberto ? "bi-x-lg" : "bi-list"}"
            aria-hidden="true"
        ></i>
    `
}

botaoMenu.addEventListener("click", () => {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true"
    definirMenu(!aberto)
})

navbar.addEventListener("click", (evento) => {
    if (vistaMobile.matches && evento.target.closest("a")) {
        definirMenu(false)
    }
})

document.addEventListener("keydown", (evento) => {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true"

    if (evento.key === "Escape" && vistaMobile.matches && aberto) {
        definirMenu(false)
        botaoMenu.focus()
    }
})

document.addEventListener("click", (evento) => {
    if (
        vistaMobile.matches &&
        !navbar.contains(evento.target) &&
        !botaoMenu.contains(evento.target)
    ) {
        definirMenu(false)
    }
})

vistaMobile.addEventListener("change", () => {
    definirMenu(false)
})

function atualizarBotaoTema() {
    const temaClaro = html.classList.contains("light-theme")

    botaoTema.setAttribute(
        "aria-label",
        temaClaro ? "Ativar tema escuro" : "Ativar tema claro"
    )

    botaoTema.innerHTML = `
        <i
            class="bi ${temaClaro
            ? "bi-moon-stars"
            : "bi-brightness-high-fill"
        }"
            aria-hidden="true"
        ></i>
    `
}

botaoTema.addEventListener("click", () => {
    const temaClaro = html.classList.toggle("light-theme")
    const tema = temaClaro ? "light" : "dark"

    html.style.colorScheme = tema

    try {
        localStorage.setItem("tema", tema)
    } catch {
        // A alteração do tema funciona mesmo sem guardar a preferência.
    }

    atualizarBotaoTema()
})

definirMenu(false)
atualizarBotaoTema()

function criarCardProjeto(projeto) {
    return `
        <article class="projeto_card">
            <div class="projeto_imagem">
                <img
                    src="${projeto.img}"
                    alt="Pré-visualização do website ${projeto.titulo}"
                    loading="lazy"
                    decoding="async"
                >
            </div>

            <div class="projeto_conteudo">
                <span class="projeto_categoria">
                    ${projeto.categoria}
                </span>

                <h3>${projeto.titulo}</h3>

                <p class="projeto_descricao">${projeto.texto}</p>

                ${projeto.destaque
            ? `
                            <dl class="projeto_detalhes">
                                <div>
                                    <dt>Objetivo</dt>
                                    <dd>${projeto.objetivo}</dd>
                                </div>

                                <div>
                                    <dt>O meu contributo</dt>
                                    <dd>${projeto.contributo}</dd>
                                </div>
                            </dl>
                        `
            : ""
        }

                <a
                    href="${projeto.site}"
                    class="projeto_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visitar ${projeto.titulo} (abre num novo separador)"
                >
                    Visitar site
                    <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
                </a>
            </div>
        </article>
    `
}

const projetosDestaque = portfolio.filter(projeto => projeto.destaque)
const primeirosProjetos = portfolio.filter(projeto => !projeto.destaque)

if (portfolio.length > 0) {
    portfolio_cards.innerHTML = `
        ${projetosDestaque.length > 0
            ? `
                    <div class="projetos_grelha">
                        ${projetosDestaque.map(criarCardProjeto).join("")}
                    </div>
                `
            : ""
        }

        ${primeirosProjetos.length > 0
            ? `
                    <div class="projetos_percurso">
                        <h3>Onde tudo começou</h3>

                        <p class="projetos_intro">
                            Os meus primeiros projetos publicados.
                            Um registo da minha aprendizagem e evolução.
                        </p>

                        <div class="projetos_grelha projetos_grelha_arquivo">
                            ${primeirosProjetos.map(criarCardProjeto).join("")}
                        </div>
                    </div>
                `
            : ""
        }
    `
} else {
    portfolio_cards.textContent = "Ainda não existem projetos disponíveis."
}


function numeroDeProj() {
    const numeroDeProjetos = document.getElementById('numeroDeProjetos')
    const projetos = portfolio.length

    const duracao = 750

    let inicio = 0
    const incremento = 1;
    const intervaloDeTempo = duracao / projetos

    const timer = setInterval(() => {
        inicio += incremento

        if (inicio >= projetos) {
            numeroDeProjetos.textContent = projetos
            clearInterval(timer)
        } else {
            numeroDeProjetos.textContent = Math.floor(inicio)
        }
    }, intervaloDeTempo)
}

function numeroDeAnosEx() {
    const numeroDeAnos = document.getElementById('numeroDeAnos')
    const dataAtual = new Date().getFullYear()
    const dataQueComecei = 2021
    const anosDeExperiencia = dataAtual - dataQueComecei
    const duracao = 750

    let inicio = 0
    const incremento = 1;
    const intervaloDeTempo = duracao / anosDeExperiencia;
    const timer = setInterval(() => {
        inicio += incremento

        if (inicio >= anosDeExperiencia) {
            numeroDeAnos.textContent = anosDeExperiencia
            clearInterval(timer)
        } else {
            numeroDeAnos.textContent = Math.floor(inicio)
        }
    }, intervaloDeTempo)
}




const scrollSiteNumber = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
}

const obverver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            numeroDeAnosEx()
            numeroDeProj()
            observer.unobserve(entry.target)
        }
    })
}, scrollSiteNumber)

const estatistica_lista = document.querySelector('.estatistica_lista')
obverver.observe(estatistica_lista)
