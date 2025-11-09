// Main JavaScript file
// Reserved for future interactivity (counters, toggles, etc.)

// Gallery filter functionality
(function(){
  const pills = document.querySelectorAll('.pill');
  const items = document.querySelectorAll('.gallery-item');
  if(!pills.length || !items.length) return;
  pills.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      pills.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      items.forEach(it=>{
        const cat = it.getAttribute('data-category');
        const show = (f === 'all' || f === cat);
        it.style.display = show ? '' : 'none';
      });
    });
  });
})()
