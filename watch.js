class TimeUnit extends HTMLElement {
  connectedCallback() {
    this.renderCaption();
    this.renderButtons();
  }

  renderCaption() {
    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.textContent = this.getAttribute('name');
    this.appendChild(caption);
  }

  renderButtons() {
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
    this.renderTimeUnits();
    this.hours = this.children[0];
    this.minutes = this.children[1];
    this.seconds = this.children[2];
    this.update();

    setTimeout(() => {
      this.updateClock();
    }, 100);
  }

  renderTimeUnits() {
    this.timeUnits.forEach(unit => {
      const timeUnit = document.createElement('time-unit');
      timeUnit.setAttribute('name', unit);
      this.appendChild(timeUnit);
    });
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
