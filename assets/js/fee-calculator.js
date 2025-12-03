/* ============================================
   FEE CALCULATOR
   Smart fee calculator with grade selection, discounts, and WhatsApp sharing
   Mobile-optimized with print/PDF export
   ============================================ */
(function initFeeCalculator() {
  'use strict';

  // Fee structure (in INR)
  const feeStructure = {
    nursery: { tuition: 18000, admission: 2000, books: 1500, uniform: 2000 },
    lkg: { tuition: 18000, admission: 2000, books: 1800, uniform: 2000 },
    ukg: { tuition: 18000, admission: 2000, books: 1800, uniform: 2000 },
    class1: { tuition: 20000, admission: 2500, books: 2500, uniform: 2500 },
    class2: { tuition: 20000, admission: 2500, books: 2500, uniform: 2500 },
    class3: { tuition: 22000, admission: 2500, books: 3000, uniform: 2500 },
    class4: { tuition: 22000, admission: 2500, books: 3000, uniform: 2500 },
    class5: { tuition: 24000, admission: 2500, books: 3500, uniform: 2500 },
    class6: { tuition: 26000, admission: 3000, books: 4000, uniform: 3000 },
    class7: { tuition: 26000, admission: 3000, books: 4000, uniform: 3000 },
    class8: { tuition: 28000, admission: 3000, books: 4500, uniform: 3000 },
    class9: { tuition: 30000, admission: 3500, books: 5000, uniform: 3500 },
    class10: { tuition: 32000, admission: 3500, books: 5500, uniform: 3500 },
    class11: { tuition: 35000, admission: 4000, books: 6000, uniform: 4000 },
    class12: { tuition: 35000, admission: 4000, books: 6000, uniform: 4000 }
  };

  // Transport fees by zone (annual)
  const transportFees = {
    zone1: 8000,  // Within 5km
    zone2: 12000, // 5-10km
    zone3: 16000, // 10-15km
    zone4: 20000  // 15km+
  };

  // Discount rates
  const discounts = {
    sibling: 0.10,      // 10% sibling discount
    annual: 0.10,       // 10% discount for annual payment
    merit: 0.15,        // 15% merit scholarship
    earlyBird: 0.05     // 5% early registration discount
  };

  // Configuration
  const config = {
    whatsappNumber: '919413748575'
  };

  // State
  let calculationData = {
    grade: '',
    siblings: 0,
    paymentPlan: 'quarterly',
    transport: false,
    transportZone: 'zone1',
    applyMerit: false,
    applyEarlyBird: false
  };

  // DOM Elements
  const calculator = document.querySelector('.fee-calculator');
  if (!calculator) return; // Exit if no calculator on page

  const gradeSelect = calculator.querySelector('#fee_grade');
  const siblingsInput = calculator.querySelector('#fee_siblings');
  const paymentPlanRadios = calculator.querySelectorAll('input[name="payment_plan"]');
  const transportCheckbox = calculator.querySelector('#fee_transport');
  const transportZoneSelect = calculator.querySelector('#fee_transport_zone');
  const meritCheckbox = calculator.querySelector('#fee_merit');
  const earlyBirdCheckbox = calculator.querySelector('#fee_earlybird');
  const calculateBtn = calculator.querySelector('.btn-calculate');
  const resultContainer = calculator.querySelector('.fee-result');
  const breakdownContainer = calculator.querySelector('.fee-breakdown');
  const totalAmountElement = calculator.querySelector('.total-amount');
  const whatsappBtn = calculator.querySelector('.btn-whatsapp-share');
  const printBtn = calculator.querySelector('.btn-print-fee');

  // Detect language
  const lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';

  /* ============================================
     INITIALIZATION
     ============================================ */
  function init() {
    // Add event listeners
    if (gradeSelect) gradeSelect.addEventListener('change', handleGradeChange);
    if (siblingsInput) siblingsInput.addEventListener('input', handleSiblingsChange);
    if (transportCheckbox) transportCheckbox.addEventListener('change', handleTransportChange);
    if (transportZoneSelect) transportZoneSelect.addEventListener('change', handleTransportZoneChange);
    if (meritCheckbox) meritCheckbox.addEventListener('change', handleMeritChange);
    if (earlyBirdCheckbox) earlyBirdCheckbox.addEventListener('change', handleEarlyBirdChange);
    if (calculateBtn) calculateBtn.addEventListener('click', calculateFees);
    if (whatsappBtn) whatsappBtn.addEventListener('click', shareViaWhatsApp);
    if (printBtn) printBtn.addEventListener('click', printFeeDetails);

    paymentPlanRadios.forEach(radio => {
      radio.addEventListener('change', handlePaymentPlanChange);
    });

    // Initially hide transport zone selector
    if (transportZoneSelect) {
      transportZoneSelect.parentElement.style.display = 'none';
    }
  }

  /* ============================================
     EVENT HANDLERS
     ============================================ */
  function handleGradeChange(e) {
    calculationData.grade = e.target.value;
  }

  function handleSiblingsChange(e) {
    const value = parseInt(e.target.value, 10);
    calculationData.siblings = Number.isFinite(value) && value > 0 ? value : 0;
    if (e.target.value && calculationData.siblings === 0) {
      e.target.value = '0';
    }
  }

  function handlePaymentPlanChange(e) {
    calculationData.paymentPlan = e.target.value;
  }

  function handleTransportChange(e) {
    calculationData.transport = e.target.checked;

    if (transportZoneSelect) {
      transportZoneSelect.parentElement.style.display = e.target.checked ? 'block' : 'none';
    }
  }

  function handleTransportZoneChange(e) {
    calculationData.transportZone = e.target.value;
  }

  function handleMeritChange(e) {
    calculationData.applyMerit = e.target.checked;
  }

  function handleEarlyBirdChange(e) {
    calculationData.applyEarlyBird = e.target.checked;
  }

  /* ============================================
     CALCULATION
     ============================================ */
  function calculateFees() {
    const { grade, siblings, paymentPlan, transport, transportZone, applyMerit, applyEarlyBird } = calculationData;

    if (!grade) {
      alert(lang === 'hi' ? 'कृपया कक्षा चुनें' : 'Please select a grade');
      return;
    }

    if (siblings < 0) {
      alert(lang === 'hi' ? 'भाई-बहन की संख्या 0 या अधिक होनी चाहिए' : 'Sibling count must be 0 or more');
      return;
    }

    // Get base fees
    const gradeFees = feeStructure[grade];
    if (!gradeFees) {
      alert(lang === 'hi' ? 'अमान्य कक्षा' : 'Invalid grade');
      return;
    }

    // Calculate subtotal
    let subtotal = gradeFees.tuition + gradeFees.admission + gradeFees.books + gradeFees.uniform;

    // Add transport if selected
    let transportFee = 0;
    if (transport) {
      if (!transportZone) {
        alert(lang === 'hi' ? 'कृपया परिवहन ज़ोन चुनें' : 'Please select a transport zone');
        return;
      }
      transportFee = transportFees[transportZone] || 0;
      subtotal += transportFee;
    }

    // Calculate discounts
    let totalDiscount = 0;
    const appliedDiscounts = [];

    // Sibling discount
    if (siblings > 0) {
      const siblingDiscount = gradeFees.tuition * discounts.sibling;
      totalDiscount += siblingDiscount;
      appliedDiscounts.push({
        name: lang === 'hi' ? 'भाई-बहन छूट' : 'Sibling Discount',
        amount: siblingDiscount
      });
    }

    // Annual payment discount
    if (paymentPlan === 'annually') {
      const annualDiscount = gradeFees.tuition * discounts.annual;
      totalDiscount += annualDiscount;
      appliedDiscounts.push({
        name: lang === 'hi' ? 'वार्षिक भुगतान छूट' : 'Annual Payment Discount',
        amount: annualDiscount
      });
    }

    // Merit scholarship
    if (applyMerit) {
      const meritDiscount = gradeFees.tuition * discounts.merit;
      totalDiscount += meritDiscount;
      appliedDiscounts.push({
        name: lang === 'hi' ? 'मेरिट छात्रवृत्ति' : 'Merit Scholarship',
        amount: meritDiscount
      });
    }

    // Early bird discount
    if (applyEarlyBird) {
      const earlyBirdDiscount = subtotal * discounts.earlyBird;
      totalDiscount += earlyBirdDiscount;
      appliedDiscounts.push({
        name: lang === 'hi' ? 'प्रारंभिक पंजीकरण छूट' : 'Early Registration Discount',
        amount: earlyBirdDiscount
      });
    }

    // Calculate final total
    const total = subtotal - totalDiscount;

    // Calculate installment amount if quarterly
    const installmentAmount = paymentPlan === 'quarterly' ? Math.ceil(total / 4) : total;

    // Display results
    displayResults({
      gradeFees,
      transportFee,
      subtotal,
      appliedDiscounts,
      totalDiscount,
      total,
      paymentPlan,
      installmentAmount
    });
  }

  /* ============================================
     DISPLAY RESULTS
     ============================================ */
  function displayResults(data) {
    const { gradeFees, transportFee, subtotal, appliedDiscounts, totalDiscount, total, paymentPlan, installmentAmount } = data;

    const texts = lang === 'hi' ? {
      breakdown: 'शुल्क विवरण',
      tuition: 'ट्यूशन शुल्क',
      admission: 'प्रवेश शुल्क',
      books: 'पुस्तकें और सामग्री',
      uniform: 'यूनिफॉर्म',
      transport: 'परिवहन शुल्क',
      subtotal: 'उप-योग',
      discounts: 'छूट',
      total: 'कुल राशि',
      quarterly: 'त्रैमासिक किस्त',
      annually: 'वार्षिक भुगतान',
      perQuarter: 'प्रति तिमाही'
    } : {
      breakdown: 'Fee Breakdown',
      tuition: 'Tuition Fee',
      admission: 'Admission Fee',
      books: 'Books & Materials',
      uniform: 'Uniform',
      transport: 'Transport Fee',
      subtotal: 'Subtotal',
      discounts: 'Discounts',
      total: 'Total Amount',
      quarterly: 'Quarterly Installment',
      annually: 'Annual Payment',
      perQuarter: 'per quarter'
    };

    let breakdownHTML = `
      <h4>${texts.breakdown}</h4>
      <table class="fee-table">
        <tbody>
          <tr>
            <td>${texts.tuition}</td>
            <td class="amount">₹${formatNumber(gradeFees.tuition)}</td>
          </tr>
          <tr>
            <td>${texts.admission}</td>
            <td class="amount">₹${formatNumber(gradeFees.admission)}</td>
          </tr>
          <tr>
            <td>${texts.books}</td>
            <td class="amount">₹${formatNumber(gradeFees.books)}</td>
          </tr>
          <tr>
            <td>${texts.uniform}</td>
            <td class="amount">₹${formatNumber(gradeFees.uniform)}</td>
          </tr>
    `;

    if (transportFee > 0) {
      breakdownHTML += `
          <tr>
            <td>${texts.transport}</td>
            <td class="amount">₹${formatNumber(transportFee)}</td>
          </tr>
      `;
    }

    breakdownHTML += `
          <tr class="subtotal-row">
            <td><strong>${texts.subtotal}</strong></td>
            <td class="amount"><strong>₹${formatNumber(subtotal)}</strong></td>
          </tr>
    `;

    if (appliedDiscounts.length > 0) {
      breakdownHTML += `
          <tr class="discount-header">
            <td colspan="2"><strong>${texts.discounts}</strong></td>
          </tr>
      `;

      appliedDiscounts.forEach(discount => {
        breakdownHTML += `
          <tr class="discount-row">
            <td>${discount.name}</td>
            <td class="amount discount">-₹${formatNumber(discount.amount)}</td>
          </tr>
        `;
      });
    }

    breakdownHTML += `
          <tr class="total-row">
            <td><strong>${texts.total}</strong></td>
            <td class="amount"><strong>₹${formatNumber(total)}</strong></td>
          </tr>
        </tbody>
      </table>
    `;

    if (paymentPlan === 'quarterly') {
      breakdownHTML += `
        <div class="payment-plan-info">
          <p><strong>${texts.quarterly}:</strong> ₹${formatNumber(installmentAmount)} ${texts.perQuarter}</p>
        </div>
      `;
    }

    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdownHTML;
    }

    if (totalAmountElement) {
      totalAmountElement.textContent = `₹${formatNumber(total)}`;
    }

    if (resultContainer) {
      resultContainer.style.display = 'block';
      resultContainer.classList.add('animate-fadeIn');

      // Scroll to results
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ============================================
     WHATSAPP SHARING
     ============================================ */
  function shareViaWhatsApp() {
    const message = generateFeeMessage();
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  function generateFeeMessage() {
    const { grade, siblings, paymentPlan, transport, transportZone } = calculationData;

    const gradeText = grade.replace('class', 'Class ');
    const totalText = totalAmountElement ? totalAmountElement.textContent : '';

    const greeting = lang === 'hi' ?
      `नमस्ते,\n\nमैं ${gradeText} के लिए प्रवेश शुल्क के बारे में पूछताछ कर रहा/रही हूं।\n\nकुल राशि: ${totalText}\nभुगतान योजना: ${paymentPlan === 'quarterly' ? 'त्रैमासिक' : 'वार्षिक'}\n${siblings > 0 ? `भाई-बहन: ${siblings}\n` : ''}${transport ? 'परिवहन: हां\n' : ''}\n\nकृपया अधिक जानकारी प्रदान करें।` :
      `Hello,\n\nI'm inquiring about admission fees for ${gradeText}.\n\nTotal Amount: ${totalText}\nPayment Plan: ${paymentPlan === 'quarterly' ? 'Quarterly' : 'Annual'}\n${siblings > 0 ? `Siblings: ${siblings}\n` : ''}${transport ? 'Transport: Yes\n' : ''}\n\nPlease provide more information.`;

    return greeting;
  }

  /* ============================================
     PRINT / PDF EXPORT
     ============================================ */
  function printFeeDetails() {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent();

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }

  function generatePrintContent() {
    const schoolName = lang === 'hi' ? 'वीर पट्टा पब्लिक स्कूल' : 'Veer Patta Public School';
    const feeEstimate = lang === 'hi' ? 'शुल्क अनुमान' : 'Fee Estimate';
    const breakdownHTML = breakdownContainer ? breakdownContainer.innerHTML : '';

    return `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${feeEstimate} - ${schoolName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: ${lang === 'hi' ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif"};
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 { color: #5375E2; margin-bottom: 10px; }
          h2 { color: #333; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td, th { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .amount { text-align: right; font-weight: 600; }
          .total-row { background: #f0f0f0; font-size: 1.2em; }
          .discount { color: #84AC64; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #5375E2; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${schoolName}</h1>
        <h2>${feeEstimate}</h2>
        ${breakdownHTML}
        <div class="footer">
          <p><strong>${lang === 'hi' ? 'संपर्क:' : 'Contact:'}</strong> +91 94137 48575</p>
          <p><strong>${lang === 'hi' ? 'पता:' : 'Address:'}</strong> ${lang === 'hi' ? 'मेला ग्राउंड के सामने, अमेट, राजस्थान - 313332' : 'Opp. Mela Ground, Amet, Rajasthan - 313332'}</p>
          <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
            ${lang === 'hi' ? 'यह एक अनुमान है। वास्तविक शुल्क भिन्न हो सकता है।' : 'This is an estimate. Actual fees may vary.'}
          </p>
        </div>
      </body>
      </html>
    `;
  }

  /* ============================================
     UTILITIES
     ============================================ */
  function formatNumber(num) {
    return num.toLocaleString('en-IN');
  }

  /* ============================================
     PUBLIC API
     ============================================ */
  const PublicAPI = {
    calculate: calculateFees,
    getCalculationData: () => calculationData
  };

  window.FeeCalculator = PublicAPI;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
