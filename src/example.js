export default function* (console) {
    yield new Promise(resolve => {
        console.log('Chill for 2 seconds')
        setTimeout(resolve, 2000)
    })
}
