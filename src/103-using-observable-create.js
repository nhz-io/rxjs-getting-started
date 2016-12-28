import {Observable} from 'rxjs'
import console from './console'

export default function* () {
    const numbers = [1, 5, 10, null]
    const source = Observable.create(observer => {
        for (const n of numbers) {
            if (n === null) {
                observer.error(`Something went wrong`)
            } else {
                observer.next(n)
            }
        }

        observer.complete()
    })

    console.info('Using Observable.create')
    source.subscribe(
        val => console.log(`value: ${val}`),
        err => console.error(`error: ${err.message || err}`),
        () => console.info(`complete`)
    )
}
