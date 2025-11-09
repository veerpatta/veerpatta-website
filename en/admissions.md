---
layout: default
title: Admissions (EN)
description: Join Veer Patta Public School in Nokha. Application period Nov-Mar, session starts April. Safe environment, caring teachers, balanced curriculum.
permalink: /en/admissions/
---

{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="admissions container" id="admissions">
  <!-- Hero Section -->
  <section class="admissions-hero">
    <h1>Join Veer Patta Public School</h1>
    <p>Empowering young minds with quality education, rooted in values and excellence. We welcome students from diverse backgrounds to learn, grow, and thrive together.</p>
  </section>

  <!-- Why VPS + Key Information Grid -->
  <section class="admissions-grid">
    <article>
      <h2>Why Choose Veer Patta?</h2>
      <ul>
        <li>Experienced and caring teachers</li>
        <li>Safe and nurturing environment</li>
        <li>Balanced curriculum with co-curricular activities</li>
        <li>Focus on character building and values</li>
        <li>Modern facilities and resources</li>
      </ul>
    </article>

    <article>
      <h2>Key Information</h2>
      <dl>
        <dt>Age Range</dt>
        <dd>3-16 years (Pre-Primary to Class 10)</dd>

        <dt>Application Period</dt>
        <dd>November - March (for next academic year)</dd>

        <dt>Session Begins</dt>
        <dd>April each year</dd>

        <dt>Documents Required</dt>
        <dd>Birth certificate, address proof, previous school records (if applicable)</dd>
      </dl>
    </article>
  </section>

  <!-- Admissions Timeline -->
  <section class="admissions-timeline">
    <h2>Admission Process</h2>
    <ol>
      <li>
        <span class="step-number">1</span>
        <div>
          <h3>Inquiry & Registration</h3>
          <p>Contact us via WhatsApp, phone, or visit in person. Fill out the registration form and submit required documents.</p>
        </div>
      </li>
      <li>
        <span class="step-number">2</span>
        <div>
          <h3>Interaction & Assessment</h3>
          <p>For new students, we conduct a friendly interaction to understand their learning level and interests. For younger children, this is a play-based observation.</p>
        </div>
      </li>
      <li>
        <span class="step-number">3</span>
        <div>
          <h3>Admission Confirmation</h3>
          <p>Once accepted, complete the admission formalities including fee payment. You'll receive a welcome kit and class schedule.</p>
        </div>
      </li>
      <li>
        <span class="step-number">4</span>
        <div>
          <h3>Orientation & Onboarding</h3>
          <p>Attend our orientation session to meet teachers, understand policies, and help your child settle into their new learning journey.</p>
        </div>
      </li>
    </ol>
  </section>

  <!-- Contact Form Section -->
  <section class="admissions-contact">
    <h2>Apply Now or Request Information</h2>
    <form class="admissions-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
      <input type="text" name="name" placeholder="Parent/Guardian Name" required>
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="tel" name="phone" placeholder="Phone Number" required>
      <input type="text" name="student-name" placeholder="Student Name" required>
      <input type="text" name="class" placeholder="Class/Grade Seeking Admission">
      <textarea name="message" rows="4" placeholder="Additional questions or comments"></textarea>
      <button type="submit" class="btn">Submit Application</button>
    </form>
    <div class="admissions-help">
      <p>Prefer a quick chat? <a href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20know%20about%20admissions%20at%20Veer%20Patta%20Public%20School" class="btn" target="_blank" rel="noopener">WhatsApp Us</a></p>
    </div>
  </section>

  <!-- Visit Details -->
  <section class="admissions-visit">
    <h2>Visit Our Campus</h2>
    <p><strong>Veer Patta Public School</strong><br>
    123 School Road, Education District<br>
    City, State - 110001</p>
    <p>
      <a href="tel:+919999999999">+91 99999 99999</a> |
      <a href="mailto:admissions@veerpatta.edu.in">admissions@veerpatta.edu.in</a>
    </p>
    <p>School Hours: Monday - Saturday, 8:00 AM - 2:00 PM<br>
    Office Hours: Monday - Friday, 9:00 AM - 4:00 PM</p>
  </section>
</main>

{% include whatsapp.html %}
{% include footer.html %}
