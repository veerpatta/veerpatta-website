---
layout: default
title: प्रवेश (HI)
lang: hi
---
{% include header.html %}
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<section class="hero container lang-hi">
  <h1>आपके बच्चे का उज्ज्वल भविष्य यहाँ से शुरू होता है</h1>
  <p>500+ परिवारों के साथ जुड़ें जो वीर पट्टा पब्लिक स्कूल पर भरोसा करते हैं।</p>
  <p><a class="btn" href="https://wa.me/919413748575" target="_blank" rel="noopener" aria-label="प्रवेश के लिए व्हाट्सऐप पर संपर्क करें">व्हाट्सऐप पर संपर्क करें</a></p>
</section>

<section class="container lang-hi">
  <h2>त्वरित पूछताछ फॉर्म</h2>
  <form class="admission-form" aria-label="प्रवेश पूछताछ (कोई ऑनलाइन सबमिशन नहीं)">
    <label>नाम * <input type="text" name="name" required></label>
    <label>मोबाइल * <input type="tel" name="mobile" inputmode="tel" required></label>
    <label>बच्चे की उम्र * <input type="number" name="age" required></label>
    <label>कक्षा * <input type="text" name="class" required></label>
    <label>पिछला स्कूल <input type="text" name="prevschool"></label>
    <label>पसंदीदा भाषा <select name="lang"><option>English</option><option>Hindi</option></select></label>
    <button type="submit" class="btn">भेजें (केवल पूछताछ)</button>
  </form>
  <p style="font-size:.9rem;opacity:.8">नोट: यह एक साधारण पूछताछ फॉर्म है। हम आपको व्हाट्सऐप या फोन पर संपर्क करेंगे।</p>
</section>

<section class="container lang-hi">
  <h2>फीस संरचना</h2>
  <table class="fees" aria-label="फीस संरचना">
    <thead><tr><th>योजना</th><th>राशि</th></tr></thead>
    <tbody>
      <tr><td>मासिक</td><td>₹ 2,083 / माह</td></tr>
      <tr><td>त्रैमासिक</td><td>₹ 6,250 / तिमाही</td></tr>
      <tr><td>वार्षिक</td><td>₹ 25,000 / वर्ष (10% छूट)</td></tr>
    </tbody>
  </table>
</section>

<section class="container lang-hi">
  <h2>प्रवेश प्रक्रिया</h2>
  <ol class="timeline">
    <li>पूछताछ → व्हाट्सऐप पर शुरू करें</li>
    <li>स्कूल का दौरा → हमारे परिसर का भ्रमण करें</li>
    <li>दस्तावेज → आवश्यक कागजात जमा करें</li>
    <li>पुष्टि → स्वागत किट प्राप्त करें</li>
  </ol>
</section>

{% include whatsapp.html %}
{% include footer.html %}
