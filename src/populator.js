console.log("Hello there!")
console.log("Starting to run CEIT 93 Data Migrator...")
let stringify = require('./stringify')
let fs = require('fs')


// Load data
let posts = require('../data/posts.json')
let users = require('../data/users.json')
let interviews = require('../data/interviews.json')
let questions = require('../data/questions.json')
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
console.log("Starting to populate the fields...")


let start = parseInt(process.argv[2])
let end = parseInt(process.argv[3])
console.log("from " + start + ' to ' + end)

// Populate related data fields
for (let index = start; index < end && index < people.length; index++){
    console.log("index: " + index + "/" + people.length)
    let user = people[index]
    console.log(user.name)
    // Populate interviews
    for (let i in user.interviews){
        let id = user.interviews[i]
        let interv = interviews.find(u => u._id === id)
        interv.question = questions.find(q => q._id === interv.question)
        user.interviews[i] = interv
    }
    // Populate posts
    for (let i in user.posts){
        let id = user.posts[i]
        let post = posts.find(p => p._id === id)
        try {
            post.user = users.find(q => q._id === post.user)
            user.posts[i] = post
        } catch (e) {}
    }
    console.log('writing down ' + user.username)
    let string = stringify(user)
    fs.writeFile('../out/'+user.username+'.json', string, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete!' );
    });
}
console.log("People are populated!")
// console.log("Writing data to file...")

// Start to write the whole data to file
// let json = stringify(people)
// fs.writeFile('out/people.json', json, 'utf8', function(err) {
//     if (err) throw err;
//     console.log('complete');
// });
// console.log("Done!")
