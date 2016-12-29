/* global document XMLHttpRequest */

import {Observable, Subject} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        console.info('Using flatmap to process inner observables')

        const button = document.createElement('button')
        const buttonStyle = {
            position: 'fixed',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 50px)',
            zIndex: 999,
            width: '100px',
            height: '40px',
        }

        Object.keys(buttonStyle).forEach(key => {
            button.style[key] = buttonStyle[key]
        })

        button.appendChild(
            document.createTextNode('GET MOVIES')
        )
        document.body.appendChild(button)

        const end = new Subject()

        function load(url) {
            return Observable.create(observer => {
                const xhr = new XMLHttpRequest()

                xhr.addEventListener('load', () => {
                    const data = JSON.parse(xhr.responseText)
                    observer.next(data)
                    observer.completed()
                })

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status !== 200) {
                        observer.error(xhr.statusText)
                    }
                }

                xhr.onerror = err => observer.error(err)

                xhr.open('GET', url)
                xhr.send()
            })
        }

        const click = Observable.fromEvent(button, 'click')

        function renderMovies(movies) {
            movies.forEach(m => console.log(`Movie: ${m.title}`))
        }

        click.flatMap(() => load('/data/movies.json')).takeUntil(end).subscribe(
            val => {
                renderMovies(val)
                end.onNext()
            },
            err => console.error(`error: ${err.stack || err.message || err}`),
            () => {
                console.log('complete')
                document.body.removeChild(button)
                resolve()
            }
        )
    })
}

