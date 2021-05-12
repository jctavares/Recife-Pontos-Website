function apresentar(slideAtual) {
    var slides = document.getElementsByClassName("banner-slide");
    slides[slideAtual - 1].style.display = "none";
    slideAtual = slideAtual % slides.length;
    slides[slideAtual].style.display = "block";
    setTimeout(() => apresentar(slideAtual + 1), 2000);
}

function trocaTema(){
    var tema = window.localStorage.getItem("tema_site_web");
    if(tema == null){
        temaEscuro();
    }else{
        if(tema === "claro"){
            temaEscuro();
            window.localStorage.setItem("tema_site_web", "escuro");
        }else{
            window.localStorage.setItem("tema_site_web", "claro");
            temaClaro();
        }
    }
}

function temaEscuro(){
    var tema = document.getElementById("theme");
    var src = "css/stylesheet_dark.css";
    if(tema.getAttribute('href') === "css/stylesheet.css"){
        tema.setAttribute('href', src);
    }else{
        tema.setAttribute('href', "../"+src);
    }
}

function temaClaro(){
    var tema = document.getElementById("theme");
    var src = "css/stylesheet.css";
    if(tema.getAttribute('href') === "css/stylesheet_dark.css"){
        tema.setAttribute('href', src);
    }else{
        tema.setAttribute('href', "../"+src);
    }
}

function loadPage(){
    //apresentar(1);
    var tema = window.localStorage.getItem("tema_site_web");
    if(tema != null){
        if(tema == "escuro"){
            temaEscuro();
        }
    }
}
