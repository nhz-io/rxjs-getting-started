import run from 'run-gen'

import console from './console'

import example from './example'

run(function* () {
    console.append('←', ' Message count (Index resets at 999)')
    console.log()
    console.log('log')
    console.debug('debug')
    console.info('info')
    console.warn('warn')
    console.error('error')
    console.log()

    console.info('Running async example')
    yield* example(console)
    console.log()

    console.info('Finished')
}).catch(err => console.error(err.stack || err.message || err))
