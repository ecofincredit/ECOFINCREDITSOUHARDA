/* =====================================================
   ECOFIN CREDIT SOUHARDA SAHAKARI — MAIN JS
   Website settings: toggle features without editing HTML
===================================================== */

const WEBSITE_SETTINGS = {
  showStaffLogin:   false,   // Set to false to hide Staff Login button
  showMemberLogin:  true,   // Set to false to hide Members Login button
  showCareers:      true    // Set to false to hide Careers nav item + section
};

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Apply WEBSITE_SETTINGS ---------- */

  // Staff Login button
  var btnStaff = document.getElementById('btnStaffLogin');
  if (btnStaff && !WEBSITE_SETTINGS.showStaffLogin) {
    btnStaff.style.display = 'none';
  }

  // Members Login button
  var btnMembers = document.getElementById('btnMembersLogin');
  if (btnMembers && !WEBSITE_SETTINGS.showMemberLogin) {
    btnMembers.style.display = 'none';
  }

  // Careers nav item + section
  var navCareers     = document.getElementById('navCareers');
  var careersSection = document.getElementById('careers');
  if (!WEBSITE_SETTINGS.showCareers) {
    if (navCareers)     navCareers.style.display     = 'none';
    if (careersSection) careersSection.style.display = 'none';
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar shadow on scroll ---------- */
  var nav = document.getElementById('mainNav');
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
      var navContent = document.getElementById('navContent');
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
  var emiAmount = document.getElementById('emiAmount');
  var emiRate   = document.getElementById('emiRate');
  var emiTenure = document.getElementById('emiTenure');

  function calcEMI() {
    var P = parseFloat(emiAmount.value);
    var annualRate = parseFloat(emiRate.value);
    var n = parseInt(emiTenure.value, 10);
    var r = annualRate / 12 / 100;

    var emi;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    var totalPayment  = emi * n;
    var totalInterest = totalPayment - P;

    document.getElementById('emiAmountVal').textContent = formatINR(P);
    document.getElementById('emiRateVal').textContent   = annualRate + '%';
    document.getElementById('emiTenureVal').textContent = n;

    document.getElementById('emiResult').textContent    = formatINR(emi);
    document.getElementById('emiPrincipal').textContent = formatINR(P);
    document.getElementById('emiInterest').textContent  = formatINR(totalInterest);
    document.getElementById('emiTotal').textContent     = formatINR(totalPayment);
  }

  [emiAmount, emiRate, emiTenure].forEach(function (el) {
    if (el) el.addEventListener('input', calcEMI);
  });
  if (emiAmount) calcEMI();

  /* ---------- FD Calculator (quarterly compounding) ---------- */
  var fdAmount = document.getElementById('fdAmount');
  var fdRate   = document.getElementById('fdRate');
  var fdTenure = document.getElementById('fdTenure');

  function calcFD() {
    var P = parseFloat(fdAmount.value);
    var annualRate = parseFloat(fdRate.value);
    var years = parseInt(fdTenure.value, 10);
    var n = 4; // quarterly compounding
    var r = annualRate / 100;

    var maturity = P * Math.pow(1 + r / n, n * years);
    var interest = maturity - P;

    document.getElementById('fdAmountVal').textContent = formatINR(P);
    document.getElementById('fdRateVal').textContent   = annualRate + '%';
    document.getElementById('fdTenureVal').textContent = years;

    document.getElementById('fdResult').textContent    = formatINR(maturity);
    document.getElementById('fdPrincipal').textContent = formatINR(P);
    document.getElementById('fdInterest').textContent  = formatINR(interest);
    document.getElementById('fdTotal').textContent     = formatINR(maturity);
  }

  [fdAmount, fdRate, fdTenure].forEach(function (el) {
    if (el) el.addEventListener('input', calcFD);
  });
  if (fdAmount) calcFD();

});
