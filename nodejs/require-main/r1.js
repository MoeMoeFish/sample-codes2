const r2 = require('./r2')

module.exports = function() {
    console.log('r1');
    console.log(r2());

    console.log(require.main, 'r1 main')
}
