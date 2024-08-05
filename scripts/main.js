const users = [
  { username: 'admin', password: 'admin123', type: 'admin' },
  { username: 'customer', password: 'customer123', type: 'customer' }
];

let currentUserType = 'admin';

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password && u.type === currentUserType);

  if (user) {
    if (user.type === 'admin') {
      window.location.href = '../adminDashboard.html';
    } else {
      window.location.href = '../customerDashboard.html';
    }
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const toggleUserType = document.getElementById('toggleUserTypeBtn');
  const loginTypeText = document.getElementById('loginTypeText');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
  });

  toggleUserType.addEventListener('click', () => {
    console.log('button clicked');
    currentUserType = currentUserType === 'admin'? 'customer' : 'admin';
    loginTypeText.textContent = `Current login type: ${currentUserType.charAt(0).toUpperCase() + currentUserType.slice(1)}`;
    toggleUserType.textContent = `Switch to ${currentUserType === 'admin'? 'customer' : 'admin'} Login`;
  });
});

