let campoCidade = document.querySelector("#cidade");


campoCidade.addEventListener("keydown", function (evento) {
    if (evento.key == "Enter") {
       buscarCidades();

    }
});

function buscarCidades(){
    let nome = campoCidade.ariaValue;
}