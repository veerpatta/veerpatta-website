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
    <!-- Gallery items loaded dynamically by gallery-loader.js -->
  </section>

  <noscript>
    <p>JavaScript is disabled — showing all items.</p>
  </noscript>
</main>
{% include footer.html %}
