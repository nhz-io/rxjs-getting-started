/* global fetch */

import {Observable} from 'rx'

export default function* (console) {
    const load = url => Observable.defer(() => Observable.fromPromise(
        fetch(url).then(res => {
            if (res.status === 200) {
                return res.json()
            }

            throw new Error(`${res.status} ${res.statusText}`)
        })
    ))

    const renderMovies = movies =>
        movies.forEach(m => console.log(`Movies: ${m.title}`))

    const retryStrategy = (attempts = 2, delay = 1000) => errors =>
        errors
            .scan((acc, err) => {
                if (acc < attempts) {
                    console.warn(`retry attemt: ${++acc}`)
                    return acc
                }

                throw err
            }, 0)
            .delay(delay)

    yield new Promise(resolve => {
        load('./data/movies.json')
            .retryWhen(retryStrategy())
            .subscribe(
                renderMovies,
                err => console.error(`error: ${err.stack || err.message || err}`),
                () => {
                    console.log('complete')
                    resolve()
                }
            )
    })
}
