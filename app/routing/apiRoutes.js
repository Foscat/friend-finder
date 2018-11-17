var friendData = require("../data/friends");


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        console.log(friendData)
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {

        //  the user input is made into an object
        var userInput = req.body;
        console.log('userInput = ' + JSON.stringify(userInput));
        
        // test answer results
        var testResults = userInput.results;
        console.log("testResults: " + testResults);
        // empty var to place names
        var matchName = "";
        var matchImage = "";
        var totalDifference = 10000; // Make the initial value big for comparison

        // run through all existing friends in the list
        for(var i = 0; i < friendData.length; i++) {
            console.log('friend = ' + JSON.stringify(friendData[i]));

            // number var that will do math for each question and holds the number
            var differance = 0;
            for(var r = 0; r < testResults.length; r++) {

                differance += Math.abs(friendData[i].results[r] - testResults[r]);

            }
            console.log('\ndifferance = ' + differance);
            
            // if lowest difference, record the friend match
            if(differance < totalDifference){

                console.log('\nClosest match found = ' + differance);
				console.log('\nFriend name = ' + friendData[i].name);
				console.log('\nFriend image = ' + friendData[i].photo);

                totalDifference = differance;
                matchName = friendData[i].name;
                matchImage = friendData[i].photo;
            }
        }

        // add user to total list of friends
        friendData.push(userInput);

        // send response
        res.json({status: "OK", name: matchName, photo: matchImage});
    })

    // for cleaning while building
    // app.post("api/clear", function(req, res) {
    //     friendData = [];
    //     res.json(true);
    // })
}
