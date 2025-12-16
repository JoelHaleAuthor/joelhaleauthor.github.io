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
  // Static data table
  static cffMessages = [
    { min: 20, max: 23, message: "Time feels broad and gentle here. You experience the world in long, flowing moments — a calm foundation shared by all humans." },
    { min: 24, max: 27, message: "Your perception favors continuity over speed. This is where awareness is steady and unhurried." },
    { min: 28, max: 31, message: "You move through time comfortably. Nothing rushes, nothing drags — a solid baseline." },
    { min: 32, max: 35, message: "This is the common human rhythm of time. Reliable, adaptable, and ready when needed." },

    { min: 36, max: 39, message: "Something extra is waking up. You notice motion a bit sooner, reactions forming before you think about them." },
    { min: 40, max: 43, message: "Your perception sharpens. Time begins to feel responsive rather than fixed." },
    { min: 44, max: 47, message: "You’re starting to see more between moments. This is where instinct begins to lead." },
    { min: 48, max: 51, message: "Time subtly bends in your favor. Reactions feel natural, almost automatic." },

    { min: 52, max: 55, message: "You’re entering enhanced territory. The world seems to slow just enough for you to choose your response." },
    { min: 56, max: 59, message: "This is where exceptional people often operate. Movements feel precise, deliberate, and controlled." },
    { min: 60, max: 63, message: "Time opens up around you. You act while others are still reacting." },
    { min: 64, max: 67, message: "Your perception borders on extraordinary. Moments stretch, decisions feel effortless." },

    { min: 68, max: 71, message: "You experience time differently than most. Motion becomes readable, almost conversational." },
    { min: 72, max: 75, message: "This level hints at rare potential. The world slows enough to feel negotiable." },
    { min: 76, max: 79, message: "Time behaves as if it’s working with you. Few people ever feel this state." },
    { min: 80, max: 83, message: "You are operating near the edge of human capability. Instinct leads, and time follows." },

    { min: 84, max: 87, message: "This perception is extremely rare. The world unfolds frame by frame." },
    { min: 88, max: 91, message: "You perceive moments before they finish happening. This is where legends are born." },
    { min: 92, max: 95, message: "Time nearly pauses. Conscious thought struggles to keep up with instinct." },
    { min: 96, max: 100, message: "You are seeing the world at its finest resolution. This is the outer boundary of human experience." }
  ];

  // Static helper: age-based context
  static ageContext(age) {
    if (age < 18) return "Younger nervous systems often show more enhanced Temporal Dilation.";
    if (age < 30) return "This age range represents peak average temporal processing.";
    if (age < 55) return "Midlife temporal acuity varies widely with training and focus.";
    return "Later-life temporal perception changes with focus and training.";
  }

  // Optional: combined interpretation
  static interpret(cff, age) {
    const range = FlickerRect.cffMessages.find(
      r => cff >= r.min && cff <= r.max
    );

    return {
      cff,
      message: range ? range.message : "CFF value outside expected human range.",
      ageContext: FlickerRect.ageContext(age)
    };
  }
}
