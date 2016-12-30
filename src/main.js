import run from 'run-gen'

import console from './console'

import m1 from './module1'
import m2 from './module2'
import m3 from './module3'

run(function* () {
    console.info('Module 1\n')
    for (const p of m1) {
        yield* p(console)
        console.log()
    }

    console.info('Module 2\n')
    for (const p of m2) {
        yield* p(console)
        console.log()
    }

    console.info('Module 3\n')
    for (const p of m3) {
        yield* p(console)
        console.log()
    }
}).catch(err => console.error(err.stack || err.message || err))
