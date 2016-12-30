import {Observable} from 'rx'

export default function* (console) {
    const numbers = [1, 5, 10]
    const source = Observable.from(numbers)

    class Observer {
        onNext(val) {
            console.log(`value: ${val}`)
        }

        onError(err) {
            console.error(`error: ${err.message || err}`)
        }

        onCompleted() {
            console.info(`completed`)
        }
    }

    console.info('First Observable')
    source.subscribe(new Observer())
}

