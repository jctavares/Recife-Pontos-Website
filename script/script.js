function apresentar(slideAtual) {
    var slides = document.getElementsByClassName("banner-slide");
    slides[slideAtual - 1].style.display = "none";
    slideAtual = slideAtual % slides.length;
    slides[slideAtual].style.display = "block";
    setTimeout(() => apresentar(slideAtual + 1), 2000);
}

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

function temaEscuro() {
    var tema = document.getElementById("theme");
    var src = "css/stylesheet_dark.css";
    if (tema.getAttribute('href') === "css/stylesheet.css") {
        tema.setAttribute('href', src);
    } else {
        tema.setAttribute('href', "../" + src);
    }
}

function temaClaro() {
    var tema = document.getElementById("theme");
    var src = "css/stylesheet.css";
    if (tema.getAttribute('href') === "css/stylesheet_dark.css") {
        tema.setAttribute('href', src);
    } else {
        tema.setAttribute('href', "../" + src);
    }
}

function loadPage() {
    //apresentar(1);
    var tema = window.localStorage.getItem("tema_site_web");
    if (tema != null) {
        if (tema == "escuro") {
            temaEscuro();
        }
    }
}

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

function weather(){
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=-34.88409413852257&lat=-8.052483683936776&units=metric&lang=pt", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "854406fd64msh84f08b4d8984c96p195335jsn8d7db3fb2438",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response.get);
        var tabela = "<table><tr><td>Timestamp Local</td><td>Temperatura</td><td>Sensação Térmica</td><td>Descrição</td>";
        var tag;
        for(var i=0; i<response.data.length; i++){
            tag = response.data[i];
            tabela += "<tr><td>"+tag.timestamp_local+"</td><td>"+tag.temp+"</td><td>"+tag.app_temp+"</td><td>"+tag.weather.description+"</td></tr>";
        }
        tabela += "</table>";
        document.getElementById("root").innerHTML = tabela;
    })
    .catch(err => {
        console.error(err);
    });
}

function verFeriado(){
    var check = true;
    var dia = document.getElementById('dia').value;
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    if((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30){
        check = false;
        document.getElementById('resp').innerText = "O mês solicitado possui apenas 30 dias.";
    }else if(mes == 2){
        if(ano % 400 == 0 || (ano % 4 == 0 && ano % 100 != 0)){
            if(dia > 29){
                check = false;
                document.getElementById('resp').innerText = "O mês solicitado possui apenas 29 dias (ano bissexto).";
            }
        }else{
            if(dia > 28){
                check = false;
                document.getElementById('resp').innerText = "O mês solicitado possui apenas 28 dias.";
            }
        }
    }
    if(check == true){
        fetch('https://holidays.abstractapi.com/v1/?api_key=d3a10f7af3c64413bdd73b432f70b4be&country=BR&year='+ano+'&month='+mes+'&day='+dia)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if(result[0] != undefined) {
                    document.getElementById('resp').innerText = dia+"/"+mes+"/"+ano+", "+result[0].name;
                }else {
                    document.getElementById('resp').innerText = dia+"/"+mes+"/"+ano+", não é feriado.";
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}
