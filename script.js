document.getElementById('addProductBtn').addEventListener('click', addProduct);
document.getElementById('generateReportBtn').addEventListener('click', generateReport);
document.getElementById('printReportBtn').addEventListener('click', printReport);

let products = [];
let totalPrice = 0;

function addProduct() {
    const cliente = document.getElementById('cliente').value;
    const produto = document.getElementById('produto').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const observacoes = document.getElementById('observacoes').value;

    if (!cliente || !produto || !data || !hora || isNaN(preco)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const product = { cliente, produto, data, hora, preco, observacoes };
    products.push(product);
    totalPrice += preco;

    displayProducts();
    updateTotalPrice();

    // Clear the fields for product and price
    document.getElementById('produto').value = '';
    document.getElementById('preco').value = '';

    // Scroll to the top of the form
    window.scrollTo(0, 0);
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.produto} - R$ ${product.preco.toFixed(2)}
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
    document.getElementById('preco').value = product.preco;

    products.splice(index, 1);
    totalPrice -= product.preco;
    displayProducts();
    updateTotalPrice();
}

function deleteProduct(index) {
    totalPrice -= products[index].preco;
    products.splice(index, 1);
    displayProducts();
    updateTotalPrice();
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
            <p><strong>Preço:</strong> R$ ${product.preco.toFixed(2)}</p>
            <p><strong>Observações:</strong> ${product.observacoes}</p>
            <hr>
        `;
        reportContent.appendChild(div);
    });

    // Clear the product list and update display
    products = [];
    totalPrice = 0;
    displayProducts();
    updateTotalPrice();

    report.style.display = 'block';
}

function updateTotalPrice() {
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

function printReport() {
    window.print();
}
