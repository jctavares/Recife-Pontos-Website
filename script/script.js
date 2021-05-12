function apresentar(slideAtual) {
    var slides = document.getElementsByClassName("banner-slide");
    slides[slideAtual - 1].style.display = "none";
    slideAtual = slideAtual % slides.length;
    slides[slideAtual].style.display = "block";
    setTimeout(() => apresentar(slideAtual + 1), 2000);
}
