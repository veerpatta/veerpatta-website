---
layout: default
title: Gallery (EN)
description: Photos and highlights from morning assemblies, LEAD classrooms, NCC drills, sports days, and annual celebrations at VPS.
permalink: /en/gallery/
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="container gallery">
  <section class="gallery-hero">
    <h1>Gallery</h1>
    <p>Highlights from assemblies, classrooms, sports, NCC, and celebrations.</p>
  </section>

  <section class="gallery-filters" aria-label="Filter gallery">
    <div class="pills" role="tablist">
      <button class="pill active" data-filter="all" role="tab">All</button>
      <button class="pill" data-filter="sports" role="tab">Sports</button>
      <button class="pill" data-filter="ncc" role="tab">NCC</button>
      <button class="pill" data-filter="cultural" role="tab">Cultural</button>
      <button class="pill" data-filter="academic" role="tab">Academic</button>
      <button class="pill" data-filter="celebrations" role="tab">Celebrations</button>
    </div>
  </section>

  <section class="gallery-grid" id="gallery-grid">
    <!-- Placeholder items; real images later -->
    <figure class="gallery-item" data-category="sports"><div class="ph"></div><figcaption>Sports Day — Relay</figcaption></figure>
    <figure class="gallery-item" data-category="ncc"><div class="ph"></div><figcaption>NCC Drill Practice</figcaption></figure>
    <figure class="gallery-item" data-category="cultural"><div class="ph"></div><figcaption>Independence Day Dance</figcaption></figure>
    <figure class="gallery-item" data-category="academic"><div class="ph"></div><figcaption>Science Lab Activity</figcaption></figure>
    <figure class="gallery-item" data-category="celebrations"><div class="ph"></div><figcaption>Annual Day Finale</figcaption></figure>
    <figure class="gallery-item" data-category="sports"><div class="ph"></div><figcaption>Football Practice</figcaption></figure>
  </section>

  <noscript>
    <p>JavaScript is disabled — showing all items.</p>
  </noscript>
</main>
{% include footer.html %}
