---
layout: default
title: Contact (EN)
description: Reach Veer Patta Public School at Opp. Mela Ground, Amet, Rajasthan. Call/WhatsApp +91 94137 48575 for admissions, transport, or general queries.
permalink: /en/contact/
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="container contact">
  <section class="contact-hero">
    <h1>Contact Us</h1>
    <p>We're happy to help with admissions, transport, or general queries.</p>
  </section>

  <section class="contact-grid">
    <article class="card">
      <h2>Reach Us</h2>
      <p>Veer Patta Public School, Opp. Mela Ground, Amet, Rajasthan - 313332</p>
      <p>Phone: <a href="tel:+919413748575">+91 94137 48575</a><br>
         Email: <a href="mailto:veerpatta.school@gmail.com">veerpatta.school@gmail.com</a></p>
      <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener">WhatsApp us</a></p>
    </article>

    <article class="card">
      <h2>Timings</h2>
      <ul>
        <li>Office: Mon–Sat, 8:00 AM – 2:00 PM</li>
        <li>Visits: Please call/WhatsApp to schedule</li>
      </ul>
      <p><a class="btn btn-secondary" href="https://maps.google.com/?q=Veer+Patta+Public+School+Opp+Mela+Ground+Amet+Rajasthan" target="_blank" rel="noopener">View on Map</a></p>
    </article>

    <article class="card">
      <h2>Transport Routes</h2>
      <ul>
        <li><strong>Route 1:</strong> Amet Town → Mela Ground → School</li>
        <li><strong>Route 2:</strong> Surrounding villages (Khempur, Parasoli, etc.)</li>
        <li>New routes can be arranged based on demand</li>
      </ul>
    </article>
  </section>

  <!-- Quick Inquiry Form -->
  <section class="contact-form-section">
    <div class="card">
      <h2>Quick Inquiry</h2>
      <p>Have a question? Fill out the form below and we'll get back to you within 24 hours.</p>

      <form class="contact-form" action="https://formspree.io/f/xgveybpz" method="POST">
        <input type="hidden" name="_subject" value="Quick Inquiry from Website">

        <div class="form-group">
          <label for="name">Your Name *</label>
          <input type="text" id="name" name="name" required placeholder="Enter your full name">
        </div>

        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" pattern="[0-9+\s\-()]+">
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="your.email@example.com">
        </div>

        <div class="form-group">
          <label for="preferred-time">Preferred Contact Time *</label>
          <select id="preferred-time" name="preferred-time" required>
            <option value="">Select a time</option>
            <option value="morning">Morning (8 AM - 11 AM)</option>
            <option value="midday">Mid-day (11 AM - 2 PM)</option>
            <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - 7 PM)</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>

        <div class="form-group">
          <label for="inquiry-type">Inquiry About *</label>
          <select id="inquiry-type" name="inquiry-type" required>
            <option value="">Select topic</option>
            <option value="admissions">Admissions</option>
            <option value="transport">Transport</option>
            <option value="fees">Fee Structure</option>
            <option value="curriculum">Curriculum & Academics</option>
            <option value="facilities">Facilities</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Your Message *</label>
          <textarea id="message" name="message" rows="4" required placeholder="Please provide details about your inquiry"></textarea>
        </div>

        <button type="submit" class="btn btn-submit">Submit Inquiry</button>
        <p class="form-note">We'll respond within 24 hours. For urgent matters, please call or WhatsApp us directly.</p>
      </form>
    </div>
  </section>

  <!-- Schedule Campus Visit Form -->
  <section class="contact-form-section" id="visit-form">
    <div class="card visit-form-card">
      <h2>Schedule a Campus Visit</h2>
      <p>Experience our school firsthand! Book a campus tour to see our facilities, meet our teachers, and learn about our programs.</p>

      <form class="contact-form visit-form" action="https://formspree.io/f/xgveybpz" method="POST">
        <input type="hidden" name="_subject" value="Campus Visit Request from Website">

        <div class="form-group">
          <label for="visit-name">Parent/Guardian Name *</label>
          <input type="text" id="visit-name" name="name" required placeholder="Enter your full name">
        </div>

        <div class="form-group">
          <label for="visit-phone">Phone Number *</label>
          <input type="tel" id="visit-phone" name="phone" required placeholder="+91 XXXXX XXXXX" pattern="[0-9+\s\-()]+">
        </div>

        <div class="form-group">
          <label for="visit-email">Email Address</label>
          <input type="email" id="visit-email" name="email" placeholder="your.email@example.com">
        </div>

        <div class="form-group">
          <label for="visit-date">Preferred Visit Date *</label>
          <input type="date" id="visit-date" name="preferred-date" required min="{{ 'now' | date: '%Y-%m-%d' }}">
        </div>

        <div class="form-group">
          <label for="visit-time">Preferred Visit Time *</label>
          <select id="visit-time" name="preferred-time" required>
            <option value="">Select a time slot</option>
            <option value="9am-10am">9:00 AM - 10:00 AM</option>
            <option value="10am-11am">10:00 AM - 11:00 AM</option>
            <option value="11am-12pm">11:00 AM - 12:00 PM</option>
            <option value="12pm-1pm">12:00 PM - 1:00 PM</option>
          </select>
        </div>

        <div class="form-group">
          <label for="visit-class">Class/Grade of Interest *</label>
          <select id="visit-class" name="class-interest" required>
            <option value="">Select class</option>
            <option value="nursery">Nursery/Pre-Primary</option>
            <option value="class-1-5">Class 1 to 5</option>
            <option value="class-6-8">Class 6 to 8</option>
            <option value="class-9-10">Class 9 to 10</option>
            <option value="class-11-12">Class 11 to 12</option>
          </select>
        </div>

        <div class="form-group">
          <label for="visit-notes">Additional Notes</label>
          <textarea id="visit-notes" name="notes" rows="3" placeholder="Any specific areas you'd like to see or questions you have"></textarea>
        </div>

        <button type="submit" class="btn btn-submit">Schedule Visit</button>
        <p class="form-note">We'll confirm your visit via phone within 24 hours. Please note: Office hours are Monday-Saturday, 8 AM - 2 PM.</p>
      </form>
    </div>
  </section>
</main>
{% include footer.html %}
