const ramos = document.querySelectorAll('.ramo');
let aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];

ramos.forEach(ramo => {
  const id = ramo.dataset.id;
  const prereq = ramo.dataset.prereq;

  if (aprobados.includes(id)) {
    ramo.classList.add('aprobado');
  }

  if (prereq && !aprobados.includes(prereq)) {
    ramo.classList.add('bloqueado');
  }
});

ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    const id = ramo.dataset.id;

    if (ramo.classList.contains('aprobado')) {
      ramo.classList.remove('aprobado');
      aprobados = aprobados.filter(r => r !== id);
    } else {
      ramo.classList.add('aprobado');
      aprobados.push(id);
    }

    localStorage.setItem('aprobados', JSON.stringify(aprobados));
    location.reload();
  });
});
