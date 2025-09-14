// Funções para integração com a API de Prospecção Inteligente

const API_BASE_URL = 'http://localhost:8000';

/**
 * Busca dados de prospecção da empresa
 * @param {string} nomeEmpresa - Nome da empresa
 * @param {string} website - Website da empresa
 * @returns {Promise<Object>} Dados retornados pela API
 */
async function buscarDadosProspeccao(nomeEmpresa, website) {
    try {
        console.log(`Buscando dados para: ${nomeEmpresa} - ${website}`);
        const dados = await tentarEndpoint(nomeEmpresa, website);
        console.log(`✅ Sucesso na busca de dados`);
        return dados;
    } catch (error) {
        console.error(`❌ Erro na busca:`, error.message);
        throw error;
    }
}

/**
 * Faz a requisição para o endpoint de prospecção
 * @param {string} nomeEmpresa - Nome da empresa
 * @param {string} website - Website da empresa
 * @returns {Promise<Object>} Dados retornados pela API
 */
async function tentarEndpoint(nomeEmpresa, website) {
    const url = new URL(`${API_BASE_URL}/api/prospect`);
    
    // Adicionar parâmetros obrigatórios
    url.searchParams.append('nome_da_empresa', nomeEmpresa);
    url.searchParams.append('website', website);
    
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors'
    };
    
    console.log(`Fazendo requisição GET para:`, url.toString());
    
    const response = await fetch(url.toString(), options);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
}

/**
 * Valida se ambos os parâmetros obrigatórios foram fornecidos
 * @param {string} nomeEmpresa - Nome da empresa
 * @param {string} website - Website da empresa
 * @returns {boolean} True se válido
 */
function validarParametros(nomeEmpresa, website) {
    return (nomeEmpresa && nomeEmpresa.trim() !== '') && 
           (website && website.trim() !== '');
}

/**
 * Exibe uma mensagem de erro para o usuário
 * @param {string} mensagem - Mensagem de erro
 */
function exibirErro(mensagem) {
    // Criar ou atualizar elemento de erro
    let erroElement = document.getElementById('erro-mensagem');
    
    if (!erroElement) {
        erroElement = document.createElement('div');
        erroElement.id = 'erro-mensagem';
        erroElement.className = 'alert alert-danger mt-3';
        erroElement.style.display = 'none';
        
        // Inserir após o card de busca
        const searchCard = document.querySelector('.card');
        searchCard.parentNode.insertBefore(erroElement, searchCard.nextSibling);
    }
    
    erroElement.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Erro:</strong> ${mensagem}
    `;
    erroElement.style.display = 'block';
    
    // Scroll para o erro
    erroElement.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-hide após 8 segundos
    setTimeout(() => {
        erroElement.style.display = 'none';
    }, 8000);
}

/**
 * Esconde a mensagem de erro
 */
function esconderErro() {
    const erroElement = document.getElementById('erro-mensagem');
    if (erroElement) {
        erroElement.style.display = 'none';
    }
}

/**
 * Testa a conectividade com a API
 * @returns {Promise<boolean>} True se a API estiver acessível
 */
async function testarConectividadeAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/prospect?nome_da_empresa=teste&website=https://teste.com`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            mode: 'cors'
        });
        
        if (response.ok) {
            console.log(`✅ API acessível`);
            return true;
        } else {
            console.log(`❌ API retornou status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao testar conectividade:', error);
        return false;
    }
}

// Exportar funções para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        buscarDadosProspeccao,
        validarParametros,
        exibirErro,
        esconderErro,
        testarConectividadeAPI
    };
}
