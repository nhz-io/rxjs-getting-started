/* global document */

import {Observable, Subject} from 'rx'

export default function* (console) {
    yield new Promise(resolve => {
        console.info('Processing mouse events')
        console.info('Click red circle to stop')

        const tracker1 = document.createElement('div')
        tracker1.appendChild(document.createTextNode('NEXT'))
        const tracker1Style = {
            position: 'fixed',
            background: 'red',
            zIndex: 999,
            width: '60px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '60px',
            color: 'white',
            borderRadius: '100%',
            top: 'calc(50% - 30px)',
            left: 'calc(50% - 30px)',
            cursor: 'pointer',
            fontFamily: 'monospace',
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
            borderRadius: '100%',
            borderStyle: 'solid',
            boxSizing: 'border-box',
            width: '70px',
            height: '70px',
            top: 'calc(50% - 35px)',
            left: 'calc(50% - 35px)',
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
                tracker1.style.top = `${val.clientY - 30}px`
                tracker1.style.left = `${val.clientX - 30}px`
            },
            err => console.error(err.stack || err.message || err)
        )

        const debounced = source.debounce(100)

        debounced.subscribe(
            val => {
                tracker2.style.top = `${val.clientY - 35}px`
                tracker2.style.left = `${val.clientX - 35}px`
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
