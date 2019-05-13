var panel = $("#quiz-area");

var countStartNumber = 30;

// Question set
var questions = [
    
    {
    question: "What is Mario's last name?",
    answers: ["Spaghetti", "Mario", "Jumpman", "Luigi"],
    correctAnswer: "Mario",
    description: "His full name is Mario Mario.",
    image: "assets/mario.gif"
    },

    {
    question: "What is the difference between Peach and Daisy in SSBU?",
    answers: ["Peach`s melee is stronger", "Daisy`s melee is stronger", "All of the above", "No difference"],
    correctAnswer: "Peach`s melee is stronger",
    description: "Although this is barely a noticable difference.",
    image: "assets/peach.gif"
    },

    {
    question: "What color was Kirby supposed to be at first?",
    answers: ["Yellow", "White", "Pink", "Blue"],
    correctAnswer: "Pink",
    description: "Sakurai always wanted Kirby to be pink, but Miyamoto wanted him to be yellow.",
    image: "assets/db9602d40e9b8a4029bb775bd89058eb.gif"
    },

    {
    question: "What was the first failed Nintendo console?",
    answers: ["Wii", "Virtual Boy", "Wii U", "Nintendo DS"],
    correctAnswer: "Virtual Boy",
    description: "The Virtual Boy was Nintendo's first failed console, with the Wii U coming in second.",
    image: "assets/virtual.gif"
    },

    {
    question: "What date was the original Mario Bros. released in Japan?",
    answers: ["September 13th, 1985", "September 14th, 1985", "September 20th, 1985", "September 21st, 1986"],
    correctAnswer: "September 13th, 1985",
    description: "It then came out in North America soon after.",
    image: "assets/mariobros.gif"
    }

]

// Variable to hold our setInterval
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
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++)
        {
            panel.append("<button class='answer-button' id='button' data-name='" +
            questions[this.currentQuestion].answers[i] +
            "'>" + questions[this.currentQuestion].answers[i] + "</button>");
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

        $("#counter-number").html(game.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").html(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.correct + game.incorrect)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
        
    },

    clicked: function(e) {

        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) 
        {
            this.answeredCorrectly();
        }
        else
        {
            this.answeredIncorrectly();
        }

    },

    answeredIncorrectly: function() {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    answeredCorrectly: function() {

        game.correct++;

        clearInterval(timer);

        panel.html("<h2>Correct!</h2>");
        panel.append("<h3>" + questions[game.currentQuestion].description + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    reset: function() {

        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();

    }

};


// CLICK EVENTS
// ----------------------------------------------------------------
$(document).on("click", "#start-over", function() {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30 </span> Seconds</h2>");
    game.loadQuestion();
});

