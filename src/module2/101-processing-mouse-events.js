/* global document */

import {Observable, Subject} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        console.info('Processing mouse events')
        console.info('Click red circle to stop')

        const tracker1 = document.createElement('div')
        const tracker1Style = {
            position: 'fixed',
            background: 'red',
            zIndex: 999,
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            top: 'calc(50% - 10px)',
            left: 'calc(50% - 10px)',
            cursor: 'pointer',
        }

        Object.keys(tracker1Style).forEach(key => {
            tracker1.style[key] = tracker1Style[key]
        })

        document.body.append(tracker1)

        const tracker2 = document.createElement('div')
        const tracker2Style = {
            position: 'fixed',
            zIndex: 888,
            borderColor: 'red',
            borderWidth: '2px',
            borderRadius: '40px',
            borderStyle: 'solid',
            boxSizing: 'border-box',
            width: '40px',
            height: '40px',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)',
        }

        Object.keys(tracker2Style).forEach(key => {
            tracker2.style[key] = tracker2Style[key]
        })

        document.body.append(tracker2)

        const end = new Subject()
        tracker1.addEventListener('click', () => end.onNext())

        const source =
            Observable.fromEvent(document, 'mousemove')
                .takeUntil(end)
                .distinctUntilChanged(val => (1e+5 * val.clientX) + val.clientY)

        source.delay(500).filter(v => v.clientX > 400).subscribe(
            val => {
                tracker1.style.top = `${val.clientY - 10}px`
                tracker1.style.left = `${val.clientX - 10}px`
            },
            err => console.error(err.stack || err.message || err)
        )

        const debounced = source.debounce(100)

        debounced.subscribe(
            val => {
                tracker2.style.top = `${val.clientY - 20}px`
                tracker2.style.left = `${val.clientX - 20}px`
            },
            err => console.error(err.stack || err.message || err),
            () => {
                console.info('complete')
                document.body.removeChild(tracker1)
                document.body.removeChild(tracker2)
                resolve()
            }
        )

        debounced.subscribe(
            val => console.log(`X: ${val.clientX}, Y: ${val.clientY}`),
            err => console.error(err.stack || err.message || err)
        )
    })
}
