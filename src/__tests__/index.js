import createRepeat from '../';
import Promise from 'bluebird';

describe('repeat', () => {
    test('test create repeat obj', async () => {
        const action = jest.fn();

        const repeat = createRepeat({
            action,
            delay: 100,
            skipFirst: true,
        });

        expect(action).toHaveBeenCalledTimes(0);
    });

    test('test repeat action execution', async () => {
        const action = jest.fn();

        const repeat = createRepeat({
            action,
            delay: 100,
        });
        repeat.start();

        await Promise.delay(150);
        repeat.stop();

        expect(action).toHaveBeenCalledTimes(2);
    });

    test('test skip first time action call', async () => {
        const action = jest.fn();

        const repeat = createRepeat({
            action,
            delay: 100,
            skipFirst: true,
        });
        repeat.start();

        await Promise.delay(150);
        repeat.stop();

        expect(action).toHaveBeenCalledTimes(1);
    });

    test('test max times repeat option', async () => {
        const action = jest.fn();

        const repeat = createRepeat({
            action,
            delay: 10,
            times: 3,
        });
        repeat.start();

        await Promise.delay(150);
        repeat.stop();

        expect(action).toHaveBeenCalledTimes(3);
    });
});
