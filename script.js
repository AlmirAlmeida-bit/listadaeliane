let lista = [];
let colunas = [];
let itensPorColuna = 20;

document.getElementById('adicionar').addEventListener('click', () => {
    const item = document.getElementById('item').value.trim();
    const quantidade = document.getElementById('quantidade').value;

    if (item && quantidade && !isNaN(quantidade) && parseInt(quantidade) > 0) {
        lista.push({ item, quantidade: parseInt(quantidade) });
        atualizarLista();
        document.getElementById('item').value = '';
        document.getElementById('quantidade').value = '';
    } else {
        alert('Por favor, preencha item e uma quantidade válida.');
    }
});

function atualizarLista() {
    const listaDisplay = document.getElementById('listaDisplay');
    listaDisplay.innerHTML = '';
    colunas = [];
    let colunaAtual = [];

    lista.forEach((elemento, index) => {
        colunaAtual.push(`${index + 1}. ${elemento.item} - Quantidade: ${elemento.quantidade}`);
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

document.getElementById('exportarPdf').addEventListener('click', () => {
    if (lista.length === 0) {
        alert('Nenhum item na lista para exportar.');
        return;
    }

    const { jsPDF } = jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('LISTA DE COMPRAS DA ELIANE', 105, 15, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(10, 20, 200, 20);

    // Preparar dados para a tabela
    const bodyData = lista.map((elemento, index) => [
        index + 1,
        elemento.item,
        elemento.quantidade
    ]);

    doc.autoTable({
        head: [['Nº', 'Item', 'Quantidade']],
        body: bodyData,
        startY: 25,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 12 }
    });

    doc.save('lista_compras_eliane.pdf');
});
const carrinhoIcon = document.getElementById('carrinho-icon');
document.addEventListener('mousemove', (e) => {
    const offsetX = 10;
    const offsetY = 10;
    const conteudo = document.querySelector('.conteudo');
    const rect = conteudo.getBoundingClientRect();

    /* Verifica se o cursor está fora da área da .conteudo
    if (
        e.clientX < rect.left || 
        e.clientX > rect.right || 
        e.clientY < rect.top || 
        e.clientY > rect.bottom
    ) {
        carrinhoIcon.style.left = `${e.pageX + offsetX}px`;
        carrinhoIcon.style.top = `${e.pageY + offsetY}px`;
        carrinhoIcon.style.display = 'block';
    } else {
        carrinhoIcon.style.display = 'none';
    }*/
});
document.addEventListener('mousemove', (e) => {
    const offsetX = 10;
    const offsetY = 10;
    const conteudo = document.querySelector('.conteudo');
    const rect = conteudo.getBoundingClientRect();
    const carrinhoIcon = document.getElementById('carrinho-icon');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const iconWidth = carrinhoIcon.offsetWidth;
    const iconHeight = carrinhoIcon.offsetHeight;

    // Verifica se o cursor está fora da área da .conteudo Não em conta X e Y
    if (
        e.clientX < rect.left || 
        e.clientX > rect.right || 
        e.clientY < rect.top || 
        e.clientY > rect.bottom
    ) {
        let posX = e.pageX + offsetX;
        let posY = e.pageY + offsetY;

        // Mantém o ícone dentro da janela
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






