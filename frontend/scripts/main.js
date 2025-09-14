// Scripts para a aplicação de Prospecção Inteligente de Leads

// Função para preencher dados (será chamada quando a API retornar)
function preencherDados(dados) {
    // Empresa
    document.getElementById('info-setor').textContent = dados.setor || '-';
    document.getElementById('info-porte').textContent = dados.porte || '-';
    document.getElementById('info-faturamento').textContent = dados.faturamento_estimado || '-';
    document.getElementById('info-funcionarios').textContent = dados.funcionarios_estimado || '-';
    document.getElementById('info-descricao').textContent = dados.descricao || '-';
    
    // Produtos
    if (dados.produtos_servicos && Array.isArray(dados.produtos_servicos)) {
        document.getElementById('info-produtos').innerHTML = dados.produtos_servicos.map(produto => 
            `<span class="badge bg-primary me-2 mb-1">${produto}</span>`
        ).join('');
    }
    
    // Análise
    document.getElementById('analise-resumo').textContent = dados.resumo_empresa || '-';
    
    // Dores do mercado
    if (dados.dores_setor && Array.isArray(dados.dores_setor)) {
        document.getElementById('analise-dores').innerHTML = dados.dores_setor.map(dor => 
            `<div class="list-item">${dor}</div>`
        ).join('');
    }
    
    // Concorrentes
    if (dados.concorrentes && Array.isArray(dados.concorrentes)) {
        document.getElementById('analise-concorrentes').innerHTML = dados.concorrentes.map(concorrente => 
            `<div class="list-item">${concorrente}</div>`
        ).join('');
    }
    
    // Tendências
    if (dados.tendencias_mercado && Array.isArray(dados.tendencias_mercado)) {
        document.getElementById('analise-tendencias').innerHTML = dados.tendencias_mercado.map(tendencia => 
            `<div class="list-item">${tendencia}</div>`
        ).join('');
    }
    
    // Mensagem de prospecção
    document.getElementById('msg-assunto').textContent = dados.assunto || '-';
    // Tratar quebras de linha no corpo do email
    const corpoEmail = dados.corpo_email ? dados.corpo_email.replace(/\n/g, '<br>') : '-';
    document.getElementById('msg-corpo').innerHTML = corpoEmail;
    document.getElementById('msg-cta').textContent = dados.call_to_action || '-';
    
    // Personalização (novo campo do responseExample.js)
    if (dados.personalizacao) {
        const personalizacaoElement = document.getElementById('msg-personalizacao');
        if (personalizacaoElement) {
            personalizacaoElement.textContent = dados.personalizacao;
        }
    }
    
    // Próximos passos
    if (dados.proximos_passos && Array.isArray(dados.proximos_passos)) {
        document.getElementById('proximos-passos').innerHTML = dados.proximos_passos.map((passo, index) => 
            `<div class="list-item">
                <strong>${index + 1}.</strong> ${passo}
            </div>`
        ).join('');
    }
}

// Função para mostrar/ocultar loading
function toggleLoading(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const loading = button.querySelector('.loading');
    
    if (isLoading) {
        btnText.style.display = 'none';
        loading.style.display = 'inline-block';
        button.disabled = true;
    } else {
        btnText.style.display = 'inline-block';
        loading.style.display = 'none';
        button.disabled = false;
    }
}

// Função para mostrar seção de resultados
function mostrarResultados() {
    document.getElementById('resultados').style.display = 'block';
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
}


function configurarBusca() {
    document.getElementById('btnBuscar').addEventListener('click', async function() {
        const nomeEmpresa = document.getElementById('empresaNome').value.trim();
        const siteEmpresa = document.getElementById('empresaSite').value.trim();
        
        // Validar parâmetros
        if (!validarParametros(nomeEmpresa, siteEmpresa)) {
            exibirErro('Por favor, preencha os dois campos (Nome da Empresa e Site da Empresa).');
            return;
        }
        
        // Esconder erros anteriores
        esconderErro();
        
        // Mostrar loading
        toggleLoading(this, true);
        
        try {
            // Fazer chamada para a API
            const dados = await buscarDadosProspeccao(nomeEmpresa, siteEmpresa);

            console.log("JSON retornado:", dados);

            // Preencher dados na interface
            preencherDados(dados);
            
            // Mostrar resultados
            mostrarResultados();
            
        } catch (error) {
            console.error('Erro na busca:', error);
            
            // Exibir erro específico
            if (error.message.includes('Failed to fetch')) {
                exibirErro('Não foi possível conectar com a API. Verifique se o servidor está rodando em http://localhost:8000');
            } else if (error.message.includes('CORS')) {
                exibirErro('Erro de CORS. Verifique se o servidor permite requisições do frontend.');
            } else if (error.message.includes('422')) {
                exibirErro('Parâmetros inválidos. Verifique se os dados estão corretos.');
            }  else {
                exibirErro(`Erro: ${error.message}. Use o botão "Teste" para ver dados de demonstração.`);
            }
        } finally {
            // Esconder loading
            toggleLoading(this, false);
        }
    });
}

// Função para testar conectividade com a API na inicialização
async function verificarConectividadeAPI() {
    try {
        const conectado = await testarConectividadeAPI();
        if (conectado) {
            console.log('API conectada com sucesso');
        } else {
            console.warn('API não está acessível');
        }
    } catch (error) {
        console.warn('Erro ao verificar conectividade da API:', error);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    configurarBusca();
    verificarConectividadeAPI();
});
