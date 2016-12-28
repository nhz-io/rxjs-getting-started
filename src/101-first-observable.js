import {Observable} from 'rxjs'
import console from './console'

export default function* () {
    const numbers = [1, 5, 10]
    const source = Observable.from(numbers)

    class Observer {
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
}

