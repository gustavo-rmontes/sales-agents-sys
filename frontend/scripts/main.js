// Scripts para a aplicação de Prospecção Inteligente de Leads

// Função para preencher dados (será chamada quando a API retornar)
function preencherDados(dados) {
    // Empresa
    document.getElementById('info-nome-empresa').textContent = dados.empresa.nome_da_empresa || '-';
    document.getElementById('info-setor').textContent = dados.empresa.setor || '-';
    document.getElementById('info-porte').textContent = dados.empresa.porte || '-';
    document.getElementById('info-faturamento').textContent = dados.empresa.faturamento_estimado || '-';
    document.getElementById('info-funcionarios').textContent = dados.empresa.funcionarios_estimado || '-';
    document.getElementById('info-descricao').textContent = dados.empresa.descricao || '-';
    
    // Produtos
    if (dados.empresa.produtos_servicos && Array.isArray(dados.empresa.produtos_servicos)) {
        document.getElementById('info-produtos').innerHTML = dados.empresa.produtos_servicos.map(produto => 
            `<span class="badge bg-primary me-2 mb-1">${produto}</span>`
        ).join('');
    }
    
    // Análise
    document.getElementById('analise-resumo').textContent = dados.analise.resumo_empresa || '-';
    
    // Dores do mercado
    if (dados.analise.dores_setor && Array.isArray(dados.analise.dores_setor)) {
        document.getElementById('analise-dores').innerHTML = dados.analise.dores_setor.map(dor => 
            `<div class="list-item">${dor}</div>`
        ).join('');
    }
    
    // Concorrentes
    if (dados.analise.concorrentes && Array.isArray(dados.analise.concorrentes)) {
        document.getElementById('analise-concorrentes').innerHTML = dados.analise.concorrentes.map(concorrente => 
            `<div class="list-item">${concorrente}</div>`
        ).join('');
    }
    
    // Tendências
    if (dados.analise.tendencias_mercado && Array.isArray(dados.analise.tendencias_mercado)) {
        document.getElementById('analise-tendencias').innerHTML = dados.analise.tendencias_mercado.map(tendencia => 
            `<div class="list-item">${tendencia}</div>`
        ).join('');
    }
    
    // Mensagem de prospecção
    document.getElementById('msg-assunto').textContent = dados.mensagem_prospeccao.assunto || '-';
    document.getElementById('msg-corpo').innerHTML = dados.mensagem_prospeccao.corpo_email || '-';
    document.getElementById('msg-cta').textContent = dados.mensagem_prospeccao.call_to_action || '-';
    
    // Próximos passos
    if (dados.proximos_passos && Array.isArray(dados.proximos_passos)) {
        document.getElementById('proximos-passos').innerHTML = dados.proximos_passos.map((passo, index) => 
            `<div class="list-item">
                <strong>${index + 1}.</strong> ${passo}
            </div>`
        ).join('');
    }
}

// Função para simular busca (será substituída pela chamada real da API)
function configurarBusca() {
    document.getElementById('btnBuscar').addEventListener('click', function() {
        const nomeEmpresa = document.getElementById('empresaNome').value;
        const siteEmpresa = document.getElementById('empresaSite').value;
        
        if (!nomeEmpresa && !siteEmpresa) {
            alert('Por favor, preencha pelo menos um dos campos.');
            return;
        }
        
        // Simular loading
        this.querySelector('.btn-text').style.display = 'none';
        this.querySelector('.loading').style.display = 'inline-block';
        this.disabled = true;
        
        // Simular delay da API
        setTimeout(() => {
            // Aqui será feita a chamada real para a API
            console.log('Buscando dados para:', { nomeEmpresa, siteEmpresa });
            
            // Mostrar seção de resultados
            document.getElementById('resultados').style.display = 'block';
            
            // Resetar botão
            this.querySelector('.btn-text').style.display = 'inline-block';
            this.querySelector('.loading').style.display = 'none';
            this.disabled = false;
            
            // Scroll para resultados
            document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });
}

// Função para configurar botão de teste
function configurarTeste() {
    document.getElementById('btnTeste').addEventListener('click', function() {
        // Preencher campos de exemplo
        document.getElementById('empresaNome').value = 'Sales Impact';
        document.getElementById('empresaSite').value = 'https://salesimpact.com.br/';
        
        // Simular loading
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Carregando...';
        this.disabled = true;
        
        setTimeout(() => {
            // Preencher com dados de demonstração
            preencherDados(dadosDemonstracao);
            
            // Mostrar seção de resultados
            document.getElementById('resultados').style.display = 'block';
            
            // Resetar botão
            this.innerHTML = '<i class="fas fa-flask me-2"></i>Teste';
            this.disabled = false;
            
            // Scroll para resultados
            document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    configurarBusca();
    configurarTeste();
});
