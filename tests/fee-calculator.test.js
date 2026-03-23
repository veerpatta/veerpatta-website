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

  click() {
    if (this.listeners.click) {
      this.listeners.click({ preventDefault() {} });
    }
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  scrollIntoView() {}
}

function loadFeeCalculator({ openImpl }) {
  const gradeSelect = new MockElement('gradeSelect');
  const siblingsInput = new MockElement('siblingsInput');
  const transportCheckbox = new MockElement('transportCheckbox');
  const transportZoneSelect = new MockElement('transportZoneSelect');
  transportZoneSelect.parentElement = new MockElement('transportZoneWrapper');
  const meritCheckbox = new MockElement('meritCheckbox');
  const earlyBirdCheckbox = new MockElement('earlyBirdCheckbox');
  const calculateBtn = new MockElement('calculateBtn');
  const resultContainer = new MockElement('resultContainer');
  const breakdownContainer = new MockElement('breakdownContainer');
  const totalAmountElement = new MockElement('totalAmountElement');
  const whatsappBtn = new MockElement('whatsappBtn');
  const printBtn = new MockElement('printBtn');
  const paymentRadio = new MockElement('paymentRadio');

  const calculator = new MockElement('calculator');
  calculator.querySelector = (selector) => ({
    '#fee_grade': gradeSelect,
    '#fee_siblings': siblingsInput,
    '#fee_transport': transportCheckbox,
    '#fee_transport_zone': transportZoneSelect,
    '#fee_merit': meritCheckbox,
    '#fee_earlybird': earlyBirdCheckbox,
    '.btn-calculate': calculateBtn,
    '.fee-result': resultContainer,
    '.fee-breakdown': breakdownContainer,
    '.total-amount': totalAmountElement,
    '.btn-whatsapp-share': whatsappBtn,
    '.btn-print-fee': printBtn
  }[selector] || null);
  calculator.querySelectorAll = (selector) => selector === 'input[name="payment_plan"]' ? [paymentRadio] : [];

  const alerts = [];
  const document = {
    readyState: 'complete',
    documentElement: { lang: 'en' },
    querySelector: (selector) => selector === '.fee-calculator' ? calculator : null,
    addEventListener() {}
  };

  const context = {
    console,
    window: {
      open: openImpl,
      alert: (message) => alerts.push(message)
    },
    document,
    alert: (message) => alerts.push(message),
    setTimeout: (fn) => { fn(); return 1; },
    clearTimeout,
    Date
  };
  context.window.document = document;
  context.window.FeeCalculator = null;

  const script = fs.readFileSync(path.join(process.cwd(), 'assets/js/fee-calculator.js'), 'utf8');
  vm.runInNewContext(script, context, { filename: 'assets/js/fee-calculator.js' });

  return { printBtn, alerts };
}

test('Print/PDF handler fails gracefully when the browser blocks popups', () => {
  const { printBtn, alerts } = loadFeeCalculator({ openImpl: () => null });

  assert.doesNotThrow(() => printBtn.click(), 'print click should not throw when window.open is blocked');
  assert.equal(alerts.length, 1, 'expected a user-facing alert when popup is blocked');
  assert.match(alerts[0], /allow popups|enable popups/i);
});
