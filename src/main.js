import run from 'run-gen'

import console from './console'

import m1 from './module1'
import m2 from './module2'

run(function* () {
    console.info('Module 1\n')

    for (const p of m1) {
        yield* p(console)
        console.log()
    }

    for (const p of m2) {
        yield* p(console)
        console.log()
    }
}).catch(err => console.error(err.stack || err.message || err))
