// Проверка поддержки localStorage
function isLocalStorageSupported() {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.error('localStorage не поддерживается:', e);
        return false;
    }
}

// Инициализация данных
let products = [];

function initProducts() {
    if (isLocalStorageSupported()) {
        const stored = localStorage.getItem("products");
        products = stored ? JSON.parse(stored) : [
            { name: "Молочный коктейль" },
            { name: "Смузи" }
        ];
    } else {
        // Fallback: используем обычный массив
        products = [
            { name: "Молочный коктейль" },
            { name: "Смузи" }
        ];
        alert("Ваши данные не будут сохраняться между сеансами");
    }
}

// Сохранение данных
function saveProducts() {
    if (isLocalStorageSupported()) {
        try {
            localStorage.setItem("products", JSON.stringify(products));
        } catch (e) {
            console.error('Ошибка сохранения:', e);
        }
    }
}

// Остальные функции остаются без изменений, но добавляем saveProducts():

function addProduct() {
    const input = document.getElementById('newProductName');
    const productName = input.value.trim();

    if (productName) {
        products.push({ name: productName });
        input.value = '';
        saveProducts(); // <-- Добавлено
        renderProducts();
    } else {
        alert('Пожалуйста, введите название продукта');
    }
}

function deleteProduct(index) {
    if (confirm('Вы уверены, что хотите удалить этот продукт из меню?')) {
        products.splice(index, 1);
        saveProducts(); // <-- Добавлено
        renderProducts();
    }
}

function clearAll() {
    if (confirm('Вы уверены, что хотите полностью очистить меню?')) {
        if (isLocalStorageSupported()) {
            localStorage.removeItem("products");
        }
        products = [];
        renderProducts();
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initProducts();
    renderProducts();
});
