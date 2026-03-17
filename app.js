let taps = [];
const maxSamples = 8;

const bpmDisplay = document.getElementById("bpm");
const rpmDisplay = document.getElementById("rpm");

document.getElementById("tapBtn").addEventListener("click", tap);
document.getElementById("resetBtn").addEventListener("click", reset);

function tap() {
  const now = Date.now();
  taps.push(now);

  if (taps.length > maxSamples) {
    taps.shift();
  }

  if (taps.length > 1) {
    let intervals = [];
    for (let i = 1; i < taps.length; i++) {
      intervals.push(taps[i] - taps[i - 1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
    const bpm = Math.round(60000 / avgInterval);

    bpmDisplay.textContent = bpm;

    let rpm;
    if (bpm <= 110) {
      rpm = bpm;
    } else {
      rpm = Math.round(bpm / 2);
    }

    rpmDisplay.textContent = rpm;
  }
}

function reset() {
  taps = [];
  bpmDisplay.textContent = "0";
  rpmDisplay.textContent = "0";
}
