const http = require('http');

http.get('http://localhost:3000', (res) => {
    if (res.statusCode === 200) {
        console.log('Test Passed');
        process.exit(0);
    } else {
        console.error('Test Failed');
        process.exit(1);
    }
});
