// reactionTimer.js

export class ReactionTimer {
  constructor(options = {}) {
    this.minDelay = options.minDelay || 1000; // ms
    this.maxDelay = options.maxDelay || 3000; // ms
    this.targetElement = options.targetElement || document.body;
    this.resultElement = options.resultElement || null;
    this._startTime = null;
    this._waiting = false;
    this._ready = false;
  }

  _randomDelay() {
    return Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
  }

  start() {
    return new Promise((resolve, reject) => {
      this._waiting = true;
      this._ready = false;

      const delay = this._randomDelay();

      const onClick = () => {
        if (!this._ready) {
          this.targetElement.removeEventListener("click", onClick);
          this._waiting = false;
          reject(new Error("Too early!"));
          return;
        }

        const reactionTime = performance.now() - this._startTime;
        this.targetElement.removeEventListener("click", onClick);
        this._waiting = false;
        resolve(reactionTime);
        var message = `Reaction Time: ${reactionTime.toFixed(2)} ms`;
        console.log(message);
        if (this.resultElement) {
          this.resultElement.textContent = message;
        }
        this.targetElement.style.backgroundColor = "lightgray";
      };

      this.targetElement.addEventListener("click", onClick);

      setTimeout(() => {
        this._ready = true;
        this._startTime = performance.now();

        // Optional: visual cue
        this.targetElement.style.backgroundColor = "green";
      }, delay);
    });
  }

  async runTrials(count = 5) {
    const results = [];

    for (let i = 0; i < count; i++) {
      this.targetElement.style.backgroundColor = "red";

      try {
        const time = await this.start();
        results.push(time);
      } catch (err) {
        results.push(null); // false start
      }

      await this._sleep(1000);
    }

    return {
      results,
      average: this._average(results),
    };
  }

  _sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  _average(arr) {
    const valid = arr.filter(v => v !== null);
    if (!valid.length) return null;
    return valid.reduce((a, b) => a + b, 0) / valid.length;
  }
}