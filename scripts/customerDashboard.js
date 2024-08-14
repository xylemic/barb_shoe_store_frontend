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
  const checkoutBtn = document.getElementById('proceedCheckoutBtn');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  const detailsModal = document.getElementById('detailsModal');
  const closeModal = document.querySelector('.close');
  const productSearch = document.getElementById('productSearch');

  const homeTab = document.getElementById('homeTab');
  const shopTab = document.getElementById('shopTab');
  const cartTab = document.getElementById('cartTab');
  const cartQuantity = document.getElementById('cartQuantity');
  const totalItems = document.getElementById('totalItems');
  const totalPrice = document.getElementById('totalPrice');
  const profileTab = document.getElementById('profileTab')

  const homeSection = document.getElementById('homeSection');
  const shopSection = document.getElementById('shopSection');
  const cartSection = document.getElementById('cartSection');
  const profileSection = document.getElementById('profileSection');
  const logoutBtn = document.getElementById('logoutBtn');
  const featuredProducts = document.getElementById('featuredCatalog'); // Featured products section

  let cartItems = [];

  function displaySection(section) {
    homeSection.style.display = 'none';
    shopSection.style.display = 'none';
    cartSection.style.display = 'none';
    profileSection.style.display = 'none';

    section.style.display = 'block';
  }

  homeTab.addEventListener('click', () => displaySection(homeSection));
  shopTab.addEventListener('click', () => displaySection(shopSection));
  cartTab.addEventListener('click', () => displaySection(cartSection));
  profileTab.addEventListener('click', () => displaySection(profileSection));

  function displayProducts(filteredProducts = products) {
    productCatalog.innerHTML = '';
    filteredProducts.forEach(product => {
      if (!product.hidden) {
        const productItem = document.createElement('div');
        productItem.classList.add('product_item');
        productItem.setAttribute('draggable', true);
        productItem.dataset.id = product.id;
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}" class="product_image">
          <p>Price: ₦${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Colors:
            <select class="color_select" data-id="${product.id}">
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

  productSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
  });

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const cartItemIndex = cartItems.findIndex(item => item.product.id === productId);
      if (cartItemIndex > -1) {
        cartItems[cartItemIndex].quantity += 1;
      } else {
        cartItems.push({ product, quantity: 1});
      }
      updateCart();
    }
  }

  function updateCart() {
    cart.innerHTML = '';
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart_item');
      cartItem.innerHTML = `
        <span>${item.product.name} (x${item.quantity})</span>
        <span>₦${parseInt(item.product.price.replace(/,/g, ''), 10) * item.quantity}</span>
        <button class="remove-from-cart-btn" data-id="${item.product.id}">Remove</button>
      `;
      cart.appendChild(cartItem);
    });

    cartQuantity.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    totalItems.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.textContent = cartItems.reduce((sum, item) => sum + (parseInt(item.product.price.replace(/,/g, ''), 10) * item.quantity), 0);

    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        removeFromCart(productId);
      });
    });
  }

  function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.product.id !== productId);
    updateCart();
  }

  function openDetailsModal(product) {
    document.getElementById('detailsTitle').textContent = product.name;
    document.getElementById('detailsImage').src = product.image;
    document.getElementById('detailsPrice').textContent = `Price: ₦${product.price}`;
    document.getElementById('detailsStock').textContent = `Stock: ${product.stock}`;
    document.getElementById('detailsColors').innerHTML = `
      Colors: 
      <select class="color-select">
        ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
      </select>
    `;
    detailsModal.style.display = 'block';
  }

  closeModal.addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });

  // Handle drag and drop to cart
  cartTab.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  cartTab.addEventListener('drop', (e) => {
    const productId = parseInt(e.dataTransfer.getData('productId'), 10);
    addToCart(productId);
  });

  continueShoppingBtn.addEventListener('click', () => {
    displaySection(shopSection);
  });

  checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
  });

  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Featured products logic
  function displayFeaturedProducts() {
    featuredProducts.innerHTML = '';
    const featured = products.filter(product => product.featured);
    featured.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product_item');
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product_image">
        <p>Price: ₦${product.price}</p>
        <button class="view-details-btn" data-id="${product.id}">View Details</button>
      `;
      featuredProducts.appendChild(productItem);

      productItem.querySelector('.view-details-btn').addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id, 10);
        openDetailsModal(products.find(p => p.id === productId));
      });
    });
  }

  // Initialize
  displayProducts();
  displayFeaturedProducts(); // Display featured products on home page
});
