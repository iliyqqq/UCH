// 1. Инициализация данных
let products = [];

// 2. Функция загрузки данных
function loadProducts() {
    try {
        const stored = localStorage.getItem("products");
        if (stored) {
            products = JSON.parse(stored);
        } else {
            // Начальные данные
            products = [
                { name: "Молочный коктейль" },
                { name: "Смузи" }
            ];
            saveProducts();
        }
    } catch (e) {
        console.error("Ошибка загрузки:", e);
        products = [];
    }
}

// 3. Функция сохранения
function saveProducts() {
    try {
        localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
        console.error("Ошибка сохранения:", e);
    }
}

// 4. Функция отрисовки
function renderProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error("Контейнер не найден!");
        return;
    }
    
    container.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteProduct(${index})">×</button>
            <div class="product-image">${product.name}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <button class="order-btn">Заказать</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 5. Функция добавления
function addProduct() {
    const input = document.getElementById('newProductName');
    if (!input) {
        console.error("Поле ввода не найдено!");
        return;
    }
    
    const productName = input.value.trim();
    if (!productName) {
        alert('Пожалуйста, введите название продукта');
        return;
    }
    
    products.push({ name: productName });
    input.value = '';
    
    saveProducts();
    renderProducts();
}

// 6. Функция удаления
function deleteProduct(index) {
    if (confirm('Удалить этот продукт?')) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    }
}

// 7. Функция очистки
function clearAll() {
    if (confirm('Очистить всё меню?')) {
        products = [];
        saveProducts();
        renderProducts();
    }
}

// 8. Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    renderProducts();
    
    // Для отладки
    console.log("Продукты:", products);
    console.log("LocalStorage:", localStorage.getItem("products"));
});
