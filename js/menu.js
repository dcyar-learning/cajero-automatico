function toggleMenu() {
  const menuAuth = document.getElementById('auth');

  menuAuth.classList.toggle('d-none');
}

toggleMenu();

function showView(currentView) {
  const views = [
    'login',
    'registro',
    'cuenta',
    'deposito',
    'retiro',
    'transferencia',
    'historial',
  ];

  const hideViews = views.filter((v) => v != currentView);

  hideViews.forEach(function (view) {
    document.getElementById(view).classList.add('d-none');
  });

  document.getElementById(currentView).classList.remove('d-none');
}

showView('cuenta');

const routes = document.getElementsByClassName('nav-link');

Array.from(routes).forEach(function (link) {
  const view = link.dataset.view;
  link.addEventListener('click', function () {
    showView(view);
  });
});
