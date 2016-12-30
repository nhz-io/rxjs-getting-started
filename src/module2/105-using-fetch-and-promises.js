/* global document XMLHttpRequest fetch */

import {Observable, Subject} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        console.info('Using fetch and Promises')

        const button = document.createElement('button')
        const buttonStyle = {
            position: 'fixed',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 80px)',
            zIndex: 999,
            width: '160px',
            height: '40px',
        }

        Object.keys(buttonStyle).forEach(key => {
            button.style[key] = buttonStyle[key]
        })

        button.appendChild(
            document.createTextNode('GET MOVIES (fetch)')
        )
        document.body.appendChild(button)

        const end = new Subject()

        function retryStrategy(attempts = 3, delay = 1000) {
            return errors =>
                errors
                    .scan((a, v) => {
                        if (a < attempts) {
                            console.warn(`retry attemt: ${++a}`)
                        } else {
                            errors.onError(v)
                        }

                        return a
                    }, 0)
                    .delay(delay)
        }

        function load(url) {
            return Observable.create(observer => {
                const xhr = new XMLHttpRequest()

                xhr.addEventListener('load', () => {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText)
                        observer.next(data)
                        observer.completed()
                    }
                })

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status !== 200) {
                        observer.error(xhr.statusText)
                    }
                }

                xhr.onerror = err => observer.error(err)

                xhr.open('GET', url)
                xhr.send()
            }).retryWhen(retryStrategy()).takeLast(1)
        }

        function loadWithFetch(url) {
            return Observable.defer(() =>
                Observable.fromPromise(fetch(url).then(r => r.json()))
            )
        }

        const click = Observable.fromEvent(button, 'click').first()

        function renderMovies(movies) {
            movies.forEach(m => console.log(`Movie: ${m.title}`))
        }

        click.flatMap(() => loadWithFetch('./data/movies.json')).takeUntil(end).subscribe(
            val => {
                renderMovies(val)
                end.onNext()
            },
            err => {
                console.error(`error: ${err.stack || err.message || err}`)
                console.log('complete')
                document.body.removeChild(button)
                resolve()
            },
            () => {
                console.log('complete')
                document.body.removeChild(button)
                resolve()
            }
        )
    })
}

