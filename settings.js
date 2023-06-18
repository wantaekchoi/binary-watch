document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
  const toggleLabelButton = document.getElementById('toggle-button');
  initializeToggleButton(toggleLabelButton);
}

function initializeToggleButton(button) {
  button.addEventListener('click', toggleClassForElements.bind(null, ['caption', 'label'], 'hidden'));
}

function toggleClassForElements(classNames, toggleClassName) {
  const elements = classNames.reduce((accumulator, className) => {
    return accumulator.concat(Array.from(document.querySelectorAll(`.${className}`)));
  }, []);

  elements.forEach(element => element.classList.toggle(toggleClassName));
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
