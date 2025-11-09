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

<!-- ABOUT TEASER -->
<section class="container about-teaser" id="about">
  <div class="about-teaser-card">
    <h2>About Veer Patta Public School</h2>
    <p>Rooted in values, focused on modern learning. Since 1994, we've nurtured confident, disciplined learners through strong academics and character building.</p>
    <p><a class="btn btn-secondary" href="{{ '/en/about/' | relative_url }}">Learn more</a></p>
  </div>
</section>

<!-- ACADEMICS TEASER -->
<section class="container academics-teaser" id="academics">
  <div class="about-teaser-card">
    <h2>Academics at VPS</h2>
    <p>Strong fundamentals with LEAD, caring teachers, and regular mastery checks.</p>
    <p><a class="btn btn-secondary" href="{{ '/en/academics/' | relative_url }}">Explore Academics</a></p>
  </div>
</section>

<!-- GALLERY TEASER -->
<section class="container gallery-teaser" id="gallery">
  <div class="about-teaser-card">
    <h2>Gallery</h2>
    <p>See our campus in action — assemblies, labs, sports, and celebrations.</p>
    <p><a class="btn btn-secondary" href="{{ '/en/gallery/' | relative_url }}">Open Gallery</a></p>
  </div>
</section>

<!-- CONTACT TEASER -->
<section class="container contact-teaser" id="contact">
  <div class="about-teaser-card">
    <h2>Visit or Call Us</h2>
    <p>Questions about admissions or transport? We're here to help.</p>
    <p><a class="btn btn-secondary" href="{{ '/en/contact/' | relative_url }}">Contact Page</a></p>
  </div>
</section>

{% include whatsapp.html %}
{% include footer.html %}
