---
layout: default
title: Home - Veer Patta Public School
description: Nurturing Tomorrow's Leaders Since 1994 - Bilingual education in Behror, Rajasthan
permalink: /en/
lang: en
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
</head>
<body>

{% include header.html %}

<main class="container">
  <!-- Hero Section -->
  <section class="hero">
    <h1>Nurturing Tomorrow's Leaders Since 1994</h1>
    <p>Excellence in bilingual education, rooted in Indian values, empowering every child to communicate, collaborate, and lead with confidence.</p>
    <a class="btn" href="https://wa.me/919413748575?text=Hello,%20I'm%20interested%20in%20admission%20for%20Class%20__%20for%202025-26" target="_blank" rel="noopener">Chat on WhatsApp</a>

    <!-- Hero Image Placeholder -->
    <img src="{{ '/assets/images/hero-assembly.webp' | relative_url }}" alt="Morning assembly at Veer Patta Public School" loading="lazy">
  </section>

  <!-- Stats Section -->
  <section class="stats" aria-label="School highlights">
    <div class="stat">
      <h3>30+ Years</h3>
      <p>Trusted academic excellence serving Behror families since 1994</p>
    </div>
    <div class="stat">
      <h3>500+ Students</h3>
      <p>Diverse learners thriving across English and Hindi mediums</p>
    </div>
    <div class="stat">
      <h3>95% Results</h3>
      <p>Consistent board success with focused mentoring and care</p>
    </div>
  </section>

  <!-- Programs Section -->
  <section class="section">
    <h2 class="text-center">Our Programs</h2>
    <div class="programs">
      <div class="program-card">
        <img src="{{ '/assets/images/lead-program.webp' | relative_url }}" alt="LEAD program - Futuristic digital learning" loading="lazy">
        <h3>LEAD</h3>
        <p>Futuristic digital learning powered by LEAD for comprehensive skill development</p>
      </div>
      <div class="program-card">
        <img src="{{ '/assets/images/ncc-program.webp' | relative_url }}" alt="NCC program - Building discipline and patriotism" loading="lazy">
        <h3>NCC</h3>
        <p>Building discipline, leadership, and patriotism through National Cadet Corps</p>
      </div>
      <div class="program-card">
        <img src="{{ '/assets/images/sports-program.webp' | relative_url }}" alt="Sports program - Cricket, athletics, and more" loading="lazy">
        <h3>Sports</h3>
        <p>Cricket, athletics, yoga, and more to develop fitness and teamwork</p>
      </div>
      <div class="program-card">
        <img src="{{ '/assets/images/arts-program.webp' | relative_url }}" alt="Arts program - Music, dance, and cultural activities" loading="lazy">
        <h3>Arts</h3>
        <p>Music, dance, drama, and cultural activities to nurture creativity</p>
      </div>
    </div>
  </section>

  <!-- Principal Message Section -->
  <section class="section">
    <h2>Message from the Principal</h2>
    <div class="principal-message">
      <div>
        <img src="{{ '/assets/images/principal-portrait.webp' | relative_url }}" alt="Portrait of our Principal" class="principal-portrait" loading="lazy">
      </div>
      <div class="principal-text">
        <p>"Every child is unique and carries infinite potential. At Veer Patta Public School, we nurture curiosity, discipline, and respect so each student grows into a responsible global citizen ready to face the challenges of tomorrow. Our bilingual approach ensures that students are rooted in their culture while being prepared for the world."</p>

        <!-- YouTube Embed Placeholder -->
        <div class="video-wrapper">
          <!-- Replace VIDEO_ID with actual YouTube video ID when available -->
          <!-- <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Principal's message video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
          <div style="background: #f0f0f0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">
            Video placeholder - YouTube embed coming soon
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="section">
    <h2>What Parents Say</h2>
    <blockquote class="testimonial">
      "My daughter has become more confident in both English and Hindi. The teachers truly care about every student and the school's focus on values alongside academics is exactly what we were looking for. We're so grateful to be part of the Veer Patta family."
      <cite>— Mrs. Sharma, Parent of Class 8 Student</cite>
    </blockquote>
  </section>
</main>

{% include whatsapp.html %}
{% include footer.html %}

</body>
</html>
