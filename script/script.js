function apresentar(slideAtual) {
    var slides = document.getElementsByClassName("slide");
    slides[slideAtual - 1].style.display = "none";
    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }
    slides[slideAtual].style.display = "block";
    setTimeout(() => apresentar(slideAtual + 1), 5000);
}