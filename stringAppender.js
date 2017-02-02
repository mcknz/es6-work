
function stringAppender(origString, newString) {
    return origString + " " + newString;
}

function ajax(cb, string1, string2) {
    console.log('ajax stuff');
    console.log(stringAppender(string1, string2));
}

ajax(stringAppender, "string 1", "string 2");

ajax(newString => origString + " " + newString, "string 1", "string 2");