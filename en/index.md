---
layout: default
title: Home (EN)
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<!-- HERO -->
<section class="hero container">
  <h1>Nurturing Tomorrow's Leaders Since 1994</h1>
  <p>Quality education with values, discipline, and modern learning.</p>
  <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
  <!-- placeholder image (no file required yet) -->
  <img src="{{ '/assets/images/hero-assembly.webp' | relative_url }}"
       alt="Morning assembly at Veer Patta Public School" loading="lazy" style="display:block;max-width:100%;height:auto;">
</section>

<!-- STATS -->
<section class="container">
  <div class="stats">
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">30+</div><div>Years</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">500+</div><div>Students</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">95%</div><div>Results</div></div>
  </div>
</section>

<!-- PROGRAMS -->
<section class="container">
  <h2>Programs</h2>
  <div class="programs">
    <article class="program">
      <img src="{{ '/assets/images/lead-program.webp' | relative_url }}" alt="LEAD curriculum" loading="lazy">
      <h3>LEAD Curriculum</h3>
      <p>Concept mastery through modern pedagogy.</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/ncc-program.webp' | relative_url }}" alt="NCC activities" loading="lazy">
      <h3>NCC</h3>
      <p>Discipline and leadership in action.</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/sports-program.webp' | relative_url }}" alt="Sports at school" loading="lazy">
      <h3>Sports</h3>
      <p>Teamwork, fitness, and confidence.</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/arts-program.webp' | relative_url }}" alt="Arts and creativity" loading="lazy">
      <h3>Arts</h3>
      <p>Creativity through music, art, and drama.</p>
    </article>
  </div>
</section>

<!-- PRINCIPAL -->
<section class="container">
  <h2>Message from the Principal</h2>
  <p>Welcome to Veer Patta Public School—where tradition meets innovation to help every child thrive.</p>
  <!-- optional YouTube embed placeholder -->
  <!-- <iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="Principal's Welcome" frameborder="0" allowfullscreen></iframe> -->
</section>

<!-- TESTIMONIAL -->
<section class="container">
  <h2>Parent Testimonial</h2>
  <blockquote>"My child has become more confident and disciplined—thank you VPS."</blockquote>
</section>

{% include whatsapp.html %}
{% include footer.html %}
