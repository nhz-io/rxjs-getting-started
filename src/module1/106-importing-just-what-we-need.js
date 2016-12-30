import {Observable} from 'rx/Observable'
import 'rx/add/operator/map'
import 'rx/add/operator/filter'

export default function* (console) {
    yield new Promise(resolve => {
        const numbers = [1, 5, 10]
        const source = Observable.create(observer => {
            let index = 0

            const produceValue = () => {
                observer.next(numbers[index++])

                if (index < numbers.length) {
                    setTimeout(produceValue, 150)
                } else {
                    observer.complete()
                    resolve()
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
    })
}

