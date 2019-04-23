var panel = $("#quiz-area");
var countStartNumber = 30;

//Question set
var questions = [
    
    {
    question: "What is Mario's last name?",
    answers: ["Spaghetti", "Mario", "Jumpman", "Luigi"],
    correctAnswer: "Mario",
    description: "His full name is Mario Jumpman Mario.",
    image: "assets\mario.gif";
    },

    {
    question: "What is the difference between Peach and Daisy in SSBU?",
    answers: ["Melee is stronger for Peach", "Melee is stronger for Daisy", "No difference", "All of the above"],
    correctAnswer: "Melee is stronger for Peach",
    description: "Although this is barely a noticable difference.",
    image: "assets\peach.gif";
    }

]

var timer;

var game = {
    
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (gameCounter === 0) {
            console.log("You ran out of time.");
            game.timeUp();
        }
    },
        
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>")
        for (var i = 0; i < questions[this.currentQuestion].answer.length; i++); {
            panel.append("<button class='answer-button' id='button' data-name=' " 
            + questions[this.currentQuestion].answer[i] + "'>" 
            + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

        nextQuestion: function() {
            game.counter = countStartNumber;
            $("#counter-number").html(game.counter);
            game.currentQuestion++;
            game.loadQuestion();
            
        },

        timeUp: function() {
            clearInterval(timer);

            $('#counter-number').html(game.counter);

            panel.html("<h2>You ran out of time!</h2>");

            panel.append("<h3>The correct answer was" + $(questions[this.currentQuestion].correctAnswer) + "</h3>");

            panel.append("<img src=' " + questions[this.currentQuestion].image + "'/>");

            if (game.currentQuestion === questions.length - 1) {

                setTimeout(game.results, 3000);

            }
            
            else {

                setTimeout(game.nextQuestion, 3000);

            }

        }

        results: function() {

            clearInterval(timer);

            panel.html("<h2> Here's how you did </h2>");

            $("#counter-number").html(game.counter);

            panel.append("<h3> Correct Answers: " + game.correct + "</h3>");
            panel.append("<h3> Incorrect Answers: " + game.incorrect + "</h3>");
            panel.append("<h3> Unanswered: " + (questions.length - (game.correct + game.incorrect)) + "</h3>");
            panel.append("<br><button id='start-over'> Start Over? </button>");

        },
}