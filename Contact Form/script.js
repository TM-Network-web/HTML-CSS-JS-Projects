// script.js

const inventoryForm = document.getElementById("inventory-form");
const inventoryTableBody = document.querySelector("#inventory-table tbody");
const productSelect = document.getElementById("product-select");
const cartForm = document.getElementById("cart-form");
const cartTableBody = document.querySelector("#cart-table tbody");
const totalRevenueEl = document.getElementById("total-revenue");
const totalProfitEl = document.getElementById("total-profit");
const monthlyReportTable = document.querySelector("#monthly-report-table tbody");

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let salesData = JSON.parse(localStorage.getItem("salesData")) || {};
let cart = [];

function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function saveSalesData() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
}

function renderInventory() {
    inventoryTableBody.innerHTML = "";
    productSelect.innerHTML = "";
    inventory.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.purchasePrice}</td>
            <td>${item.sellPrice}</td>
            <td>${item.quantity}</td>
            <td>${item.purchaseDate || "-"}</td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        `;
        inventoryTableBody.appendChild(tr);

        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name;
        productSelect.appendChild(option);
    });
}

function deleteProduct(index) {
    inventory.splice(index, 1);
    saveInventory();
    renderInventory();
}

inventoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const purchasePrice = parseFloat(document.getElementById("purchase-price").value);
    const sellPrice = parseFloat(document.getElementById("sell-price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const purchaseDate = new Date().toLocaleDateString();

    const existing = inventory.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        inventory.push({ name, purchasePrice, sellPrice, quantity, purchaseDate });
    }

    saveInventory();
    renderInventory();
    inventoryForm.reset();
});

cartForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = productSelect.value;
    const quantity = parseInt(document.getElementById("buy-quantity").value);
    const saleDate = new Date().toLocaleDateString();

    const product = inventory.find(p => p.name === name);
    if (!product || product.quantity < quantity) {
        alert("Insufficient stock");
        return;
    }

    const subtotal = quantity * product.sellPrice;
    const profit = quantity * (product.sellPrice - product.purchasePrice);

    cart.push({ name, quantity, subtotal, profit, saleDate });
    product.quantity -= quantity;

    if (!salesData[name]) {
        salesData[name] = { sold: 0, revenue: 0, profit: 0, sales: [] };
    }
    salesData[name].sold += quantity;
    salesData[name].revenue += subtotal;
    salesData[name].profit += profit;
    salesData[name].sales.push({ quantity, subtotal, profit, date: saleDate });

    saveInventory();
    saveSalesData();
    renderInventory();
    renderCart();
    cartForm.reset();
});

function renderCart() {
    cartTableBody.innerHTML = "";
    let totalRevenue = 0;
    let totalProfit = 0;

    cart.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.profit}</td>
            <td>${item.subtotal}</td>
            <td>${item.saleDate}</td>
        `;
        cartTableBody.appendChild(tr);
        totalRevenue += item.subtotal;
        totalProfit += item.profit;
    });

    totalRevenueEl.textContent = totalRevenue;
    totalProfitEl.textContent = totalProfit;
}

function printBill() {
    window.print();
}

function renderMonthlyReport() {
    monthlyReportTable.innerHTML = "";
    for (const [name, data] of Object.entries(salesData)) {
        const tr = document.createElement("tr");
        const latestSale = data.sales[data.sales.length - 1];
        tr.innerHTML = `
            <td>${name}</td>
            <td>${data.sold}</td>
            <td>${data.revenue}</td>
            <td>${data.profit}</td>
            <td>${latestSale ? latestSale.date : "-"}</td>
        `;
        monthlyReportTable.appendChild(tr);
    }
}

// Initial Load
renderInventory();
renderMonthlyReport();
