'use strict';

// so, the purpose of this module is the functionality itself. it parses the received text.

const textParser =(text) =>{
    let resJSON = {};
     resJSON = {
      "textLength": textLength(text),
      "wordCount": wordCount(text),
      "characterCount": characterCount(text),
    };
   return resJSON;
};

// function for text length
const textLength = (text) => {
    let withSpaces = text.length;
    let withoutSpaces = text.replace(/\s/g, "").length;
   // console.log("withSpaces: " + withSpaces, " withoutSpaces: " + withoutSpaces);
    let spaceOBJ = {
        "withSpaces": withSpaces,
        "withoutSpaces": withoutSpaces,
    };
    return spaceOBJ;
};

// function for word count, pretty straight forward.
const wordCount = (text) =>{
    return text.trim().split(' ').length;
};


// the function for character counting. This one took a little thinking, but I finally managed to get a version I am relatively happy with.

const characterCount = (text) =>{

    let arrayOfJSON  = [];
    // okay, so it needs to check if the given char is a number or a char, duh
    // then, it needs to create an array of objects, objects being char and amount of times and key and value

    // first, let's trim the text into one single string
    let trimmedText = text.replace(/\s/g, "");

    // then sort it alphabetically and remove the commas
    trimmedText = trimmedText.split("").then((textJSON) => {textJSON.toLowerCase().sort().join().replace(/,/g, "")});


    //then, let's check for every entry is the given entry a character or not
    for(let i = 0; i < trimmedText.length; i++) {
        if(isACharacter(trimmedText[i])){
            // if the character is a... well, a character, then add it to an object
            // before we do that, we should check if the word contains any other similiar characters and how many there are
            // if they exist.
            let x = recursiveCharCounter(trimmedText, i, 1);
            let c = trimmedText.charAt(i);
            arrayOfJSON.push({
                [c]: x
            });

            // if there happened to be more than one similliar character, we don't need to check them again.
            // here we tell the for loop to continue after hopping over said characters.
            if(x > 1){i +=(x-1)}
        };

    }

    return arrayOfJSON;
};

// function for checking if given char is a character, used in character counting
const isACharacter = (char) => {
    return char.toLowerCase() !== char.toUpperCase();
};

// function used in character counting. it checks if the next character in a given word and index is same or not.
// finally returns the number of times a character was repeated.
const recursiveCharCounter = (trimmedText, index, counter) => {
    let nextIndex = index + 1;
    if(trimmedText.charAt(index) !== trimmedText.charAt(nextIndex)){
        // the following char isnt the same, return 1
        return counter;
    }else{
        // ..if the next char is the same, add to counter and do the function again
        counter++;
        return recursiveCharCounter(trimmedText, nextIndex, counter)
    }
};


module.exports = {
    textParser: textParser,
};