import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import console from './console'

const numbers = [1, 5, 10]
const source = Observable.create(observer => {
    let index = 0

    const produceValue = () => {
        observer.next(numbers[index++])

        if (index < numbers.length) {
            setTimeout(produceValue, 100)
        } else {
            observer.complete()
            console.log()
        }
    }

    produceValue()
}).map(n => n * 20).filter(n => n > 100)

console.info('Importing just what we need')
source.subscribe(
    val => console.log(`value: ${val}`),
    err => console.error(`error: ${err.message || err}`),
    () => console.info(`complete`)
)
