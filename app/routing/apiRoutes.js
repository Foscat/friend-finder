var friendData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {

        //  the user input is made into an object
        var userInput = req.body;
        
        // test results
        var testResults = userInput.results;
        var matchName = "";
        var matchUserName = ""
        var matchImage = "";
        var totalDifference = 10000; // Make the initial value big for comparison

        // run through all existing friends in the list
        for(var i = 0; i < friendData.length; i++) {

            // number var that will do math for each question and holds the number
            var differance = 0;
            for(var r = 0; r < testResults.length; r++) {

                differance += Math.abs(friendData[i].results[r] - testResults[r]);

            }
            
            // if lowest difference, record the friend match
            if(differance < totalDifference){
                totalDifference = differance;
                matchName = friendData[i].name;
                matchUserName = friendData[i].userName;
                matchImage = friendData[i].photo;
            }
        }

        // add new user
        friendData.push(userInput);

        // send response
        res.json({status: "OK", name: matchName, userName: matchUserName, photo: matchImage});
    })

    // for cleaning while building
    // app.post("api/clear", function(req, res) {
    //     friendData = [];
    //     res.json(true);
    // })
}
