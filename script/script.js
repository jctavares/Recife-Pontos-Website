//Função que alterna os temas claro/escuro do site
function trocaTema() {
    var tema = window.localStorage.getItem("tema_site_web");
    if (tema == null) {
        temaEscuro();
        window.localStorage.setItem("tema_site_web", "escuro");
    } else {
        if (tema === "claro") {
            temaEscuro();
            window.localStorage.setItem("tema_site_web", "escuro");
        } else {
            window.localStorage.setItem("tema_site_web", "claro");
            temaClaro();
        }
    }
}

//função que define o css do site para o css de tema escuro
function temaEscuro() {
    var tema = document.getElementById("theme");
    var src = "css/stylesheet_dark.css";
    if (tema.getAttribute('href') === "css/stylesheet.css") {
        tema.setAttribute('href', src);
    } else {
        tema.setAttribute('href', "../" + src);
    }
}

//função que define o css do site para o css de tema claro
function temaClaro() {
    var tema = document.getElementById("theme");
    var src = "css/stylesheet.css";
    if (tema.getAttribute('href') === "css/stylesheet_dark.css") {
        tema.setAttribute('href', src);
    } else {
        tema.setAttribute('href', "../" + src);
    }
}

//função de carregamento padrão das páginas, carregando o tema anteriormente selecionado(armazenado com local storage)
function loadPage() {
    var tema = window.localStorage.getItem("tema_site_web");
    if (tema != null) {
        if (tema == "escuro") {
            temaEscuro();
        }
    }
}

//função que solicita uma piada da api
function geekJoke() {
    fetch('https://geek-jokes.sameerkumar.website/api?format=json')
        .then(res => res.json())
        .then(result => {
            console.log(result)
            document.getElementById('root').innerText = result.joke
        })
        .catch(err => {
            console.log(err)
        })
}

//função que pergunta se o dia selecionado é feriado no brasil. Se for, também informa o nome.
function verFeriado() {
    var check = true;
    var dia = document.getElementById('dia').value;
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
        check = false;
        document.getElementById('resp').innerText = "O mês solicitado possui apenas 30 dias.";
    } else if (mes == 2) {
        if (ano % 400 == 0 || (ano % 4 == 0 && ano % 100 != 0)) {
            if (dia > 29) {
                check = false;
                document.getElementById('resp').innerText = "O mês solicitado possui apenas 29 dias (ano bissexto).";
            }
        } else {
            if (dia > 28) {
                check = false;
                document.getElementById('resp').innerText = "O mês solicitado possui apenas 28 dias.";
            }
        }
    }
    if (check == true) {
        fetch('https://holidays.abstractapi.com/v1/?api_key=d3a10f7af3c64413bdd73b432f70b4be&country=BR&year=' + ano + '&month=' + mes + '&day=' + dia)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result[0] != undefined) {
                    document.getElementById('resp').innerText = dia + "/" + mes + "/" + ano + ", " + result[0].name;
                } else {
                    document.getElementById('resp').innerText = dia + "/" + mes + "/" + ano + ", não é feriado.";
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// função que busca a previsão do tempo dos proximos 5 dias (intervalo de 3h)
function weather() {
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=-8.05793209121678&lon=-34.8833302681417&units=metric&lang=pt", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "854406fd64msh84f08b4d8984c96p195335jsn8d7db3fb2438",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            var tabela = "<table class='table table-hover'><thead><tr><th>Timestamp Local</th><th>Temperatura</th><th>Sensação Térmica</th><th>Descrição</th></thead><tbody>";
            var tag;
            for (var i = 0; i < response.data.length; i++) {
                tag = response.data[i];
                tabela += "<tr><td>" + tag.timestamp_local + "</td><td>" + tag.temp + "</td><td>" + tag.app_temp + "</td><td>" + tag.weather.description + "</td></tr>";
            }
            tabela += "</tbody></table>";
            document.getElementById("root").innerHTML = tabela;
        })
        .catch(err => {
            console.error(err);
        });
}
