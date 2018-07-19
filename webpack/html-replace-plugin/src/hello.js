require.ensure(['./new'], (require) => {
    require('./new')()
    console.log('in new')
})

const world = require('./world')

console.log('Hello ')
world()