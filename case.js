  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // antes e depois: a barra move o recorte da proposta
  document.querySelectorAll('.compare-frame').forEach(frame => {
    const range = frame.querySelector('input');
    const set = () => frame.style.setProperty('--pos', range.value + '%');
    range.addEventListener('input', set);
    set();
  });

  // blocos aparecem ao rolar
  const blocos = document.querySelectorAll('.doc section > *, .next, .contact');
  blocos.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  blocos.forEach(el => io.observe(el));

  // índice lateral marca a parte que está sendo lida
  const links = [...document.querySelectorAll('.toc a')];
  const partes = links.map(a => document.querySelector(a.getAttribute('href')));
  const marcarParte = () => {
    let atual = partes[0];
    partes.forEach(p => { if (p.getBoundingClientRect().top < innerHeight * .35) atual = p; });
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + atual.id));
  };

  // a barra ganha uma linha quando a página rola
  const bar = document.querySelector('.bar');
  const aoRolar = () => { bar.classList.toggle('scrolled', scrollY > 8); marcarParte(); };
  addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();
