---
layout: default
title: Home (EN)
description: Amet's Premier English-medium school (since 1994) with LEAD classrooms, NCC, sports, and caring teachers. RBSE Affiliated, Nursery to Class 12.
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"School",
  "name":"Veer Patta Public School",
  "url":"{{ '/en/' | relative_url | absolute_url }}",
  "address":{
    "@type":"PostalAddress",
    "streetAddress":"Near Karmal Road",
    "addressLocality":"Amet",
    "addressRegion":"Rajsamand, Rajasthan",
    "postalCode":"313332",
    "addressCountry":"IN"
  },
  "telephone":"+91 94137 48575",
  "sameAs":[
    "https://wa.me/919413748575"
  ]
}
</script>

<!-- HERO -->
<section class="hero container">
  <h1>Amet's Premier English Medium School - Empowering Students for 30 Years</h1>
  <p>RBSE Affiliated | Nursery to Class 12 | Science, Commerce & Arts Streams</p>
  <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener">Quick Admission Inquiry</a></p>
  <!-- placeholder image (no file required yet) -->
  <img src="{{ '/assets/images/hero-assembly.webp' | relative_url }}"
       alt="Morning assembly at Veer Patta Public School" loading="lazy" style="display:block;max-width:100%;height:auto;">
</section>

<!-- STATS -->
<section class="container">
  <div class="stats">
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">Estd. 1994</div><div>Serving Amet</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">500+</div><div>Students from 20+ Villages</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">95%</div><div>RBSE Board Results</div></div>
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

<!-- WHY PARENTS CHOOSE VPS -->
<section class="container">
  <h2>Why Parents Choose Veer Patta</h2>
  <div class="card">
    <ul style="line-height:1.8;">
      <li><strong>Only English medium school in 10km radius</strong> - Closest alternative is in Rajsamand city</li>
      <li><strong>Affordable fees with payment flexibility</strong> - Sibling discounts and merit scholarships available</li>
      <li><strong>Personal attention with 1:20 teacher-student ratio</strong> - Every child receives individual focus</li>
      <li><strong>Free remedial classes for weak students</strong> - Extra support after school hours at no cost</li>
      <li><strong>WhatsApp updates for parent communication</strong> - Stay informed about your child's progress</li>
      <li><strong>Safe campus with CCTV monitoring</strong> - Security is our top priority</li>
    </ul>
  </div>
</section>

<!-- RECENT ACHIEVEMENTS -->
<section class="container">
  <h2>Recent Achievements</h2>
  <div class="card">
    <ul style="line-height:1.8;">
      <li>🏆 <strong>3 students selected for district-level science exhibition</strong> - Representing Amet region</li>
      <li>🎖️ <strong>NCC 'B' Certificate for 15 students</strong> - Leadership and discipline excellence</li>
      <li>📚 <strong>100% result in Class 10 English and Science</strong> - Academic excellence recognized</li>
    </ul>
  </div>
</section>

<!-- PRINCIPAL -->
<section class="container">
  <h2>Message from the Principal</h2>
  <p>Welcome to Veer Patta Public School—where tradition meets innovation to help every child thrive.</p>
  <!-- optional YouTube embed placeholder -->
  <!-- <iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="Principal's Welcome" frameborder="0" allowfullscreen></iframe> -->
</section>

<!-- TESTIMONIALS -->
<section class="container">
  <h2>What Parents Say</h2>
  <blockquote>"My child improved from 60% to 85% in just one year. The personal attention here is unmatched in the Amet region." <br><em>- Parent from Khempur</em></blockquote>
  <blockquote>"We chose VPS over city schools because of the values-based education and affordable fees." <br><em>- Parent from Parasoli</em></blockquote>
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
