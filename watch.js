class TimeUnit extends HTMLElement {
  connectedCallback() {
    this.renderCaption();
    this.renderButtons();
  }

  renderCaption() {
    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.classList.add('hidden');
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
      label.classList.add('hidden');
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
    this.startUpdatingTimeEverySecond();
  }

  renderTimeUnits() {
    this.timeUnits.forEach(unit => this.appendTimeUnitElement(unit));
    this.assignTimeUnitElements();
  }

  appendTimeUnitElement(unitName) {
    const timeUnit = document.createElement('time-unit');
    timeUnit.setAttribute('name', unitName);
    this.appendChild(timeUnit);
  }

  assignTimeUnitElements() {
    this.hours = this.children?.[0];
    this.minutes = this.children?.[1];
    this.seconds = this.children?.[2];
  }

  startUpdatingTimeEverySecond() {
    setInterval(() => {
      this.updateTimeUnits();
    }, 100);
  }

  updateTimeUnits() {
    const now = new Date();
    const s = now.getSeconds();

    if (s !== this.lastUpdatedSecond) {
      this.updateAllTimeUnits(now);
      this.lastUpdatedSecond = s;
    }
  }

  updateAllTimeUnits(now) {
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    this?.hours?.update(h);
    this?.minutes?.update(m);
    this?.seconds?.update(s);
  }
}

customElements.define('binary-watch', BinaryWatch);
