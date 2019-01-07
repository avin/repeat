class Repeat {
    constructor(options) {
        this._validateOptions(options);

        this.options = { ...options };

        this.options.firstTimeDelay =
            this.options.firstTimeDelay !== undefined ? this.options.firstTimeDelay : this.options.delay;
    }

    _intervalTimeoutId = null;
    _counter = 0;

    /**
     * Validate options
     * @param options
     * @private
     */
    _validateOptions(options) {
        if (!options) {
            throw new Error('Options are required!');
        }

        if (!options.action) {
            throw new Error('Options action is required!');
        }

        if (!options.delay) {
            throw new Error('Options delay is required!');
        }
    }

    /**
     * Start repeat actions
     * @returns {boolean}
     */
    start = () => {
        if (!this._intervalTimeoutId) {
            this._doAction({ firstTime: true });
            return true;
        }
        return false;
    };

    /**
     * Stop repeat actions
     * @returns {boolean}
     */
    stop = () => {
        if (this._intervalTimeoutId) {
            clearTimeout(this._intervalTimeoutId);
            this._intervalTimeoutId = null;
            this._counter = 0;
            return true;
        }
        return false;
    };

    /**
     * Pause repeat actions (without reset counter and don't touch firstTimeRun flag)
     * @returns {boolean}
     */
    pause = () => {
        if (this._intervalTimeoutId) {
            clearTimeout(this._intervalTimeoutId);
            this._intervalTimeoutId = null;
            return true;
        }
        return false;
    };

    /**
     * Resume repeating after pause
     * @returns {boolean}
     */
    resume = () => {
        if (!this._intervalTimeoutId) {
            this._doAction();
            return true;
        }
        return false;
    };

    /**
     * Update delay value
     * @param newDelay
     */
    updateDelay(newDelay) {
        this.options.delay = newDelay;
    }

    /**
     * Interval action runner
     * @param firstTime
     * @returns {Promise<void>}
     */
    _doAction = async ({ firstTime } = {}) => {
        if (this._intervalTimeoutId) {
            clearTimeout(this._intervalTimeoutId);
            this._intervalTimeoutId = null;
        }

        if (!firstTime || (firstTime && !this.options.skipFirst)) {
            const { action } = this.options;
            await action(this._counter);
        }

        this._counter += 1;

        if (this.options.times && this._counter >= this.options.times) {
            return;
        }

        let delay = firstTime ? this.options.firstTimeDelay : this.options.delay;
        if (this.options.getDelay) {
            delay = this.options.getDelay(this._counter, this.options);
        }
        this._intervalTimeoutId = setTimeout(() => this._doAction(), delay);
    };
}

const makeRepeatObj = options => new Repeat(options);
export default makeRepeatObj;
