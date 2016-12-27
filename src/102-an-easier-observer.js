import {Observable} from 'rxjs'
import console from './console'

const numbers = [1, 5, 10]
const source = Observable.from(numbers)

console.info('An Easier Observer')
source.subscribe(
    val => console.log(`value: ${val}`),
    err => console.error(`error: ${err.message || err}`),
    () => console.info(`complete`)
)
console.log()

