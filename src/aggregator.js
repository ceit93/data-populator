let fs = require('fs')
let stringify = require('./stringify')
let user = require("../out/amirh.json")
let stopWords = [
"!",
"",
"#",
"(",
")",
"*",
"\"",
"-",
".",
"/",
":",
"[",
"]",
"«",
"»",
"،",
"؛",
"؟",
"۰",
"۱",
"۲",
"۳",
"۴",
"۵",
"۶",
"۷",
"۸",
"۹",
"…",
"$",
"دیگران",
"همچنان",
"مدت",
"چیز",
"سایر",
"جا",
"طی",
"کل",
"کنونی",
"بیرون",
"مثلا",
"کامل",
"کاملا",
"آنکه",
"موارد",
"واقعی",
"امور",
"اکنون",
"بطور",
"بخشی",
"تحت",
"چگونه",
"عدم",
"نوعی",
"حاضر",
"وضع",
"مقابل",
"کنار",
"خویش",
"نگاه",
"درون",
"زمانی",
"بنابراین",
"تو",
"خیلی",
"بزرگ",
"خودش",
"جز",
"اینجا",
"مختلف",
"توسط",
"نوع",
"همچنین",
"آنجا",
"قبل",
"جناح",
"اینها",
"طور",
"شاید",
"ایشان",
"جهت",
"طریق",
"مانند",
"پیدا",
"ممکن",
"کسانی",
"جای",
"کسی",
"غیر",
"بی",
"قابل",
"درباره",
"جدید",
"وقتی",
"اخیر",
"چرا",
"بیش",
"روی",
"طرف",
"جریان",
"زیر",
"آنچه",
"البته",
"فقط",
"چیزی",
"چون",
"برابر",
"هنوز",
"بخش",
"زمینه",
"بین",
"بدون",
"استفاد",
"همان",
"نشان",
"بسیاری",
"بعد",
"عمل",
"روز",
"اعلام",
"چند",
"آنان",
"بلکه",
"امروز",
"تمام",
"بیشتر",
"آیا",
"برخی",
"علیه",
"دیگری",
"ویژه",
"گذشته",
"انجام",
"حتی",
"داده",
"راه",
"سوی",
"ولی",
"زمان",
"حال",
"تنها",
"بسیار",
"یعنی",
"عنوان",
"همین",
"هبچ",
"پیش",
"وی",
"یکی",
"اینکه",
"وجود",
"شما",
"پس",
"چنین",
"میان",
"مورد",
"چه",
"اگر",
"همه",
"نه",
"دیگر",
"آنها",
"باید",
"هر",
"او",
"ما",
"من",
"تا",
"نیز",
"اما",
"یک",
"خود",
"بر",
"یا",
"هم",
"را",
"این",
"با",
"آن",
"برای",
"و",
"در",
"به",
"که",
"از",
"ترین",
"",
" "
]
let memorial = []
for (let post of user.posts){
    let count = post.body.length + post.title.length
    let text = post.body
    let tokens = text.replace(/[،.,\/#!$%\^&\*;:{}=\-_`~()\n\r]|[😒🙈😊😂✋\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]/g,"").split(" ")
    let dict = []
    for (let word of tokens){
        if (word !== undefined && !stopWords.hasOwnProperty(word)){
            if (dict.hasOwnProperty(word))
                dict[word] += 1
            else
                dict[word] = 1
        }
    }
    let mem = {
        author: post.user.username,
        title: post.title,
        length: count,
        dictionary: dict
    }
    memorial.push(mem)
}
console.log(memorial)
fs.writeFile('out/posts/'+user.username+'.json', stringify(memorial), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete!' );
});