const display = document.getElementById('display');
let current = '';

function updateDisplay() {
  display.textContent = current || '0';
}

function toJs(expr) {
  return expr
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(');
}

document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-func');
    if (val === 'C') {
      current = '';
      updateDisplay();
    } else if (val === '=') {
      try {
        // Convert expression to JS and eval
        let expr = toJs(current);
        let result = eval(expr);
        // Fix floating-point errors
        if (typeof result === 'number') {
          result = Math.round(result * 1e10) / 1e10;
        }
        current = result.toString();
      } catch {
        current = 'Error';
      }
      updateDisplay();
    } else {
      current += val;
      updateDisplay();
    }
  });
});

updateDisplay();
