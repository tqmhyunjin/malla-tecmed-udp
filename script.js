const ramos = document.querySelectorAll('.ramo');

// Cargar progreso guardado
let aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];

// Inicializar estados
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

// Click en ramo
ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    const id = ramo.dataset.id;
    const prereq = ramo.dataset.prereq;

    if (ramo.classList.contains('bloqueado')) return;

    if (ramo.classList.contains('aprobado')) {
      ramo.classList.remove('aprobado');
      aprobados = aprobados.filter(r => r !== id);
    } else {
      ramo.classList.add('aprobado');
      aprobados.push(id);
    }

    localStorage.setItem('aprobados', JSON.stringify(aprobados));
    location.reload(); // refresca estados de prerrequisitos
  });
});
