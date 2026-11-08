const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class MockElement {
  constructor(name = '') {
    this.name = name;
    this.listeners = {};
    this.style = {};
    this.dataset = {};
    this.value = '';
    this.checked = false;
    this.innerHTML = '';
    this.textContent = '';
    this.disabled = false;
    this.parentElement = null;
    this.classList = {
      add() {},
      remove() {},
      contains() { return false; }
    };
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  scrollIntoView() {}
}

function loadAdmissionWizard(lang = 'hi') {
  const progressBar = new MockElement('progressBar');
  const progressFill = new MockElement('progressFill');
  const progressText = new MockElement('progressText');
  const stepsContainer = new MockElement('stepsContainer');
  const contentContainer = new MockElement('contentContainer');
  const prevBtn = new MockElement('prevBtn');
  const nextBtn = new MockElement('nextBtn');
  const whatsappBtn = new MockElement('whatsappBtn');

  const wizard = new MockElement('wizard');
  wizard.querySelector = (selector) => ({
    '.wizard-progress-bar': progressBar,
    '.wizard-progress-fill': progressFill,
    '.wizard-progress-text': progressText,
    '.wizard-steps': stepsContainer,
    '.wizard-content': contentContainer,
    '.wizard-btn-prev': prevBtn,
    '.wizard-btn-next': nextBtn,
    '.wizard-btn-whatsapp': whatsappBtn
  }[selector] || null);
  wizard.querySelectorAll = () => [];

  const document = {
    readyState: 'complete',
    documentElement: { lang },
    querySelector: (selector) => selector === '.admission-wizard' ? wizard : null,
    querySelectorAll: () => [],
    addEventListener() {}
  };

  const context = {
    console,
    window: {
      open() {},
      localStorage: {
        getItem() { return null; },
        setItem() {},
        removeItem() {}
      }
    },
    document,
    localStorage: {
      getItem() { return null; },
      setItem() {},
      removeItem() {}
    },
    setTimeout,
    clearTimeout,
    Date
  };
  context.window.document = document;
  context.window.AdmissionWizard = null;

  const script = fs.readFileSync(path.join(process.cwd(), 'assets/js/admission-wizard.js'), 'utf8');
  vm.runInNewContext(script, context, { filename: 'assets/js/admission-wizard.js' });

  return { contentContainer };
}

test('Hindi admission wizard renders localized grade placeholder and class labels', () => {
  const { contentContainer } = loadAdmissionWizard('hi');

  assert.match(contentContainer.innerHTML, /चुनें\.\.\./, 'expected Hindi select placeholder');
  assert.match(contentContainer.innerHTML, /कक्षा 1/, 'expected Hindi class label');
  assert.doesNotMatch(contentContainer.innerHTML, /Select\.\.\./, 'did not expect English select placeholder on Hindi page');
  assert.doesNotMatch(contentContainer.innerHTML, /Class 1/, 'did not expect English class label on Hindi page');
});
