function toggleMenu() {
  document.getElementById('auth-menu').classList.toggle('d-none');
  document.getElementById('auth').classList.toggle('d-none');
  document.getElementById('features').classList.toggle('d-none');
}

// toggleMenu();

function showView(currentView) {
  const views = [
    'login',
    'registro',
    'historial',
    'deposito',
    'retiro',
    'transferencia',
  ];

  const hideViews = views.filter((v) => v != currentView);

  hideViews.forEach(function (view) {
    document.getElementById(view).classList.add('d-none');
  });

  document.getElementById(currentView).classList.remove('d-none');
}

showView('deposito');

const routes = document.getElementsByClassName('nav-link');

Array.from(routes).forEach(function (link) {
  const view = link.dataset.view;
  link.addEventListener('click', function () {
    showView(view);
  });
});
