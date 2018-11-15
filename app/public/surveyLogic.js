// Logic for the survey in how it takes in answers and matches a user up with thier match baised on those answers

// modal ready function gets styling elements 
$(document).ready(function(){
    $("select").material_select();
    $(".modal").modal({
        dismissable: false,
        opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%' // Ending top style attribute
    });
});

// When the user submits the test answers
$("submitTest").on("click", function(event) {
    event.preventDefault();

    // pull in and clean all user inputs
    var userInput = {
        name: $("#userName").val().trim(),
        photo: $("#userPhoto").val().trim(),
        results: [
            ("#questionOne").val().trim(),
            ("#questionTwo").val().trim(),
            ("#questionThree").val().trim(),
            ("#questionFour").val().trim(),
            ("#questionFive").val().trim(),
            ("#questionSix").val().trim(),
            ("#questionSeven").val().trim(),
            ("#questionEight").val().trim(),
            ("#questionNine").val().trim(),
            ("#questionTen").val().trim()
        ]
    };

    // post test info
    $.post("api/friends", userInput)
    .done(function(data) {

        $("userMatch").html(data.matchName);
        $("#userMatchImage").attr("src", data.matchImage);
        $("#surveyMatch").modal("open")
    })
})
