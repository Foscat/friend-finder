// Logic for the survey in how it takes in answers and matches a user up with thier match baised on those answers

var crazyTest = $(document).ready(function(){
    // console.log("Test1")
    $("#matchInfo").hide();
    // $("select").formSelect();

    // console.log("Test2")
// When the user submits the test answers
$("#submitTest").on("click", function(event) {

    // console.log("Test3");

    event.preventDefault();
    
    // pull in and clean all user inputs
    var userInput = {
        name: $("#userName").val().trim(),
        photo: $("#userPhoto").val().trim(),
        results: [
            $("#questionOne").val().trim(),
            $("#questionTwo").val().trim(),
            $("#questionThree").val().trim(),
            $("#questionFour").val().trim(),
            $("#questionFive").val().trim(),
            $("#questionSix").val().trim(),
            $("#questionSeven").val().trim(),
            $("#questionEight").val().trim(),
            $("#questionNine").val().trim(),
            $("#questionTen").val().trim()
        ]
        
    }

    console.log(userInput);

    // post test info
    $.post("api/friends", userInput)
    .done(function(data) {

        console.log('response = ' + JSON.stringify(data));

        // Set the name and image values of friend match
        $("#userMatch").append(data.name);
        $("#userMatchPhoto").attr("src", data.photo);
        // makes info appear
        $("#matchInfo").show();
        
    })
})
});

