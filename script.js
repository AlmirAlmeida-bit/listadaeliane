
let lista = [];
let colunas = [];
let itensPorColuna = 20;

// Atualiza o título da lista na tela
function atualizarTituloLista() {
    const nomeLista = document.getElementById('nomeLista').value.trim() || 'Lista de Compras da Eliane';
    document.getElementById('tituloLista').textContent = nomeLista;
}

function atualizarLista() {
    atualizarTituloLista();
    const listaDisplay = document.getElementById('listaDisplay');
    listaDisplay.innerHTML = '';
    colunas = [];
    let colunaAtual = [];
    lista.forEach((elemento, index) => {
        const textoItem = `${elemento.item} ${elemento.quantidade} ${elemento.unidade}`;
        colunaAtual.push(textoItem);
        if (colunaAtual.length >= itensPorColuna) {
            colunas.push(colunaAtual);
            colunaAtual = [];
        }
    });
    if (colunaAtual.length > 0) {
        colunas.push(colunaAtual);
    }
    colunas.forEach(coluna => {
        const divColuna = document.createElement('div');
        divColuna.className = 'coluna';
        coluna.forEach(texto => {
            const p = document.createElement('p');
            p.textContent = texto;
            divColuna.appendChild(p);
        });
        listaDisplay.appendChild(divColuna);
    });
}

const carrinhoIcon = document.getElementById('carrinho-icon');
document.addEventListener('mousemove', (e) => {
    const offsetX = 10;
    const offsetY = 10;
    const conteudo = document.querySelector('.conteudo');
    const rect = conteudo.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const iconWidth = carrinhoIcon.offsetWidth;
    const iconHeight = carrinhoIcon.offsetHeight;
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        let posX = e.pageX + offsetX;
        let posY = e.pageY + offsetY;
        posX = Math.min(posX, windowWidth - iconWidth - 5);
        posY = Math.min(posY, windowHeight - iconHeight - 5);
        posX = Math.max(posX, 5);
        posY = Math.max(posY, 5);
        carrinhoIcon.style.left = `${posX}px`;
        carrinhoIcon.style.top = `${posY}px`;
        carrinhoIcon.style.display = 'block';
    } else {
        carrinhoIcon.style.display = 'none';
    }
});

document.getElementById('adicionar').addEventListener('click', () => {
    const item = document.getElementById('item').value.trim();
    const quantidade = document.getElementById('quantidade').value;
    const unidade = document.querySelector('input[name="unidade"]:checked').value;
    if (item && quantidade && !isNaN(quantidade) && parseInt(quantidade) > 0) {
        lista.push({ item, quantidade: parseInt(quantidade), unidade });
        atualizarLista();
        document.getElementById('item').value = '';
        document.getElementById('quantidade').value = '';
    } else {
        alert('Por favor, preencha item e uma quantidade válida.');
    }
});

document.getElementById('editarUltimo').addEventListener('click', () => {
    if (lista.length === 0) {
        alert('Nenhum item para editar.');
        return;
    }
    const ultimoItem = lista[lista.length - 1];
    document.getElementById('item').value = ultimoItem.item;
    document.getElementById('quantidade').value = ultimoItem.quantidade;
    document.querySelector(`input[name="unidade"][value="${ultimoItem.unidade}"]`).checked = true;
    lista.pop();
    atualizarLista();
});

document.getElementById('nomeLista').addEventListener('input', atualizarTituloLista);

document.getElementById('exportarPdf').addEventListener('click', () => {
    if (lista.length === 0) {
        alert('Nenhum item na lista para exportar.');
        return;
    }
    const nomeLista = document.getElementById('nomeLista').value.trim() || 'Lista de Compras';
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(nomeLista.toUpperCase(), 105, 15, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(10, 20, 200, 20);
const bodyData = lista.map((elemento, index) => [
    index + 1,
    elemento.item,
    `${elemento.quantidade} ${elemento.unidade}`
]);
doc.autoTable({
    head: [['Nº', 'Item', 'Quantidade']],
    body: bodyData,
    startY: 25,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 12 }
});
doc.save(`${nomeLista.replace(/\s+/g, '_').toLowerCase()}.pdf`);
});


window.addEventListener('load', () => {
    lista = [];
    atualizarLista();
    document.getElementById('nomeLista').value = '';
    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
    document.querySelector('input[name="unidade"][value="lt"]').checked = true;
});


window.addEventListener('load', () => {
    lista = [];
    document.getElementById('nomeLista').value = '';
    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
    document.querySelector('input[name="unidade"][value="lt"]').checked = true;
    atualizarLista(); // Isso vai chamar atualizarTituloLista() e definir o título padrão
});
