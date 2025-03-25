// Captura do elemento de input

const numberCharacter = document.getElementById("character");

// Atualiza a contagem de caracteres na tela

const updateCharacterCount = () => {
    const spanCharacter = document.querySelector(".span-character");
    spanCharacter.innerHTML = numberCharacter.value;
};

numberCharacter.addEventListener("input", updateCharacterCount);

// Obtém os tipos de caracteres selecionados

const getCharTypes = () => {
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const specialCharacter = document.getElementById('special-character').checked;

    let charTypes = [];

    if (uppercase) charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (lowercase) charTypes.push('abcdefghijklmnopqrstuvwxyz');
    if (numbers) charTypes.push('0123456789');
    if (specialCharacter) charTypes.push('!@#$%&*()-_=+/?:;~^|{}[]');

    return charTypes;
};

// Obtém o tamanho da senha

const getPasswordSize = () => {
    return parseInt(numberCharacter.value)
};

// Geração da senha

const generatePassword = () => {
    const charTypes = getCharTypes();
    const passwordSize = getPasswordSize();
    
    if (!charTypes.length) {
        alert("Selecione pelo menos um tipo de caractere!");
        return;
    }
    
    let passwordArray = [];
    let allChars = charTypes.join("");
    
    // Garante que tenha pelo menos um caractere de cada tipo selecionado
    charTypes.forEach(type => {
        passwordArray.push(type[Math.floor(Math.random() * type.length)]);
    });
    
    // Preenche o restante da senha aleatoriamente
    while (passwordArray.length < passwordSize) {
        passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
    
    // Embaralha os caracteres da senha
    passwordArray = passwordArray.sort(() => Math.random() - 0.5);
    
    document.getElementById("password-output").textContent = passwordArray.join("");
};


// Copia a senha
const copyPassword = () => {
    const passwordOutput = document.getElementById("password-output").textContent;

    if (!passwordOutput) {
        alert("Nenhuma senha para copiar!");
        return;
    }

    navigator.clipboard.writeText(passwordOutput).then(() => {
        alert("Senha copiada para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar senha:", err);
    });
};


document.getElementById('generate-password').addEventListener('click', generatePassword);

document.getElementById('copy-password').addEventListener('click', copyPassword);