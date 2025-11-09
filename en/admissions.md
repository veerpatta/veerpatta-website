---
layout: default
title: Admissions
permalink: /en/admissions/
---

{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="container admissions">
  <section class="admissions-intro">
    <h1>Admissions</h1>
    <p>We are excited to welcome new families to Veer Patta Public School. Review the key steps below and share your details so our team can guide you through the process.</p>
    <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener" aria-label="Chat on WhatsApp about admissions">Chat on WhatsApp</a></p>
  </section>

  <section class="admission-form-section">
    <h2>Admission Enquiry Form</h2>
    <form class="admission-form" aria-label="Veer Patta Public School admissions enquiry form">
      <div class="form-group">
        <label for="student-name">Student Name</label>
        <input id="student-name" name="student_name" type="text" required>
      </div>
      <div class="form-group">
        <label for="guardian-name">Parent / Guardian Name</label>
        <input id="guardian-name" name="guardian_name" type="text" required>
      </div>
      <div class="form-group">
        <label for="phone-number">Contact Number</label>
        <input id="phone-number" name="phone_number" type="tel" inputmode="tel" required>
      </div>
      <div class="form-group">
        <label for="grade">Grade Seeking Admission To</label>
        <select id="grade" name="grade" required>
          <option value="" disabled selected>Select Grade</option>
          <option value="nursery">Nursery</option>
          <option value="kg">LKG / UKG</option>
          <option value="primary">Class 1 – 5</option>
          <option value="middle">Class 6 – 8</option>
          <option value="secondary">Class 9 – 10</option>
        </select>
      </div>
      <div class="form-group">
        <label for="age">Student Age</label>
        <input id="age" name="age" type="number" min="3" max="18" required>
      </div>
      <div class="form-group">
        <label for="current-school">Current School</label>
        <input id="current-school" name="current_school" type="text" required>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  </section>

  <section class="fees">
    <h2>Fee Structure 2024–25</h2>
    <div class="fees-table-wrapper">
      <table>
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Monthly</td><td>₹ 2,083 / month</td></tr>
          <tr><td>Quarterly</td><td>₹ 6,250 / quarter</td></tr>
          <tr><td>Annual</td><td>₹ 25,000 / year (10% discount)</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="timeline">
    <h2>Admission Process</h2>
    <ol class="timeline-steps">
      <li tabindex="0"><h3>Enquiry & Campus Visit</h3><p>Call or WhatsApp us to fix a visit and explore the campus.</p></li>
      <li tabindex="0"><h3>Application Submission</h3><p>Submit the enquiry form with the required documents.</p></li>
      <li tabindex="0"><h3>Interaction & Assessment</h3><p>Friendly interaction and baseline readiness check.</p></li>
      <li tabindex="0"><h3>Confirmation & Fee Payment</h3><p>Confirm the seat by paying the admission fee.</p></li>
    </ol>
  </section>
</main>

{% include whatsapp.html %}
{% include footer.html %}
