document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  const themeSwitchButton = document.getElementById('themeSwitchButton');
  const toggleCaptionButton = document.getElementById('toggleCaptionButton');
  const toggleButtonLabel = document.getElementById('toggleButtonLabel');

  initializeTheme(themeSwitchButton);
  initializeToggleVisibilityButton('caption', toggleCaptionButton);
  initializeToggleVisibilityButton('label', toggleButtonLabel);

  themeSwitchButton.addEventListener('click', toggleTheme);
}

function initializeTheme(button) {
  const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialIsDark = isDarkTheme();

  if (prefersDarkTheme) {
    setTheme(button, true);
  } else {
    setTheme(button, false);
  }

  updateThemeButtonText(button, initialIsDark);
}

function toggleTheme() {
  const themeSwitchButton = document.getElementById('themeSwitchButton');
  const isDark = document.body.classList.toggle('dark');
  updateThemeButtonText(themeSwitchButton, isDark);
}

function updateThemeButtonText(button, isDark) {
  button.textContent = isDark ? '🌞' : '🌛';
}

function isDarkTheme() {
  return document.body.classList.contains('dark');
}

function setTheme(button, isDark) {
  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

function initializeToggleVisibilityButton(className, button) {
  button.addEventListener('click', toggleElements(`.${className}`));
}

function toggleElements(selector) {
  return function () {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => element.classList.toggle('hidden'));
  };
}

class ToggleButton extends HTMLElement {
  connectedCallback() {
    this.classList.add('off');
    this.createLabel();
  }

  createLabel() {
    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = this.getAttribute('name');
    this.appendChild(label);
  }

  set on(value) {
    if (value) {
      this.classList.add('on');
      this.classList.remove('off');
    } else {
      this.classList.add('off');
      this.classList.remove('on');
    }
  }

  get on() {
    return this.classList.contains('on');
  }
}

customElements.define('toggle-button', ToggleButton);