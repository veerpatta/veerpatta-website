---
layout: default
lang: hi
title: गैलरी (HI)
description: VPS में प्रार्थना सभा, LEAD कक्षाओं, NCC ड्रिल, खेल दिवस और वार्षिक उत्सवों की तस्वीरें और झलकियाँ।
permalink: /hi/gallery/
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="container gallery lang-hi">
  <section class="gallery-hero">
    <h1>गैलरी</h1>
    <p>प्रार्थना सभा, कक्षाएँ, खेल, एनसीसी और उत्सवों की झलकियाँ।</p>
  </section>

  <section class="gallery-filters" aria-label="गैलरी फ़िल्टर">
    <div class="pills" role="tablist">
      <button class="pill active" data-filter="all" role="tab">सभी</button>
      <button class="pill" data-filter="sports" role="tab">खेल</button>
      <button class="pill" data-filter="ncc" role="tab">एनसीसी</button>
      <button class="pill" data-filter="cultural" role="tab">सांस्कृतिक</button>
      <button class="pill" data-filter="academic" role="tab">शैक्षणिक</button>
      <button class="pill" data-filter="celebrations" role="tab">उत्सव</button>
    </div>
  </section>

  <section class="gallery-grid" id="gallery-grid">
    <!-- Gallery items loaded dynamically by gallery-loader.js -->
  </section>

  <noscript>
    <p>जावास्क्रिप्ट बंद है — सभी आइटम दिखाए जा रहे हैं।</p>
  </noscript>
</main>
{% include footer.html %}
