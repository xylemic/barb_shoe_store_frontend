// import {products} from "../products";
const products = [
  {
    id: 1,
    name: "suede exotic men's shoe",
    price: "65,000",
    stock: 20,
    colors: ['brown', 'black', 'gray'],
    hidden: false,
    image: '../images/suede_exotic_mens_shoe.webp'
  },
  {
    id: 2,
    name: 'upclass plain leather',
    price: "45,500",
    stock: 35,
    colors: ['Brown', 'Black'],
    hidden: false,
    image: '../images/upclass_plain_leather.webp'
  },
  // Add more products here...
  {
    id: 3,
    name: "leather men's sandals",
    price: "35,000",
    stock: 15,
    colors: ['Black'],
    hidden: false,
    image: '../images/leather_mens_sandals.webp'
  },
  {
    id: 4,
    name: 'classy suede horsebit loafers',
    price: 35000,
    stock: 40,
    colors: ['blue', 'black', 'brown'],
    hidden: false,
    image: '../images/gc-classy-suede-horsebit-loafers-blue-shoes-949_large.webp'
  },
  // // Add more products here...
  {
    id: 5,
    name: 'classy leather horsebit loafers',
    price: "25,000",
    stock: 25,
    colors: ['black'],
    hidden: false,
    image: '../images/gc-classy-leather-horsebit-loafers-black-shoes-998_large.webp'
  },
  // // Add more products here...
  {
    id: 6,
    name: 'suede chelsea boot',
    price: "55,000",
    stock: 10,
    colors: ['blue', 'black'],
    hidden: false,
    image: '../images/bs-suede-chelsea-boots-black-137_large.webp'
  },
  // // Add more products here...
  {
    id: 7,
    name: 'easy suede loafers',
    price: "35,000",
    stock: 60,
    colors: ['black', 'brown'],
    hidden: false,
    image: '../images/easy_suede_loafers.webp'
  },
  // // Add more products here...
  {
    id: 8,
    name: 'berluti leather sandal',
    price: "40,000",
    stock: 25,
    colors: ['black', 'brown'],
    hidden: false,
    image: '../images/berluti_leather_sandal.webp'
  },
  // // Add more products here...
  {
    id: 9,
    name: 'billionaire leather doublestrap monk shoes',
    price: "85,000",
    stock: 5,
    colors: ['brown'],
    hidden: false,
    image: '../images/billionaire-leather-doublestrap-monk-shoe-brown-shoes-434_large.webp'
  },
  // // Add more products here
  {
    id: 10,
    name: 'capped textured lacedup',
    price: "45,000",
    stock: 30,
    colors: ['brown', 'black'],
    hidden: false,
    image: '../images/capped_textured_laced_up.webp'
  },
  // // Add more products here...
  {
    id: 11,
    name: 'tasseled two toned sole',
    price: "40,000",
    stock: 20,
    colors: ['black'],
    hidden: false,
    image: '../images/tasseled_two_toned sole.webp'
  },
  // // Add more products here...
];

 document.addEventListener('DOMContentLoaded', () => {
    const dashboardTab = document.getElementById('dashboardTab');
    const productsTab = document.getElementById('productsTab');
    const ordersTab = document.getElementById('ordersTab');
    
    const dashboardContent = document.getElementById('dashboardContent');
    const productsContent = document.getElementById('productsContent');
    const ordersContent = document.getElementById('ordersContent');
    const manageProductsContent = document.getElementById('manageProductsContent');

    const addProductBtn = document.getElementById('addProductBtn');
    const manageProductsBtn = document.getElementById('manageProductsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const productModal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const addVariationBtn = document.getElementById('addVariationBtn');
    
    let isEdit = false;
    let editProductId = null;

    function displayProducts() {
        // populate product list and update the dashboard statistics
        const productList = document.getElementById('productList');
        const productTableBody = document.getElementById('productTableBody');
        productList.innerHTML = '';
        productTableBody.innerHTML = '';

        let totalProducts = 0;
        let lowStockAlerts = 0;

        products.forEach(product => {
            if (!product.hidden) {
                totalProducts++;
                if (product.stock < 10) {
                    lowStockAlerts++;
                }

                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <p>Price: ₦${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Colors: ${product.colors.join(', ')}</p>
                <button class="edit-product-btn" data-id="${product.id}">Edit Product</button>
                <button class="hide-product-btn" data-id="${product.id}">${product.hidden ? 'Show' : 'Hide'} Product</button>
                <button class="delete-product-btn" data-id="${product.id}">Delete Product</button>
                `;
                productList.appendChild(productItem);
            }

            const productRow = document.createElement('tr');
            productRow.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-product-btn" data-id="${product.id}">Edit</button>
                <button class="hide-product-btn" data-id="${product.id}">${product.hidden ? 'Show' : 'Hide'}</button>
                <button class="delete-product-btn" data-id="${product.id}">Delete</button>
            </td>
            `;
            productTableBody.appendChild(productRow);
        });

        // Save stats to localStorage
        localStorage.setItem('totalProducts', totalProducts);
        localStorage.setItem('lowStockAlerts', lowStockAlerts);

        // Update UI from localStorage
        document.getElementById('totalProducts').innerText = localStorage.getItem('totalProducts');
        document.getElementById('lowStockAlerts').innerText = localStorage.getItem('lowStockAlerts');
        document.getElementById('ordersToday').innerText = localStorage.getItem('ordersToday') || Math.floor(Math.random() * 20); 

        // Add event listeners for Edit, Hide/Show, and Delete buttons
        addProductEventListeners();
    }

    function openModal(product = null) {
        productModal.style.display = 'block';
        if (product) {
            isEdit = true;
            editProductId = product.id;
            document.getElementById('modalTitle').innerText = 'Edit Product';
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description || '';
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productVisibility').value = product.hidden ? 'hidden' : 'visible';
            document.getElementById('productColors').value = product.colors.join(', ');
        } else {
            isEdit = false;
            editProductId = null;
            document.getElementById('modalTitle').innerText = 'Add New Product';
            document.getElementById('productName').value = '';
            document.getElementById('productDescription').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productStock').value = '';
            document.getElementById('productVisibility').value = 'visible';
            document.getElementById('productColors').value = '';
        }
    }

    function closeModalFn() {
        productModal.style.display = 'none';
    }

    function saveProduct() {
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDescription').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const visibility = document.getElementById('productVisibility').value === 'visible';
        const colors = document.getElementById('productColors').value.split(',').map(c => c.trim());
        
        if (isEdit) {
            const product = products.find(p => p.id === editProductId);
            if (product) {
                product.name = name;
                product.description = description;
                product.price = price;
                product.stock = stock;
                product.hidden = !visibility;
                product.colors = colors;
            }
        } else {
            const newProduct = {
                id: products.length + 1,
                name,
                description,
                price,
                stock,
                hidden: !visibility,
                colors
            };
            products.push(newProduct);
        }
        
        displayProducts();
        closeModalFn();
    }

    function addProductEventListeners() {
        const editButtons = document.querySelectorAll('.edit-product-btn');
        const hideButtons = document.querySelectorAll('.hide-product-btn');
        const deleteButtons = document.querySelectorAll('.delete-product-btn');

        editButtons.forEach(button => button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                openModal(product);
            }
        }));

        hideButtons.forEach(button => button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                product.hidden = !product.hidden;
                displayProducts();
            }
        }));

        deleteButtons.forEach(button => button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const productIndex = products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                displayProducts();
            }
        }));
    }

    // event listeners for tabs
    dashboardTab.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardContent.style.display = 'block';
        productsContent.style.display = 'none';
        ordersContent.style.display = 'none';
        manageProductsContent.style.display = 'none';
    });

    productsTab.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardContent.style.display = 'none';
        productsContent.style.display = 'block';
        ordersContent.style.display = 'none';
        manageProductsContent.style.display = 'none';
        displayProducts();
    });

    ordersTab.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardContent.style.display = 'none';
        productsContent.style.display = 'none';
        ordersContent.style.display = 'block';
        manageProductsContent.style.display = 'none';
    });

    manageProductsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardContent.style.display = 'none';
        productsContent.style.display = 'none';
        ordersContent.style.display = 'none';
        manageProductsContent.style.display = 'block';
    });

   addProductBtn.addEventListener('click', () => {
        openModal();
    });

   closeModal.addEventListener('click', closeModalFn);
    cancelBtn.addEventListener('click', closeModalFn);
    saveProductBtn.addEventListener('click', saveProduct);
    addVariationBtn.addEventListener('click', () => {
        // functionality for adding variations
    });

    // Display the default tab
    dashboardTab.click();

    // Logout function
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        window.location.href = '../index.html';
    });

    displayProducts();
});
