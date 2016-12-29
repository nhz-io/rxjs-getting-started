/* global document XMLHttpRequest */

import {Observable, Subject} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        console.info('Sending requests with XmlHttpRequest')

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
            document.createTextNode('GET DATA')
        )
        document.body.appendChild(button)

        const end = new Subject()

        function load(url) {
            const xhr = new XMLHttpRequest()

            xhr.addEventListener('load', () => {
                try {
                    const movies = JSON.parse(xhr.responseText)
                    movies.forEach(m => console.log(`Movie: ${m.title}`))
                    end.onNext()
                } catch (err) {
                    console.error(`error: ${err.stack || err.message || err}`)
                }
            })

            xhr.onerror = err =>
               console.error(`error: ${err.stack || err.message || err}`)

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.error(`error: ${xhr.statusText}`)
                    }
                }
            }
            xhr.open('GET', url)
            xhr.send()
        }

        const source = Observable.fromEvent(button, 'click')

        source.takeUntil(end).subscribe(
            val => load('/data/movies.json'),
            err => console.error(`error: ${err.stack || err.message || err}`),
            () => {
                console.log('complete')
                document.body.removeChild(button)
                resolve()
            }
        )
    })
}

