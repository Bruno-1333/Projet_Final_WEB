/*
 Partie 2 de la démo :
 - Modifier get par post - on ne peut plus envoyer les données par l'URL
 - Envoyer les données du formulaire dans le stockage local
 - On peut seulement stocker des chaînes de caractères dans le stockage local :
    on doit transformer les objets en chaîne de caractères - JSON.stringify
 */

/**
 * Représente une personne qui fait un don
 * @param nom de la personne (string)
 * @param don qu'effectue la personne (int)
 * @constructor
 */
function Personne(nom = "Line", don = 1){
    this.nom =nom;
    this.don = don;
}

/**
 * Prend les données du formulaire
 * Crée un objet
 * Le stocke dans le stockage local
 */
function stockage(){
    //Aller chercher les données
    const nom = $('#nom').val();
    const don = $('#don').val();
    //Créer un objet
    const personne = new Personne(nom, don);
    //Stocker l'objet dans le stockage local
    localStorage.setItem('personne', JSON.stringify(personne));
    return true;
}
// Função para validar o login
function validarLogin() {
    var login = $("#login").val();
    var senha = $("#senha").val();
    // Validar o login e senha aqui
    if (login === "usuario" && senha === "123") {
        return true;
    } else {
        $("#erroConectar").show();
        return false;
    }
}

// Função para limpar os campos do modal cadastrar
function limparCampos() {
    $("#formCadastrar")[0].reset();
    $("#erroCadastrar").hide();
}

// Função para validar a senha no modal cadastrar
function validarSenha() {
    var senha = $("#senhaCad").val();
    var confSenha = $("#confSenha").val();
    if (senha !== confSenha) {
        $("#erroCadastrar").html("As senhas não coincidem").show();
        return false;
    } else {
        // Validar a senha aqui (por exemplo, com regex)
        return true;
    }
}

// Função para cadastrar o usuário
function cadastrarUsuario() {
// Fazer a requisição AJAX para salvar o usuário com o MockAPI
// Exemplo:
    $.ajax({
        url: 'https://641b4a099b82ded29d4f0dfe.mockapi.io/Users',
        method: "POST",
        data: {
            nome: $("#nome").val,
            sobrenome: $("#sobrenome").val(),
            telefone: $("#telefone").val(),
            email: $("#email").val(),
            usuario: $("#usuario").val(),
            senha: $("#senhaCad").val()
        },
        success: function(data) {
            console.log(data);
            limparCampos();
            alert("Usuário cadastrado com sucesso!");
            $("#cadastrarModal").modal("hide");
        },
        error: function(error) {
            console.log(error);
            $("#erroCadastrar").html("Erro ao cadastrar o usuário").show();
        }
    });
}
$(document).ready(function() {
    // Evento de clique do botão conectar
    $("#btnConectar").click(function() {
        if (validarLogin()) {
            window.location.href = "index.html";
        }
    });

    // Evento de clique do botão cadastrar
    $("#btnCadastrar").click(function() {
        if (validarSenha()) {
            cadastrarUsuario();
        }
    });

    // Evento de clique do botão anular no modal cadastrar
    $("#cadastrarModal").on("hidden.bs.modal", function () {
        limparCampos();
    });
});