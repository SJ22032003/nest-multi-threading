const corsLevelSlider = document.getElementById('cors-level');
const corsLevelValue = document.getElementById('selected-cors-level');
console.log('hello');
corsLevelSlider.addEventListener('input', () => {
  corsLevelValue.textContent = corsLevelSlider.value;
});
