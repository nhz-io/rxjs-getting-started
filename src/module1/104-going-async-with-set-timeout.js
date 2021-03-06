import {Observable} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        const numbers = [1, 5, 10]
        const source = Observable.create(observer => {
            let index = 0

            const produceValue = () => {
                observer.next(numbers[index++])

                if (index < numbers.length) {
                    setTimeout(produceValue, 1000)
                } else {
                    observer.completed()
                    resolve()
                }
            }

            produceValue()
        })

        console.info('Going Async with setTimeout')
        source.subscribe(
            val => console.log(`value: ${val}`),
            err => console.error(`error: ${err.message || err}`),
            () => console.info(`complete`)
        )
    })
}
