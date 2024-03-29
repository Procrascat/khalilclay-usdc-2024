/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */


 /**
 * Checks that each JSON is formated to be a book and if the book's non-empty contents have phrases.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {boolean} - returns true if JSON is a book and false if it is not.
 * */    
 function checkBookIntegrity(scannedTextObj) {
    for(var bookNum = 0; bookNum < scannedTextObj.length; bookNum++) {
        if(!scannedTextObj[bookNum].hasOwnProperty("Title") || !scannedTextObj[bookNum].hasOwnProperty("ISBN") ||
            !scannedTextObj[bookNum].hasOwnProperty("Content")) {

                return false

        }
        for (var contentNum = 0; contentNum < scannedTextObj[bookNum].Content.length; contentNum++) {

            

            if(!scannedTextObj[bookNum].Content[contentNum].hasOwnProperty("Page") || 
                !scannedTextObj[bookNum].Content[contentNum].hasOwnProperty("Line") || 
                !scannedTextObj[bookNum].Content[contentNum].hasOwnProperty("Text"))
                    return false;
                
        }
    }
    return true;
 }

 /**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    if(typeof searchTerm != 'string' || typeof scannedTextObj !== 'object')
        return null;
    if(searchTerm == "" || scannedTextObj == null)
        return null;

    if(!checkBookIntegrity(scannedTextObj))
        return null;

    var result = {
        "SearchTerm": "",
        "Results": []
    };
    result["SearchTerm"] = searchTerm;
    
    for(var bookNum = 0; bookNum < scannedTextObj.length; bookNum++) {
        for (var contentNum = 0; contentNum < scannedTextObj[bookNum].Content.length; contentNum++) {

            if (JSON.stringify(scannedTextObj[bookNum].Content[contentNum].Text).includes(searchTerm)) {

                result.Results.push({
                    "ISBN": scannedTextObj[bookNum].ISBN,
                    "Page": scannedTextObj[bookNum].Content[contentNum].Page,
                    "Line": scannedTextObj[bookNum].Content[contentNum].Line
                });
                
            }

        }
    }   
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Multi-book example*/
const twoBooksIn = [
    {
        "Title": "How to Make a Various Cakes Vol. 1",
        "ISBN": "4784804528535",
        "Content": [
            {
                "Page": 21,
                "Line": 3,
                "Text": "Then add 5 teaspoons of sugar to the cake mixture."
            },
            {
                "Page": 52,
                "Line": 1,
                "Text": "This next part of Jerry McCormic\'s 'World of Cake' Collection."
            },
            {
                "Page": 60,
                "Line": 10,
                "Text": ": saftey glasses, knee pads, and gloves will be required"
            } 
        ] 
    },
    {
        "Title": "Corrupted Book",
        "ISBN": "000000000000000",
        "Content": [
            
        ] 
    },
    {
        "Title": "How to Make a Various Cakes Vol. 2",
        "ISBN": "4789814538535",
        "Content": [
            {
                "Page": 56,
                "Line": 4,
                "Text": "cake theory is about the relation each ingredient has to each other"
            },
            {
                "Page": 87,
                "Line": 5,
                "Text": "This recipe will require: eggs, butter, shrimp, vanilla cream frosting, and choco-"
            },
            {
                "Page": 100,
                "Line": 20,
                "Text": " "
            } 
        ] 
    }

    
]
/**Broken book example */
const brokenBookIn = [
    {
        "Bad Title": "Corrupted Book",
        "ISBN": "000000000000000",
        "Content": [
            
        ]
    }
]
const twoBooks1Out = {
    "SearchTerm": "cake",
    "Results": [
        {
            "ISBN": "4784804528535",
            "Page": 21,
            "Line": 3
        },
        {
            "ISBN": "4789814538535",
            "Page": 56,
            "Line": 4
        }

    ]
}

const twoBooks2Out = {
    "SearchTerm": "cake",
    "Results": [
        
        {
            "ISBN": "4784804528535",
            "Page": 52,
            "Line": 1
        }
    ]
}
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** 
 * POSITIVE TESTS
*/



/** Test 3: Given a known input on multiple lines we get results from multiple lines as well */
const test3result = findSearchTermInBooks("w", twentyLeaguesIn); 
if (test3result.Results.length == 3) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 3);
    console.log("Received:", test3result.Results.length);
}

/** Test 4: Given a known input on multiple lines and books we get results from multiple lines and booksas well */
const test4result = findSearchTermInBooks("cake", twoBooksIn); 
if (test4result.Results.length == 2) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 2);
    console.log("Received:", test4result.Results.length);
}

/** Test 5: Given a known input with punctuation on one line we get results on that line as well */
const test5result = findSearchTermInBooks("McCormic's", twoBooksIn); 
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 1);
    console.log("Received:", test5result.Results.length);
}

/** Test 6: Given a known space input on multiple lines we get results on multiple lines as well */
const test6result = findSearchTermInBooks(" ", twoBooksIn); 
if (test6result.Results.length == 6) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 6);
    console.log("Received:", test6result.Results.length);
}


/** 
 * NEGATIVE TESTS
*/

/** Test 7: Checking for two empty inputs*/
const test7result = findSearchTermInBooks("", null);
if (test7result === null) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", null);
    console.log("Received:", test7result);
}

/** Test 8: Checking for empty search term input*/
const test8result = findSearchTermInBooks("", twentyLeaguesIn);
if (test7result === null) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", null);
    console.log("Received:", test8result);
}

/** Test 9: Checking for empty book input*/
const test9result = findSearchTermInBooks("blank", null);
if (test9result === null) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", null);
    console.log("Received:", test9result);
}

/**Test 10: Checking for book integrity*/
const test10result = findSearchTermInBooks("blank", brokenBookIn);
if (test10result === null) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", null);
    console.log("Received:", test10result);
}

/**Test 11: Checking search term for string type*/
const test11result = findSearchTermInBooks(54, twoBooksIn);
if (test11result === null) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", null);
    console.log("Received:", test11result);
}

/**Test 12: Checking book for JSON object type*/
const test12result = findSearchTermInBooks("blank", 12);
if (test12result === null) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", null);
    console.log("Received:", test12result);
}
/** 
 * CASE SENSITIVE TESTS
*/
/**Test 13: Given a standard uppercase search term input, the Line output should not equal the Line output of a lowercase input */
const test13result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(test13result.Results[0].Line) != JSON.stringify(twentyLeaguesOut.Results[0].Line)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", JSON.stringify(twentyLeaguesOut.Results[0].Line));
    console.log("Received:", JSON.stringify(test13result.Results[0].Line));
}

/**Test 14: Given a lowercase search term input, the results should equal the results of a lowercase input */
const test14result = findSearchTermInBooks("cake", twoBooksIn); 
if (test14result.Results.length == twoBooks1Out.Results.length) {
    console.log("PASS: Test 14");
} else {
    console.log("FAIL: Test 14");
    console.log("Expected:", twoBooks1Out.Results.length);
    console.log("Received:", test14result.Results.length);
}

/**Test 15: Given an uppercase search term input, the results should equal the results of an uppercase input */
const test15result = findSearchTermInBooks("Cake", twoBooksIn); 
if (test15result.Results.length == twoBooks2Out.Results.length) {
    console.log("PASS: Test 15");
} else {
    console.log("FAIL: Test 15");
    console.log("Expected:", twoBooks2Out.Results.length);
    console.log("Received:", test15result.Results.length);
}

/**Test 16: Given a randomly uppercased search term input, the results should return no lines being found since the string does not exist in any book*/
const test16result = findSearchTermInBooks("CaKe", twoBooksIn); 
if (test16result.Results.length == 0) {
    console.log("PASS: Test 16");
} else {
    console.log("FAIL: Test 16");
    console.log("Expected:", 0);
    console.log("Received:", test16result.Results.length);
}