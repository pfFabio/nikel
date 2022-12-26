const mymodal = new bootstrap.Modal("#Register-Modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;


    const account = getaccount(nome);

    if(!account){
        alert("verifique o usuario e senha");
        return;
    }

    savesession(nome, session)



    window.location.href = "home.html";

});



//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){

    const nome = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;

    if(nome.length < 5) {
        alert("email muito curto");
        return;
    }
    if(senha.length < 4){
        alert("senha muito curta");
        return;
    }

    saveaccount({
        login: nome,
        senha:  senha,
        transactions:[]

    });
    
    mymodal.hide();

    alert("conta criada com sucesso");

});

function saveaccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getaccount(key){
    const account = localStorage.getItem(key);
    if(account){
        return JSON.parse(account);
    }
    return "";

}

function savesession(data, savesession){
    if(savesession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function checklogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        savesession(logged, session);

        window.location.href = "home.html"; 
    }

}