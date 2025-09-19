Aqui está o seu código comentado:


// Declaração de variáveis globais
let lista = []; // Armazena os itens da lista de compras
let colunas = []; // Armazena as colunas da lista de compras
let itensPorColuna = 20; // Define o número de itens por coluna

// Função para atualizar o título da lista na tela
function atualizarTituloLista() {
  // Obtém o valor do campo de texto do nome da lista
  const nomeLista = document.getElementById('nomeLista').value.trim() || 'Lista de Compras da Eliane';
  // Atualiza o texto do título da lista
  document.getElementById('tituloLista').textContent = nomeLista;
}

// Função para atualizar a lista de compras na tela
function atualizarLista() {
  // Atualiza o título da lista
  atualizarTituloLista();
  
  // Obtém o elemento da lista de compras
  const listaDisplay = document.getElementById('listaDisplay');
  // Limpa o conteúdo da lista de compras
  listaDisplay.innerHTML = '';
  
  // Reinicializa as colunas
  colunas = [];
  let colunaAtual = [];
  
  // Percorre os itens da lista de compras
  lista.forEach((elemento, index) => {
    // Formata o texto do item
    const textoItem = `${elemento.item} ${elemento.quantidade} ${elemento.unidade}`;
    // Adiciona o item à coluna atual
    colunaAtual.push(textoItem);
    
    // Verifica se a coluna atual atingiu o limite de itens
    if (colunaAtual.length >= itensPorColuna) {
      // Adiciona a coluna atual à lista de colunas
      colunas.push(colunaAtual);
      // Reinicializa a coluna atual
      colunaAtual = [];
    }
  });
  
  // Verifica se há itens restantes na coluna atual
  if (colunaAtual.length > 0) {
    // Adiciona a coluna atual à lista de colunas
    colunas.push(colunaAtual);
  }
  
  // Percorre as colunas
  colunas.forEach(coluna => {
    // Cria um elemento div para a coluna
    const divColuna = document.createElement('div');
    divColuna.className = 'coluna';
    
    // Percorre os itens da coluna
    coluna.forEach(texto => {
      // Cria um elemento p para o item
      const p = document.createElement('p');
      p.textContent = texto;
      // Adiciona o item à coluna
      divColuna.appendChild(p);
    });
    
    // Adiciona a coluna à lista de compras
    listaDisplay.appendChild(divColuna);
  });
}

// Obtém o ícone do carrinho
const carrinhoIcon = document.getElementById('carrinho-icon');

// Adiciona um evento de movimento do mouse
document.addEventListener('mousemove', (e) => {
  // Define os offsets do ícone
  const offsetX = 10;
  const offsetY = 10;
  
  // Obtém o elemento da conteúdo
  const conteudo = document.querySelector('.conteudo');
  // Obtém as dimensões do conteúdo
  const rect = conteudo.getBoundingClientRect();
  // Obtém as dimensões da janela
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  // Obtém as dimensões do ícone
  const iconWidth = carrinhoIcon.offsetWidth;
  const iconHeight = carrinhoIcon.offsetHeight;
  
  // Verifica se o mouse está fora do conteúdo
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    // Calcula a posição do ícone
    let posX = e.pageX + offsetX;
    let posY = e.pageY + offsetY;
    posX = Math.min(posX, windowWidth - iconWidth - 5);
    posY = Math.min(posY, windowHeight - iconHeight - 5);
    posX = Math.max(posX, 5);
    posY = Math.max(posY, 5);
    
    // Atualiza a posição do ícone
    carrinhoIcon.style.left = `${posX}px`;
    carrinhoIcon.style.top = `${posY}px`;
    carrinhoIcon.style.display = 'block';
  } else {
    // Esconde o ícone
    carrinhoIcon.style.display = 'none';
  }
});

// Adiciona um evento de clique ao botão de adicionar
document.getElementById('adicionar').addEventListener('click', () => {
  // Obtém os valores dos campos de texto
  const item = document.getElementById('item').value.trim();
  const quantidade
