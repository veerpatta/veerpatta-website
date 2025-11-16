/* ============================================
   ADMISSION WIZARD
   Interactive step-by-step admission process
   With localStorage progress tracking and WhatsApp integration
   Mobile-first bottom sheet pattern
   ============================================ */
(function initAdmissionWizard() {
  'use strict';

  // Configuration
  const config = {
    totalSteps: 5,
    storageKey: 'vps_admission_progress',
    whatsappNumber: '919413748575'
  };

  // State
  let currentStep = 1;
  let formData = {
    step1: { completed: false },
    step2: { completed: false, documents: [] },
    step3: { completed: false },
    step4: { completed: false },
    step5: { completed: false }
  };

  // Step definitions (bilingual)
  const steps = {
    en: [
      { id: 1, title: 'Inquiry', description: 'Basic information' },
      { id: 2, title: 'Documents', description: 'Required documents checklist' },
      { id: 3, title: 'Visit', description: 'Schedule campus visit' },
      { id: 4, title: 'Payment', description: 'Fee payment details' },
      { id: 5, title: 'Confirmation', description: 'Admission confirmed' }
    ],
    hi: [
      { id: 1, title: 'पूछताछ', description: 'बुनियादी जानकारी' },
      { id: 2, title: 'दस्तावेज़', description: 'आवश्यक दस्तावेज़ सूची' },
      { id: 3, title: 'मुलाकात', description: 'परिसर मुलाकात शेड्यूल करें' },
      { id: 4, title: 'भुगतान', description: 'शुल्क भुगतान विवरण' },
      { id: 5, title: 'पुष्टि', description: 'प्रवेश पुष्टि' }
    ]
  };

  // Document checklist (bilingual)
  const documents = {
    en: [
      { id: 'birth_cert', label: 'Birth Certificate', required: true },
      { id: 'aadhar', label: 'Aadhar Card (Student & Parents)', required: true },
      { id: 'photos', label: 'Passport Size Photos (4 copies)', required: true },
      { id: 'transfer_cert', label: 'Transfer Certificate (if applicable)', required: false },
      { id: 'previous_marks', label: 'Previous Year Marksheet', required: true },
      { id: 'caste_cert', label: 'Caste Certificate (if applicable)', required: false }
    ],
    hi: [
      { id: 'birth_cert', label: 'जन्म प्रमाण पत्र', required: true },
      { id: 'aadhar', label: 'आधार कार्ड (छात्र और माता-पिता)', required: true },
      { id: 'photos', label: 'पासपोर्ट साइज फोटो (4 प्रतियां)', required: true },
      { id: 'transfer_cert', label: 'स्थानांतरण प्रमाण पत्र (यदि लागू हो)', required: false },
      { id: 'previous_marks', label: 'पिछले वर्ष की मार्कशीट', required: true },
      { id: 'caste_cert', label: 'जाति प्रमाण पत्र (यदि लागू हो)', required: false }
    ]
  };

  // DOM Elements
  const wizard = document.querySelector('.admission-wizard');
  if (!wizard) return; // Exit if no wizard on page

  const progressBar = wizard.querySelector('.wizard-progress-bar');
  const progressFill = wizard.querySelector('.wizard-progress-fill');
  const progressText = wizard.querySelector('.wizard-progress-text');
  const stepsContainer = wizard.querySelector('.wizard-steps');
  const contentContainer = wizard.querySelector('.wizard-content');
  const prevBtn = wizard.querySelector('.wizard-btn-prev');
  const nextBtn = wizard.querySelector('.wizard-btn-next');
  const whatsappBtn = wizard.querySelector('.wizard-btn-whatsapp');

  // Detect language
  const lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';

  /* ============================================
     INITIALIZATION
     ============================================ */
  function init() {
    // Load saved progress from localStorage
    loadProgress();

    // Render steps navigation
    renderSteps();

    // Render initial content
    renderStepContent(currentStep);

    // Update progress bar
    updateProgressBar();

    // Add event listeners
    if (prevBtn) prevBtn.addEventListener('click', handlePrevClick);
    if (nextBtn) nextBtn.addEventListener('click', handleNextClick);
    if (whatsappBtn) whatsappBtn.addEventListener('click', handleWhatsAppClick);

    // Keyboard navigation
    wizard.addEventListener('keydown', handleKeyDown);
  }

  /* ============================================
     PROGRESS PERSISTENCE
     ============================================ */
  function saveProgress() {
    try {
      const progressData = {
        currentStep,
        formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(config.storageKey, JSON.stringify(progressData));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }

  function loadProgress() {
    try {
      const saved = localStorage.getItem(config.storageKey);
      if (saved) {
        const progressData = JSON.parse(saved);
        currentStep = progressData.currentStep || 1;
        formData = progressData.formData || formData;
      }
    } catch (e) {
      console.warn('Failed to load progress:', e);
    }
  }

  function clearProgress() {
    try {
      localStorage.removeItem(config.storageKey);
      currentStep = 1;
      formData = {
        step1: { completed: false },
        step2: { completed: false, documents: [] },
        step3: { completed: false },
        step4: { completed: false },
        step5: { completed: false }
      };
    } catch (e) {
      console.warn('Failed to clear progress:', e);
    }
  }

  /* ============================================
     RENDERING
     ============================================ */
  function renderSteps() {
    if (!stepsContainer) return;

    const stepsList = steps[lang];
    stepsContainer.innerHTML = stepsList.map((step, index) => {
      const isActive = step.id === currentStep;
      const isCompleted = step.id < currentStep || formData[`step${step.id}`]?.completed;
      const statusClass = isCompleted ? 'completed' : (isActive ? 'active' : '');

      return `
        <div class="wizard-step ${statusClass}" data-step="${step.id}">
          <div class="wizard-step-number">${step.id}</div>
          <div class="wizard-step-info">
            <div class="wizard-step-title">${step.title}</div>
            <div class="wizard-step-description">${step.description}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderStepContent(step) {
    if (!contentContainer) return;

    let content = '';

    switch (step) {
      case 1:
        content = renderStep1();
        break;
      case 2:
        content = renderStep2();
        break;
      case 3:
        content = renderStep3();
        break;
      case 4:
        content = renderStep4();
        break;
      case 5:
        content = renderStep5();
        break;
    }

    contentContainer.innerHTML = content;

    // Attach event listeners for step-specific interactions
    attachStepListeners(step);
  }

  function renderStep1() {
    const texts = lang === 'hi' ? {
      heading: 'प्रवेश पूछताछ शुरू करें',
      intro: 'वीर पट्टा पब्लिक स्कूल में आपकी रुचि के लिए धन्यवाद। आइए आरंभ करें!',
      studentName: 'छात्र का नाम',
      grade: 'कक्षा जिसमें प्रवेश चाहिए',
      parentName: 'अभिभावक का नाम',
      phone: 'मोबाइल नंबर',
      village: 'गांव/शहर'
    } : {
      heading: 'Start Your Admission Inquiry',
      intro: 'Thank you for your interest in Veer Patta Public School. Let\'s get started!',
      studentName: 'Student Name',
      grade: 'Grade Applying For',
      parentName: 'Parent Name',
      phone: 'Mobile Number',
      village: 'Village/Town'
    };

    return `
      <h3>${texts.heading}</h3>
      <p>${texts.intro}</p>
      <div class="wizard-form">
        <div class="form-group">
          <label for="student_name">${texts.studentName}</label>
          <input type="text" id="student_name" name="student_name" required>
        </div>
        <div class="form-group">
          <label for="grade">${texts.grade}</label>
          <select id="grade" name="grade" required>
            <option value="">Select...</option>
            <option value="nursery">Nursery</option>
            <option value="lkg">LKG</option>
            <option value="ukg">UKG</option>
            ${[...Array(12)].map((_, i) => `<option value="${i + 1}">Class ${i + 1}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="parent_name">${texts.parentName}</label>
          <input type="text" id="parent_name" name="parent_name" required>
        </div>
        <div class="form-group">
          <label for="phone">${texts.phone}</label>
          <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>
        </div>
        <div class="form-group">
          <label for="village">${texts.village}</label>
          <input type="text" id="village" name="village" required>
        </div>
      </div>
    `;
  }

  function renderStep2() {
    const texts = lang === 'hi' ? {
      heading: 'आवश्यक दस्तावेज़',
      intro: 'कृपया सुनिश्चित करें कि आपके पास ये दस्तावेज़ हैं:',
      required: 'आवश्यक',
      optional: 'वैकल्पिक'
    } : {
      heading: 'Required Documents',
      intro: 'Please ensure you have these documents ready:',
      required: 'Required',
      optional: 'Optional'
    };

    const docList = documents[lang];

    return `
      <h3>${texts.heading}</h3>
      <p>${texts.intro}</p>
      <div class="document-checklist">
        ${docList.map(doc => `
          <div class="checklist-item">
            <label class="checkbox-label">
              <input type="checkbox" id="${doc.id}" name="${doc.id}" ${formData.step2.documents.includes(doc.id) ? 'checked' : ''}>
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">
                ${doc.label}
                ${doc.required ? `<span class="badge badge-required">${texts.required}</span>` : `<span class="badge badge-optional">${texts.optional}</span>`}
              </span>
            </label>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderStep3() {
    const texts = lang === 'hi' ? {
      heading: 'परिसर मुलाकात शेड्यूल करें',
      intro: 'व्हाट्सएप के माध्यम से परिसर मुलाकात शेड्यूल करें या हमें कॉल करें।',
      date: 'पसंदीदा तिथि',
      time: 'पसंदीदा समय',
      morning: 'सुबह (9:00 - 12:00)',
      afternoon: 'दोपहर (2:00 - 5:00)'
    } : {
      heading: 'Schedule Campus Visit',
      intro: 'Schedule your campus visit via WhatsApp or call us.',
      date: 'Preferred Date',
      time: 'Preferred Time',
      morning: 'Morning (9:00 AM - 12:00 PM)',
      afternoon: 'Afternoon (2:00 PM - 5:00 PM)'
    };

    return `
      <h3>${texts.heading}</h3>
      <p>${texts.intro}</p>
      <div class="wizard-form">
        <div class="form-group">
          <label for="visit_date">${texts.date}</label>
          <input type="date" id="visit_date" name="visit_date" min="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="form-group">
          <label for="visit_time">${texts.time}</label>
          <select id="visit_time" name="visit_time" required>
            <option value="">Select...</option>
            <option value="morning">${texts.morning}</option>
            <option value="afternoon">${texts.afternoon}</option>
          </select>
        </div>
      </div>
    `;
  }

  function renderStep4() {
    const texts = lang === 'hi' ? {
      heading: 'शुल्क विवरण',
      intro: 'शुल्क संरचना और भुगतान विकल्पों के बारे में जानें।',
      quarterly: 'त्रैमासिक भुगतान',
      annually: 'वार्षिक भुगतान (10% छूट)',
      sibling: 'भाई-बहन छूट उपलब्ध',
      transport: 'परिवहन शुल्क (वैकल्पिक)'
    } : {
      heading: 'Fee Details',
      intro: 'Learn about fee structure and payment options.',
      quarterly: 'Quarterly Payment',
      annually: 'Annual Payment (10% discount)',
      sibling: 'Sibling Discount Available',
      transport: 'Transport Fee (Optional)'
    };

    return `
      <h3>${texts.heading}</h3>
      <p>${texts.intro}</p>
      <div class="fee-info">
        <div class="fee-option">
          <input type="radio" id="payment_quarterly" name="payment_plan" value="quarterly">
          <label for="payment_quarterly">${texts.quarterly}</label>
        </div>
        <div class="fee-option">
          <input type="radio" id="payment_annually" name="payment_plan" value="annually">
          <label for="payment_annually">${texts.annually}</label>
        </div>
        <div class="fee-extras">
          <p>✓ ${texts.sibling}</p>
          <p>✓ ${texts.transport}</p>
        </div>
      </div>
    `;
  }

  function renderStep5() {
    const texts = lang === 'hi' ? {
      heading: 'प्रवेश पूर्ण!',
      intro: 'बधाई हो! आपकी प्रवेश प्रक्रिया पूर्ण हो गई है।',
      nextSteps: 'अगले कदम:',
      step1: 'आपको पुष्टि एसएमएस प्राप्त होगी',
      step2: 'अपने शेड्यूल की गई तिथि पर परिसर पर जाएं',
      step3: 'दस्तावेज़ और शुल्क लाएं',
      contact: 'किसी भी प्रश्न के लिए हमसे संपर्क करें'
    } : {
      heading: 'Admission Complete!',
      intro: 'Congratulations! Your admission process is complete.',
      nextSteps: 'Next Steps:',
      step1: 'You will receive a confirmation SMS',
      step2: 'Visit campus on your scheduled date',
      step3: 'Bring documents and fee payment',
      contact: 'Contact us for any questions'
    };

    return `
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h3>${texts.heading}</h3>
        <p>${texts.intro}</p>
        <div class="next-steps">
          <h4>${texts.nextSteps}</h4>
          <ol>
            <li>${texts.step1}</li>
            <li>${texts.step2}</li>
            <li>${texts.step3}</li>
          </ol>
        </div>
        <p>${texts.contact}</p>
      </div>
    `;
  }

  /* ============================================
     STEP LISTENERS
     ============================================ */
  function attachStepListeners(step) {
    if (step === 2) {
      // Document checklist listeners
      const checkboxes = contentContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleDocumentCheck);
      });
    }
  }

  function handleDocumentCheck(e) {
    const docId = e.target.id;
    if (e.target.checked) {
      if (!formData.step2.documents.includes(docId)) {
        formData.step2.documents.push(docId);
      }
    } else {
      formData.step2.documents = formData.step2.documents.filter(id => id !== docId);
    }
    saveProgress();
  }

  /* ============================================
     NAVIGATION
     ============================================ */
  function updateProgressBar() {
    if (!progressFill || !progressText) return;

    const progress = ((currentStep - 1) / (config.totalSteps - 1)) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = lang === 'hi' ? `कदम ${currentStep} का ${config.totalSteps}` : `Step ${currentStep} of ${config.totalSteps}`;

    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentStep === 1;
      prevBtn.style.opacity = currentStep === 1 ? '0.5' : '1';
    }

    if (nextBtn) {
      nextBtn.textContent = currentStep === config.totalSteps ? (lang === 'hi' ? 'पूर्ण' : 'Finish') : (lang === 'hi' ? 'अगला' : 'Next');
    }
  }

  function goToStep(step) {
    if (step < 1 || step > config.totalSteps) return;

    currentStep = step;
    renderSteps();
    renderStepContent(currentStep);
    updateProgressBar();
    saveProgress();

    // Scroll to top of wizard
    wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handlePrevClick() {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }

  function handleNextClick() {
    // Validate current step before proceeding
    if (validateStep(currentStep)) {
      formData[`step${currentStep}`].completed = true;

      if (currentStep < config.totalSteps) {
        goToStep(currentStep + 1);
      } else {
        // Finish - clear progress and show success
        clearProgress();
      }
    }
  }

  function validateStep(step) {
    // Basic validation - can be enhanced
    const requiredInputs = contentContainer.querySelectorAll('input[required], select[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      if (!input.value) {
        isValid = false;
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    return isValid;
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' && currentStep > 1) {
      handlePrevClick();
    } else if (e.key === 'ArrowRight' && currentStep < config.totalSteps) {
      handleNextClick();
    }
  }

  /* ============================================
     WHATSAPP INTEGRATION
     ============================================ */
  function handleWhatsAppClick() {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  function generateWhatsAppMessage() {
    const stepTexts = {
      en: ['Inquiry', 'Documents', 'Visit', 'Payment', 'Confirmation'],
      hi: ['पूछताछ', 'दस्तावेज़', 'मुलाकात', 'भुगतान', 'पुष्टि']
    };

    const greeting = lang === 'hi' ?
      `नमस्ते, मैं वीर पट्टा पब्लिक स्कूल में प्रवेश के बारे में पूछताछ कर रहा/रही हूं।\n\nमैं वर्तमान में कदम ${currentStep} पर हूं: ${stepTexts[lang][currentStep - 1]}\n\nकृपया मेरी मदद करें।` :
      `Hello, I'm inquiring about admission to Veer Patta Public School.\n\nI'm currently on Step ${currentStep}: ${stepTexts[lang][currentStep - 1]}\n\nPlease assist me.`;

    return greeting;
  }

  /* ============================================
     PUBLIC API
     ============================================ */
  const PublicAPI = {
    goToStep,
    getCurrentStep: () => currentStep,
    getFormData: () => formData,
    clearProgress
  };

  window.AdmissionWizard = PublicAPI;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
