document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");
    const toggleLink = document.getElementById("toggleLink");
    const toggleText = document.getElementById("toggleText");

    let isRegisterMode = false;

    toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;

        if (isRegisterMode) {
            formTitle.textContent = "Crie sua Conta";
            submitBtn.textContent = "Cadastrar";
            toggleText.textContent = "Já tem uma conta?";
            toggleLink.textContent = " Faça Login";
        } else {
            formTitle.textContent = "Acesse o Sistema";
            submitBtn.textContent = "Entrar";
            toggleText.textContent = "Não tem uma conta?";
            toggleLink.textContent = " Cadastre-se";
        }
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        if (isRegisterMode) {
            alert(`Simulação: Usuário [${user}] cadastrado com sucesso! (Falta integrar com o Spring)`);
        } else {
            alert(`Simulação: Tentando logar com o usuário [${user}]... (Falta integrar com o Spring)`);
        }
    });
});
