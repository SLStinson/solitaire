var word = "steven";

var i = 0;
var isPalindrome = true;
while(isPalindrome && i < word.length/2){
    if(!(word[i] === word[word.length-(i+1)])){
        isPalindrome = false;
    }
    i++;
}
if(isPalindrome){
    console.log(`${word} is a palindrome`)
}
else{
    console.log(`${word} is not a palindrome`)
}