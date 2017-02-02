
function adder(i) {
    return i + 1;
}

function ajax(cb) {
    console.log('ajax stuff');
    console.log(cb(1));
}

ajax(adder);

ajax(v => v + 2);