---
layout: default
title: मुखपृष्ठ (HI)
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<!-- HERO -->
<section class="hero container">
  <h1>1994 से कल के नेताओं का पोषण</h1>
  <p>मूल्यों, अनुशासन और आधुनिक शिक्षा के साथ गुणवत्तापूर्ण शिक्षा।</p>
  <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener">व्हाट्सएप पर बात करें</a></p>
  <!-- placeholder image (no file required yet) -->
  <img src="{{ '/assets/images/hero-assembly.webp' | relative_url }}"
       alt="वीर पत्ता पब्लिक स्कूल में सुबह की सभा" loading="lazy" style="display:block;max-width:100%;height:auto;">
</section>

<!-- STATS -->
<section class="container">
  <div class="stats">
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">30+</div><div>वर्ष</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">500+</div><div>विद्यार्थी</div></div>
    <div class="stat"><div style="font-size:2rem;color:var(--blue);font-weight:800;">95%</div><div>परिणाम</div></div>
  </div>
</section>

<!-- PROGRAMS -->
<section class="container">
  <h2>कार्यक्रम</h2>
  <div class="programs">
    <article class="program">
      <img src="{{ '/assets/images/lead-program.webp' | relative_url }}" alt="LEAD पाठ्यक्रम" loading="lazy">
      <h3>LEAD पाठ्यक्रम</h3>
      <p>आधुनिक शिक्षाशास्त्र के माध्यम से अवधारणा में महारत।</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/ncc-program.webp' | relative_url }}" alt="NCC गतिविधियाँ" loading="lazy">
      <h3>NCC</h3>
      <p>क्रियाशील अनुशासन और नेतृत्व।</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/sports-program.webp' | relative_url }}" alt="विद्यालय में खेल" loading="lazy">
      <h3>खेल</h3>
      <p>टीमवर्क, फिटनेस और आत्मविश्वास।</p>
    </article>
    <article class="program">
      <img src="{{ '/assets/images/arts-program.webp' | relative_url }}" alt="कला और रचनात्मकता" loading="lazy">
      <h3>कला</h3>
      <p>संगीत, कला और नाटक के माध्यम से रचनात्मकता।</p>
    </article>
  </div>
</section>

<!-- PRINCIPAL -->
<section class="container">
  <h2>प्रधानाचार्य का संदेश</h2>
  <p>वीर पत्ता पब्लिक स्कूल में आपका स्वागत है—जहां परंपरा नवाचार से मिलती है और हर बच्चे को फलने-फूलने में मदद करती है।</p>
  <!-- optional YouTube embed placeholder -->
  <!-- <iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="Principal's Welcome" frameborder="0" allowfullscreen></iframe> -->
</section>

<!-- TESTIMONIAL -->
<section class="container">
  <h2>अभिभावक प्रशंसापत्र</h2>
  <blockquote>"मेरा बच्चा अधिक आत्मविश्वासी और अनुशासित हो गया है—धन्यवाद VPS।"</blockquote>
</section>

<!-- ABOUT TEASER -->
<section class="container about-teaser lang-hi" id="about">
  <div class="about-teaser-card">
    <h2>वीर पट्टा पब्लिक स्कूल के बारे में</h2>
    <p>मूल्यों में रचा-बसा, आधुनिक शिक्षा पर केंद्रित। 1994 से हम अनुशासन, नैतिकता और गुणवत्तापूर्ण शिक्षा के साथ आत्मविश्वासी विद्यार्थियों का निर्माण कर रहे हैं।</p>
    <p><a class="btn btn-secondary" href="{{ '/hi/about/' | relative_url }}">और जानें</a></p>
  </div>
</section>

{% include whatsapp.html %}
{% include footer.html %}
