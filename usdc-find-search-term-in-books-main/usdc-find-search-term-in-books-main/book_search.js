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
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    if(searchTerm == "" || scannedTextObj == null)
        return null;

    var result = {
        "SearchTerm": "",
        "Results": []
    };
    result["SearchTerm"] = searchTerm;
    
    for(var bookNum = 0; bookNum < scannedTextObj.length; bookNum++) {
        for (var contentNum = 0; contentNum < scannedTextObj[bookNum].Content.length; contentNum++) {

            if (JSON.stringify(scannedTextObj[0].Content[contentNum].Text).includes(searchTerm)) {

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



/** Test 4: Given a known input on multiple lines we get results on multiple lines as well */
const test4result = findSearchTermInBooks("w", twentyLeaguesIn); 
if (test4result.Results.length == 3) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 3);
    console.log("Received:", test4result.Results.length);
}


/** 
 * NEGATIVE TESTS
*/

/** Test 3: Checking for two empty inputs*/
const test3result = findSearchTermInBooks("", null);
if (test3result === null) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", null);
    console.log("Received:", test3result);
}

/** Test 5: Checking for empty search term input*/
const test5result = findSearchTermInBooks("", twentyLeaguesIn);
if (test5result === null) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", null);
    console.log("Received:", test5result);
}

/** Test 6: Checking for empty book input*/
const test6result = findSearchTermInBooks("", null);
if (test6result === null) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", null);
    console.log("Received:", test6result);
}

/** 
 * CASE SENSITIVE TESTS
*/
/** Given a known uppercase input, the Line output should not equal the Line output of a lowercase input */
const test7result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(test7result.Results[0].Line) != JSON.stringify(twentyLeaguesOut.Results[0].Line)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", JSON.stringify(twentyLeaguesOut.Results[0].Line));
    console.log("Received:", JSON.stringify(test7result.Results[0].Line));
}