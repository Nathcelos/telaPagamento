// Localiza o campo onde o usuário informa o valor da compra
const campoValor = document.getElementById("valor");

// Localiza o botão que confirma os dados da compra
const botaoInformar = document.getElementById("informar-dados");

// Localiza a opção de pagamento Pix
const opcaoPix = document.getElementById("pix");

// Localiza a opção de pagamento Cartão de Crédito
const opcaoCartao = document.getElementById("cartao");

// Localiza o painel do Pix
const painelPix = document.getElementById("painel-pix");

// Localiza o painel do Cartão de Crédito
const painelCartao = document.getElementById("painel-cartao");

// Localiza o elemento que exibe o total da compra
const campoTotal = document.getElementById("total");

// Localiza a lista de opções de parcelas do cartão
const campoParcelas = document.getElementById("parcelas");

// Localiza o campo do número do cartão
const campoNumeroCartao = document.getElementById("numero-cartao");

// Localiza a área que mostrará o ícone do cartão
const mensagemCartao = document.getElementById("mensagem-cartao");

// Localiza a imagem que mostrará a bandeira do cartão
const imagemCartao = document.getElementById("imagem-cartao");

// Localiza o botão Pagar
const botaoPagar = document.getElementById("pagar");

// Verifica se o usuário informou o valor da compra
function verificarValor() {
    // Obtém o valor digitado no campo
    const valor = campoValor.value.trim();

    // Verifica se o campo está vazio
    if (valor === "") {
        // Exibe um aviso caso nenhum valor tenha sido informado
        alert("Por favor, informe o valor da compra.");

        // Interrompe a função se o valor estiver vazio
        return;
    }

    // Verifica se a opção Pix foi selecionada
    if (opcaoPix.checked) {
        // Mostra o painel Pix
        painelPix.style.display = "block";

        // Esconde o painel do Cartão de Crédito
        painelCartao.style.display = "none";

        // Converte o valor digitado em número
        const valorCompra = Number(valor);
        
        // Calcula o total com 10% de desconto para pagamento via Pix
        const totalPix = valorCompra * 0.90;

       // Exibe o total com duas casas decimais
       campoTotal.textContent = totalPix.toLocaleString("pt-BR", {
       style: "currency",
       currency: "BRL"
    });
    }

    // Verifica se a opção Cartão de Crédito foi selecionada
    else if (opcaoCartao.checked) {
        // Mostra o painel do Cartão de Crédito
        painelCartao.style.display = "block";

        // Esconde o painel Pix
        painelPix.style.display = "none";

        // Calcula e exibe o total inicial do cartão
        atualizarTotalCartao();

    }
}


 // Atualiza os valores das parcelas e o total do cartão
function atualizarTotalCartao() {
    // Obtém o valor informado na compra
    const valorCompra = Number(campoValor.value);

    // Obtém a quantidade de parcelas selecionada
    const parcelas = Number(campoParcelas.value);

    // Começa com o valor original da compra
    let totalCartao = valorCompra;

    // Aplica 5% de juros para 4 parcelas
    if (parcelas === 4) {
        totalCartao = valorCompra * 1.05;
    }

    // Aplica 10% de juros para 5 parcelas
    else if (parcelas === 5) {
        totalCartao = valorCompra * 1.10;
    }

    // Formata o total em reais
    const totalFormatado = totalCartao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // Exibe o total atualizado abaixo do painel
    campoTotal.textContent = totalFormatado;

    // Atualiza o texto de cada opção do campo Parcelas
    for (let i = 0; i < campoParcelas.options.length; i++) {
        // Obtém a opção atual
        const opcao = campoParcelas.options[i];

        // Obtém a quantidade de parcelas dessa opção
        const quantidade = Number(opcao.value);

        // Começa com o valor original, sem juros
        let totalOpcao = valorCompra;

        // Aplica 5% de juros para 4 parcelas
        if (quantidade === 4) {
            totalOpcao = valorCompra * 1.05;
        }

        // Aplica 10% de juros para 5 parcelas
        else if (quantidade === 5) {
            totalOpcao = valorCompra * 1.10;
        }

        // Divide o total pelo número de parcelas
        const parcelaOpcao = totalOpcao / quantidade;

        // Formata o valor de cada parcela em reais
        const parcelaFormatada = parcelaOpcao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        // Atualiza o texto exibido na lista
        opcao.textContent = `${quantidade}x de ${parcelaFormatada}`;
    }
}

// Atualiza o total sempre que o usuário mudar as parcelas
campoParcelas.addEventListener("change", function () {
    // Só atualiza automaticamente se o Cartão estiver selecionado e visível
    if (opcaoCartao.checked && painelCartao.style.display === "block") {
        atualizarTotalCartao();
    }
});

// Executa a verificação quando o usuário clica no botão
botaoInformar.addEventListener("click", verificarValor);


 // Verifica o número do cartão enquanto o usuário digita
function verificarCartao() {
    // Obtém o número digitado
    const numero = campoNumeroCartao.value.trim();

    // Verifica se o número começa com 1234
    if (numero.startsWith("1234")) {
        // Mostra a primeira imagem
        imagemCartao.src = "imagens/cartao1.jpeg";
        imagemCartao.style.display = "block";
        
        // Limpa a mensagem de erro
        mensagemCartao.textContent = "";
    }

    // Verifica se o número começa com 4321
    else if (numero.startsWith("4321")) {
        // Mostra a segunda imagem
        imagemCartao.src = "imagens/cartao2.jpeg";
        imagemCartao.style.display = "block";

        // Limpa a mensagem de erro
        mensagemCartao.textContent = "";
    }

    // Se o número não corresponder a nenhum dos dois
    else if (numero.length > 0) {
        // Esconde a imagem
        imagemCartao.style.display = "none";

        // Mostra a mensagem de erro
        mensagemCartao.textContent = "Número de cartão inválido";
    }

    // Se o campo estiver vazio, limpa tudo
    else {
        imagemCartao.style.display = "none";
        mensagemCartao.textContent = "";
    }
}

// Verifica o cartão sempre que o usuário digitar
campoNumeroCartao.addEventListener("input", verificarCartao);

// Verifica quando o usuário clica no botão Pagar
botaoPagar.addEventListener("click", function () {
    // Exibe uma mensagem confirmando o pagamento
    alert("Pagamento realizado com sucesso!");
});