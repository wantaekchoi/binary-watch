window.addEventListener('DOMContentLoaded', () => {
  const themeSwitchButton = document.getElementById('themeSwitchButton');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    themeSwitchButton.textContent = '🌞';
  } else {
    themeSwitchButton.textContent = '🌛';
  }

  themeSwitchButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateThemeButtonText(themeSwitchButton);
  });
});

function updateThemeButtonText(button) {
  if (document.body.classList.contains('dark')) {
    button.textContent = '🌞';
  } else {
    button.textContent = '🌛';
  }
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

class TimeUnit extends HTMLElement {
  connectedCallback() {
    this.createCaption();
    this.createButtons();
  }

  createCaption() {
    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.textContent = this.getAttribute('name');
    this.appendChild(caption);
  }

  createButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('button-container');

    for (let i = 0; i < 6; i++) {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('toggle-button-container');

      const button = document.createElement('toggle-button');
      button.classList.add('toggle-button');
      buttonContainer.appendChild(button);

      const label = document.createElement('div');
      label.classList.add('label');
      label.textContent = `${1 << (5 - i)}`;
      buttonContainer.appendChild(label);

      buttons.appendChild(buttonContainer);
    }

    this.appendChild(buttons);
  }

  update(value) {
    const buttons = this.querySelector('.button-container');
    for (let i = 0; i < 6; i++) {
      buttons.children[i].children[0].on = ((value >> (5 - i)) & 1) === 1;
    }
  }
}

customElements.define('time-unit', TimeUnit);

class BinaryWatch extends HTMLElement {
  constructor() {
    super();
    this.timeUnits = ['HOURS', 'MINUTES', 'SECONDS'];
    this.lastUpdatedSecond = -1;
  }

  connectedCallback() {
    this.timeUnits.forEach(unit => {
      const timeUnit = document.createElement('time-unit');
      timeUnit.setAttribute('name', unit);
      this.appendChild(timeUnit);
    });

    this.hours = this.children[0];
    this.minutes = this.children[1];
    this.seconds = this.children[2];
    this.update();

    setTimeout(() => {
      this.updateClock();
    }, 100);
  }

  updateClock() {
    const now = new Date();
    const s = now.getSeconds();

    if (s !== this.lastUpdatedSecond) {
      this.update();
      this.lastUpdatedSecond = s;
    }

    setTimeout(() => {
      this.updateClock();
    }, 100);
  }

  update() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    this.hours.update(h);
    this.minutes.update(m);
    this.seconds.update(s);
  }
}

customElements.define('binary-watch', BinaryWatch);
