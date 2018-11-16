console.log("Hello there!")
console.log("Starting to run CEIT 93 Data Migrator...")
let stringify = require('./stringify')
let fs = require('fs')
let users = require('../data/users.json')
console.log("Data loaded!")
console.log("Starting to identify people...")

// Identify CEIT 93 Community
let people = users.filter(function (item) {
    if (!item.std_numbers)
        return false
    let regex = /^9331[0-9]{3}$/
    let f1 = false
    for (let num of item.std_numbers)
        if (num.match(regex))
            f1 = true
    if (item.authorized)
        f1 = true
    return f1
})
console.log("CEIT 93 Community Identified!")
console.log("Starting to filter the fields...")

people = people.map(u => {
    return {
        name: u.name,
        username: u.username,
        std_numbers: u.std_numbers,
        avatar: u.avatar,
        gender: u.gender,
        grad_photo: u.grad_photo,
        modified_name: u.modified_name
    }
})
console.log('writing down...')
let string = stringify(people)
fs.writeFile('../out/index.json', string, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete!');
})
console.log('done')

