document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar shadow on scroll ---------- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 4px 22px rgba(10,47,92,0.16)';
    } else {
      nav.style.boxShadow = '0 2px 18px rgba(10,47,92,0.08)';
    }
  });

  /* ---------- Collapse mobile nav on link click ---------- */
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const navContent = document.getElementById('navContent');
      if (navContent.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navContent).hide();
      }
    });
  });

  /* ---------- Currency formatter ---------- */
  function formatINR(num) {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  /* ---------- EMI Calculator ---------- */
  const emiAmount = document.getElementById('emiAmount');
  const emiRate = document.getElementById('emiRate');
  const emiTenure = document.getElementById('emiTenure');

  function calcEMI() {
    const P = parseFloat(emiAmount.value);
    const annualRate = parseFloat(emiRate.value);
    const n = parseInt(emiTenure.value, 10);
    const r = annualRate / 12 / 100;

    let emi;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    document.getElementById('emiAmountVal').textContent = formatINR(P);
    document.getElementById('emiRateVal').textContent = annualRate + '%';
    document.getElementById('emiTenureVal').textContent = n;

    document.getElementById('emiResult').textContent = formatINR(emi);
    document.getElementById('emiPrincipal').textContent = formatINR(P);
    document.getElementById('emiInterest').textContent = formatINR(totalInterest);
    document.getElementById('emiTotal').textContent = formatINR(totalPayment);
  }

  [emiAmount, emiRate, emiTenure].forEach(function (el) {
    if (el) el.addEventListener('input', calcEMI);
  });
  if (emiAmount) calcEMI();

  /* ---------- FD Calculator (quarterly compounding) ---------- */
  const fdAmount = document.getElementById('fdAmount');
  const fdRate = document.getElementById('fdRate');
  const fdTenure = document.getElementById('fdTenure');

  function calcFD() {
    const P = parseFloat(fdAmount.value);
    const annualRate = parseFloat(fdRate.value);
    const years = parseInt(fdTenure.value, 10);
    const n = 4; // quarterly compounding
    const r = annualRate / 100;

    const maturity = P * Math.pow(1 + r / n, n * years);
    const interest = maturity - P;

    document.getElementById('fdAmountVal').textContent = formatINR(P);
    document.getElementById('fdRateVal').textContent = annualRate + '%';
    document.getElementById('fdTenureVal').textContent = years;

    document.getElementById('fdResult').textContent = formatINR(maturity);
    document.getElementById('fdPrincipal').textContent = formatINR(P);
    document.getElementById('fdInterest').textContent = formatINR(interest);
    document.getElementById('fdTotal').textContent = formatINR(maturity);
  }

  [fdAmount, fdRate, fdTenure].forEach(function (el) {
    if (el) el.addEventListener('input', calcFD);
  });
  if (fdAmount) calcFD();

});
