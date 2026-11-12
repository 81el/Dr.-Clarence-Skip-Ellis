document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");
    const toggleLink = document.getElementById("toggleLink");
    const toggleText = document.getElementById("toggleText");

    let isRegisterMode = false;

    // Ajuste o caminho base conforme o @RequestMapping do seu Controller de Usuário
    const API_BASE_URL = "http://localhost:8080/usuario";

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

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        // Define a rota com base no modo atual (ajuste para o nome exato do seu @PostMapping)
        const endpoint = isRegisterMode ? `${API_BASE_URL}/cadastrar` : `${API_BASE_URL}/login`;

        // Prepara os dados no formato que o @RequestParam do Spring exige
        const formData = new URLSearchParams();
        formData.append("username", user); // O nome "username" deve bater com o parâmetro no Java
        formData.append("password", pass); // O nome "password" deve bater com o parâmetro no Java

        try {
            submitBtn.disabled = true;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            });

            // Como seus métodos retornam ResponseEntity<String>, lemos a resposta com .text()
            const mensagemServidor = await response.text();

            if (response.ok) {
                alert(mensagemServidor);

                if (isRegisterMode) {
                    // Volta para a tela de login após cadastrar
                    toggleLink.click();
                } else {
                    // Redireciona para a página principal da biografia após logar
                    window.location.href = "index.html";
                }
            } else {
                alert(`Erro: ${mensagemServidor || "Falha na autenticação."}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor. Verifique se o Spring Boot está rodando.");
        } finally {
            submitBtn.disabled = false;
        }
    });
});
