
const body = document.body;
const template = body.dataset.template;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});



const volume = document.getElementById('volume');
const aov = document.getElementById('aov');
const uplift = document.getElementById('uplift');
const cost = document.getElementById('cost');
const outMargin = document.getElementById('out-margin');
const outNet = document.getElementById('out-net');
const outReco = document.getElementById('out-reco');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function recalc() {
  const monthlyVolume = Number(volume?.value || 0);
  const orderValue = Number(aov?.value || 0);
  const upliftPct = Number(uplift?.value || 0) / 100;
  const monthlyCost = Number(cost?.value || 0);
  const addedMargin = monthlyVolume * orderValue * upliftPct;
  const net = addedMargin - monthlyCost;
  if (outMargin) outMargin.textContent = formatCurrency(addedMargin);
  if (outNet) outNet.textContent = formatCurrency(net);
  if (outReco) {
    outReco.textContent = net >= 0
      ? 'Proceed with the structured rollout. The model clears monthly cost with room to spare.'
      : 'Revise volume assumptions before rollout. Current scenario does not clear monthly cost.';
  }
}

[volume, aov, uplift, cost].forEach((node) => node?.addEventListener('input', recalc));
recalc();

