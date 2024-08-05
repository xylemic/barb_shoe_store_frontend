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
  const productCatalog = document.getElementById('productCatalog');
  const cart = document.getElementById('cart');
  const logoutBtn = document.getElementById('logoutBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const detailsModal = document.getElementById('detailsModal');
  const closeModal = document.querySelector('.close');

  let cartItems = [];

  function displayProducts() {
    productCatalog.innerHTML = '';
    products.forEach(product => {
      if (!product.hidden) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('draggable', true);
        productItem.dataset.id = product.id;
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <p>Price: ₦${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Colors: 
            <select class="color-select" data-id="${product.id}">
              ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
          </p>
          <button class="view-details-btn" data-id="${product.id}">View Details</button>
          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productCatalog.appendChild(productItem);

        productItem.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('productId', product.id);
        });
      }
    });

    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        const product = products.find(p => p.id === productId);
        if (product) {
          openDetailsModal(product);
        }
      });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        addToCart(productId);
      });
    });
  }

  function openDetailsModal(product) {
    detailsModal.style.display = 'block';
    document.getElementById('detailsTitle').innerText = product.name;
    document.getElementById('detailsImage').src = product.image;
    document.getElementById('detailsPrice').innerText = `Price: ₦${product.price}`;
    document.getElementById('detailsStock').innerText = `Stock: ${product.stock}`;
    document.getElementById('detailsColors').innerText = `Colors: ${product.colors.join(', ')}`;
  }

  function closeModalFunc() {
    detailsModal.style.display = 'none';
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const selectedColor = document.querySelector(`.color-select[data-id="${product.id}"]`).value;
      const cartItem = { ...product, selectedColor };
      cartItems.push(cartItem);
      displayCart();
    }
  }

  function displayCart() {
    cart.innerHTML = '';
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} - ₦${item.price} - ${item.selectedColor}</p>
        <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
      `;
      cart.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemIndex = parseInt(e.target.dataset.index, 10);
        cartItems.splice(itemIndex, 1);
        displayCart();
      });
    });
  }

  productCatalog.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('product-item')) {
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }
  });

  cart.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  cart.addEventListener('drop', (e) => {
    e.preventDefault();
    const productId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const product = products.find(p => p.id === productId);
    if (product) {
      const selectedColor = document.querySelector(`.color-select[data-id="${product.id}"]`).value;
      const cartItem = { ...product, selectedColor };
      cartItems.push(cartItem);
      displayCart();
    }
  });

  closeModal.addEventListener('click', closeModalFunc);

  window.addEventListener('click', (event) => {
    if (event.target === detailsModal) {
      closeModalFunc();
    }
  });

  checkoutBtn.addEventListener('click', () => {
    alert('Checkout feature not implemented yet.');
  });

  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  displayProducts();
});