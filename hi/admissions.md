---
layout: default
title: प्रवेश
permalink: /hi/admissions/
---

{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<main class="container admissions lang-hi">
  <section class="admissions-intro">
    <h1>प्रवेश</h1>
    <p>हम आपके बच्चे का स्वागत करने के लिए उत्सुक हैं। नीचे दी गई प्रक्रिया पढ़ें और विवरण साझा करें ताकि हमारी टीम आपसे शीघ्र संपर्क कर सके।</p>
    <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener" aria-label="प्रवेश हेतु व्हाट्सएप पर बात करें">व्हाट्सएप पर बात करें</a></p>
  </section>

  <section class="admission-form-section">
    <h2>प्रवेश पूछताछ फॉर्म</h2>
    <form class="admission-form" aria-label="वीर पत्ता पब्लिक स्कूल प्रवेश पूछताछ फॉर्म">
      <div class="form-group">
        <label for="student-name-hi">विद्यार्थी का नाम</label>
        <input id="student-name-hi" name="student_name" type="text" required>
      </div>
      <div class="form-group">
        <label for="guardian-name-hi">अभिभावक का नाम</label>
        <input id="guardian-name-hi" name="guardian_name" type="text" required>
      </div>
      <div class="form-group">
        <label for="phone-number-hi">संपर्क नंबर</label>
        <input id="phone-number-hi" name="phone_number" type="tel" inputmode="tel" required>
      </div>
      <div class="form-group">
        <label for="grade-hi">कक्षा</label>
        <select id="grade-hi" name="grade" required>
          <option value="" disabled selected>कक्षा चुनें</option>
          <option value="nursery">नर्सरी</option>
          <option value="kg">एलकेजी / यूकेजी</option>
          <option value="primary">कक्षा 1 – 5</option>
          <option value="middle">कक्षा 6 – 8</option>
          <option value="secondary">कक्षा 9 – 10</option>
        </select>
      </div>
      <div class="form-group">
        <label for="age-hi">आयु</label>
        <input id="age-hi" name="age" type="number" min="3" max="18" required>
      </div>
      <div class="form-group">
        <label for="current-school-hi">वर्तमान विद्यालय</label>
        <input id="current-school-hi" name="current_school" type="text" required>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn">जमा करें</button>
      </div>
    </form>
  </section>

  <section class="fees">
    <h2>शुल्क संरचना 2024–25</h2>
    <div class="fees-table-wrapper">
      <table>
        <thead>
          <tr><th scope="col">योजना</th><th scope="col">राशि</th></tr>
        </thead>
        <tbody>
          <tr><td>मासिक</td><td>₹ 2,083 / माह</td></tr>
          <tr><td>त्रैमासिक</td><td>₹ 6,250 / तिमाही</td></tr>
          <tr><td>वार्षिक</td><td>₹ 25,000 / वर्ष (10% छूट)</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="timeline">
    <h2>प्रवेश प्रक्रिया</h2>
    <ol class="timeline-steps">
      <li tabindex="0"><h3>पूछताछ एवं परिसर भ्रमण</h3><p>फ़ोन/व्हाट्सएप से समय तय करें और परिसर देखें।</p></li>
      <li tabindex="0"><h3>आवेदन जमा</h3><p>आवश्यक दस्तावेज़ों के साथ पूछताछ फ़ॉर्म जमा करें।</p></li>
      <li tabindex="0"><h3>परिचय एवं मूल्यांकन</h3><p>अनौपचारिक परिचय और आधारभूत परीक्षण।</p></li>
      <li tabindex="0"><h3>पुष्टि एवं शुल्क जमा</h3><p>प्रवेश शुल्क जमा कर सीट सुनिश्चित करें।</p></li>
    </ol>
  </section>
</main>

{% include whatsapp.html %}
{% include footer.html %}
