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
  const productList = document.getElementById('productList');
  const addProductBtn = document.getElementById('addProductBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const productModal = document.getElementById('productModal');
  const closeModal = document.querySelector('.close');
  const saveProductBtn = document.getElementById('saveProductBtn');

  let isEdit = false;
  let editProductId = null;

  function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      if (!product.hidden) {
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
    });

    document.querySelectorAll('.edit-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        const product = products.find(p => p.id === productId);
        if (product) {
          isEdit = true;
          editProductId = productId;
          openModal(product);
        }
      });
    });

    document.querySelectorAll('.hide-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        const product = products.find(p => p.id === productId);
        if (product) {
          product.hidden = !product.hidden;
          displayProducts();
        }
      });
    });

    function openModal(product = null) {
      productModal.style.display = 'block';
      if (product) {
        document.getElementById('modalTitle').innerText = 'Edit Product';
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productColors').value = product.colors.join(', ');
      } else {
        document.getElementById('modalTitle').innerText = 'Add New Product';
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productStock').value = '';
        document.getElementById('productColors').value = '';
      }
    }

    function closeModalFunc() {
      productModal.style.display = 'none';
      isEdit = false;
      editProductId = null;
    }

    addProductBtn.addEventListener('click', () => {
      openModal();
    });

    closeModal.addEventListener('click', closeModalFunc);

    window.addEventListener('click', (event) => {
      if (event.target === productModal) {
        closeModalFunc();
      }
    });

    saveProductBtn.addEventListener('click', () => {
      const name = document.getElementById('productName').value;
      const price = parseFloat(document.getElementById('productPrice').value);
      const stock = parseInt(document.getElementById('productStock').value, 10);
      const colors = document.getElementById('productColors').value.split(',').map(c => c.trim());

      if (isEdit && editProductId !== null) {
        const product = products.find(p => p.id === editProductId);
        if (product) {
          product.name = name;
          product.price = price;
          product.stock = stock;
          product.colors = colors;
        }
      } else {
        const newProduct = {
          id: products.length,
          name,
          price,
          stock,
          colors,
          hidden: false,
          image: 'placeholder.jpg'
        };
        products.push(newProduct);
      }

      closeModalFunc();
      displayProducts();
    });

    document.querySelectorAll('.delete-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
          products.splice(productIndex, 1);
          displayProducts();
        }
      });
    });
  }

  // addProductBtn.addEventListener('click', () => {
  //   console.log('add product button clicked!');
  //   const name = prompt('Enter product name:');
  //   const price = parseFloat(prompt('Enter product price:'));
  //   const stock = parseInt(prompt('Enter product stock:'), 10);
  //   const colors = prompt('Enter product colors (comma separated):').split(',').map(c => c.trim());

  //   const newProduct = {
  //     id: products.length ? products[products.length - 1].id + 1 : 1,
  //     name,
  //     price,
  //     stock,
  //     colors,
  //     hidden: false,
  //     image: 'placeholder.jpg'
  //   };

  //   products.push(newProduct);
  //   displayProducts();
  // });

  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  displayProducts();
});

