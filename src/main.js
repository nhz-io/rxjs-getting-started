import run from 'run-gen'

import console from './console'

import m2 from './module3/index.js'

run(function* () {
    console.info('Module 2\n')

    for (const p of m2) {
        yield* p(console)
        console.log()
    }
}).catch(err => console.error(err.stack || err.message || err))
