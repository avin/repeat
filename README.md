# @avinlab/repeat ![build](https://travis-ci.org/avin/repeat.svg?branch=master)

> Make repeat actions easily.

## Install

```bash
# Yarn
yarn add @avinlab/repeat

# NPM
npm install --save @avinlab/repeat
```

## Usage

```js
import repeat from '@avinlab/repeat';

const repeatAction = repeat({
    action: counter => {
        console.log(counter);
    },
    delay: 500,
    firstTimeDelay: 1000,
    skipFirst: true,
});

// Start interval actions
repeatAction.start();

// Stop interval actions
repeatAction.stop();
```

## API

### Options

* `action` _(Function)_ - Interval function. Params: `counter` - call action index number.
* `delay` _(Number)_ - Sleep time in ms between actions.
* `firstTimeDelay` _(Number)_ - First time sleep period in ms.
* `skipFirst` _(Boolean)_ - Skip first time action call.
* `times` _(Number)_ - Repeat N times.

### Methods

* `start()` - Start repeat actions.
* `stop()` - Stop repeat actions.
* `pause()` - Pause repeat actions (without reset counter and don't touch firstTimeRun flag).
* `resume()` - Resume repeating after pause.
* `updateDelay(newDelay)` - Update option delay value.

## License

MIT © [avin](https://github.com/avin)
