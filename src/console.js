/* global document */

const output = document.createElement('pre')
output.style.width = '100%'
output.style.height = '100%'
output.style.padding = 0
output.style.margin = 0
output.style.fontSize = '18px'
output.style.lineHeight = '1.4em'

document.body.appendChild(output)

let cnt = 0
const n = () => `000${cnt++ % 1000}`.slice(-3)

function append(...args) {
    output.appendChild(
        document.createTextNode(
            args.length > 1 ? `[${n()}] ${args.join('')}\n` : '\n'
        )
    )
}

document.body.appendChild(output)

export default {
    append,

    log() {
        append('▸ ', ...arguments)
    },

    warn() {
        append('⚠ ', ...arguments)
    },

    error() {
        append('☠ ', ...arguments)
    },

    info() {
        append('★ ', ...arguments)
    },

    debug() {
        append('☢ ', ...arguments)
    },
}
