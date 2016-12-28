import run from 'run-gen'
import console from './console'

run(function* () {
    console.append('←', ' Message count (Index resets at 999)')
    console.log()
    console.log('log')
    console.debug('debug')
    console.info('info')
    console.warn('warn')
    console.error('error')
})
