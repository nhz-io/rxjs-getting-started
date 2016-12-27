import {Observable} from 'rxjs'
import console from './console'

const numbers = [1, 5, 10]
const source = Observable.from(numbers)

class Observer {
    constructor() {
        console.info('New Observer')
    }

    next(val) {
        console.log(`value: ${val}`)
    }

    error(err) {
        console.error(`error: ${err.message || err}`)
    }

    complete() {
        console.info(`complete`)
    }
}

console.info('First Observable')
source.subscribe(new Observer())
source.subscribe(new Observer())
console.log()

