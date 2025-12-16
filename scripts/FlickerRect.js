/**
 * FlickerRect
 * -----------
 * Creates a rectangular DIV inside a specified parent element
 * and flickers it at a requested frequency.
 * Each instance is independent, so multiple rectangles will flicker out of sync.
 */

export class FlickerRect {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.parent - REQUIRED parent element
   * @param {number} options.width - rectangle width in px
   * @param {number} options.height - rectangle height in px
   * @param {string} options.colorOn - background when "on"
   * @param {string} options.colorOff - background when "off"
   * @param {number} options.rateHz - flicker rate in Hz
   * @param {string} options.className - CSS class name
   */
  constructor({
    parent,
    width = 200,
    height = 200,
    colorOn = '#000066',
    colorOff = 'transparent',
    rateHz = 10,
    className = 'flicker-rect'
  } = {}) {

    if (!(parent instanceof HTMLElement)) {
      throw new Error('FlickerRect requires a valid parent HTMLElement.');
    }

    this.parent = parent;
    this.rateHz = rateHz;
    this.period = 1000 / rateHz;
    this.halfPeriod = this.period / 2;

    this.className = className;
    this.colorOn = colorOn;  // Use bright color for high freq
    this.colorOff = colorOff;

    this.running = false;
    this.state = true;

    // Random phase offset so multiple instances are out of sync
    this.phaseOffset = Math.random() * this.period;
    this.lastToggle = performance.now() + this.phaseOffset;


    

    // Bind loop for requestAnimationFrame
    this._loop = this._loop.bind(this);
  }

  createRect(){
    // Create the div element
    this.el = document.createElement('div');
    this.el.className = this.className;
    this.el.style.width = `${this.width}px`;
    this.el.style.height = `${this.height}px`;
    this.el.style.backgroundColor = this.colorOn;
    //this.el.innerHTML = "<br/>&nbsp;" + this.rateHz + ' Hz&nbsp;<br/>&nbsp;<br/>';
    this.el.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/><br/><br/>";
    return this.el;
  }

  // Start flickering
  start() {
    if (this.running) return;
    this.el = this.createRect();
    this.parent.appendChild(this.el);
    this.running = true;
    this.lastToggle = performance.now() + this.phaseOffset;
    requestAnimationFrame(this._loop);
  }

  // Stop flickering
  stop() {
    this.running = false;
  }

  // Change flicker rate dynamically
  setRate(rateHz) {
    this.rateHz = rateHz;
    this.period = 1000 / rateHz;
    this.halfPeriod = this.period / 2;
  }

  // Remove the rectangle from the DOM
  remove() {
    this.stop();
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = null;
    }
  }

  // Main animation loop
  _loop(now) {
    if (!this.running) return;

    if (now - this.lastToggle >= this.halfPeriod) {
      this.state = ! this.state;
      this.el.style.backgroundColor = this.state ? this.colorOn : (this.rateHz == 0 ? this.colorOn : this.colorOff);
      this.lastToggle += this.halfPeriod; // prevent drift
    }

    requestAnimationFrame(this._loop);
  }

        // Fisher-Yates shuffle
    static shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap arr[i] with arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

}
