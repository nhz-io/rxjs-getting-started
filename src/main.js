/* global document */

import run from 'run-gen'

import console from './console'

import p1 from './101-first-observable.js'
import p2 from './102-an-easier-observer.js'
import p3 from './103-using-observable-create.js'
import p4 from './104-going-async-with-set-timeout.js'
import p5 from './105-using-rxjs-operators.js'
import p6 from './106-importing-just-what-we-need.js'

console.info('Module 1\n')

run(function* () {
    for (const p of [p1, p2, p3, p4, p5, p6]) {
        yield* p()
        console.log()
    }
}).catch(err => console.error(err.stack || err.message || err))
