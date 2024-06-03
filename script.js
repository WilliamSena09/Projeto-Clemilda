document.getElementById('addProductBtn').addEventListener('click', addProduct);
document.getElementById('generateReportBtn').addEventListener('click', generateReport);
document.getElementById('printReportBtn').addEventListener('click', printReport);

let products = [];

function addProduct() {
    const cliente = document.getElementById('cliente').value;
    const produto = document.getElementById('produto').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const quantidade = document.getElementById('quantidade').value;
    const observacoes = document.getElementById('observacoes').value;

    if (!cliente || !produto || !data || !hora || !quantidade) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const product = { cliente, produto, data, hora, quantidade, observacoes };
    products.push(product);

    displayProducts();

    // Clear the fields for product and quantity
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';

    // Scroll to the top of the form
    window.scrollTo(0, 0);
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.produto} - ${product.quantidade}
            <div>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Excluir</button>
            </div>
        `;
        productList.appendChild(li);
    });
}

function editProduct(index) {
    const product = products[index];

    document.getElementById('produto').value = product.produto;
    document.getElementById('quantidade').value = product.quantidade;

    products.splice(index, 1);
    displayProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function generateReport() {
    const report = document.getElementById('report');
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = '';

    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>Cliente:</strong> ${product.cliente}</p>
            <p><strong>Produto:</strong> ${product.produto}</p>
            <p><strong>Data:</strong> ${product.data}</p>
            <p><strong>Hora:</strong> ${product.hora}</p>
            <p><strong>Quantidade:</strong> ${product.quantidade}</p>
            <p><strong>Observações:</strong> ${product.observacoes}</p>
            <hr>
        `;
        reportContent.appendChild(div);
    });

    products = [];
    displayProducts();

    report.style.display = 'block';
}

function printReport() {
    window.print();
}
