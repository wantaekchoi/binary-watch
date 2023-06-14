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
  const prefersDarkTheme = isPrefersDarkTheme();
  setTheme(prefersDarkTheme);
  updateThemeButtonText(button, isDarkTheme());
}

function toggleTheme() {
  const themeSwitchButton = document.getElementById('themeSwitchButton');
  const isDark = toggleDarkTheme();
  updateThemeButtonText(themeSwitchButton, isDark);
}

function updateThemeButtonText(button, isDark) {
  button.textContent = isDark ? '🌞' : '🌛';
}

function isDarkTheme() {
  return document.body.classList.contains('dark');
}

function toggleDarkTheme() {
  return document.body.classList.toggle('dark');
}

function setTheme(isDark) {
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

function isPrefersDarkTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

class ToggleButton extends HTMLElement {
  connectedCallback() {
    this.classList.add('off');
    this.renderLabel();
  }

  renderLabel() {
    const label = document.createElement('span');
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
