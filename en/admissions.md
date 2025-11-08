---
layout: default
title: Admissions (EN)
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<section class="hero container">
  <h1>Your Child's Bright Future Starts Here</h1>
  <p>Join 500+ families who trust Veer Patta Public School.</p>
  <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener" aria-label="Chat on WhatsApp about admissions">Chat on WhatsApp</a></p>
</section>

<section class="container">
  <h2>Quick Inquiry Form</h2>
  <form class="admission-form" aria-label="Admission inquiry (no online submission)">
    <label>Name * <input type="text" name="name" required></label>
    <label>Mobile * <input type="tel" name="mobile" inputmode="tel" required></label>
    <label>Child's Age * <input type="number" name="age" required></label>
    <label>Class Seeking * <input type="text" name="class" required></label>
    <label>Previous School <input type="text" name="prevschool"></label>
    <label>Preferred Language <select name="lang"><option>English</option><option>Hindi</option></select></label>
    <button type="submit" class="btn">Submit (enquiry only)</button>
  </form>
  <p style="font-size:.9rem;opacity:.8">Note: This is a simple enquiry form. We'll contact you on WhatsApp or phone.</p>
</section>

<section class="container">
  <h2>Fee Structure</h2>
  <table class="fees" aria-label="Fee structure">
    <thead><tr><th>Plan</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Monthly</td><td>₹ 2,083 / month</td></tr>
      <tr><td>Quarterly</td><td>₹ 6,250 / quarter</td></tr>
      <tr><td>Annual</td><td>₹ 25,000 / year (10% discount)</td></tr>
    </tbody>
  </table>
</section>

<section class="container">
  <h2>Admission Process</h2>
  <ol class="timeline">
    <li>Inquiry → Start on WhatsApp</li>
    <li>School Visit → Tour our campus</li>
    <li>Documents → Submit required papers</li>
    <li>Confirmation → Receive Welcome Kit</li>
  </ol>
</section>

{% include whatsapp.html %}
{% include footer.html %}
