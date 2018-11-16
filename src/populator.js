console.log("Hello there!")
console.log("Starting to run CEIT 93 Data Migrator...")

// Load data
let posts = require('../data/posts.json')
let users = require('../data/users.json')
let interviews = require('../data/interviews.json')
let questions = require('../data/questions.json')
let
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

// Populate related data fields
for (let user of people){
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
        post.user = users.find(q => q._id === post.user)
        user.posts[i] = post
    }
}
console.log()
