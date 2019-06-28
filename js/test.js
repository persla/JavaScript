
window.Test = (function () {
    "use strict";
    var quizContainer = document.getElementsByClassName('quiz')[0];
    var resultsContainer = document.getElementById('results');
    var optionContainer = document.getElementById('options');
    var content = document.getElementsByClassName("content")[0];
    var nextButton = document.getElementById('next_button');
    // var prevButton = document.getElementById('prev_button');
    var resultButton = document.getElementById('result_button');
    // var intro = document.getElementsByClassName('intro')[0];
    var word = document.getElementsByClassName('word')[0];
    var buzz = document.getElementsByClassName('buzz')[0];
    var object = document.getElementsByClassName('object')[0];
    var wordButton = document.getElementById('wordButton');
    var bufiButton = document.getElementById('bufiButton');
    var objeButton = document.getElementById('objeButton');
    var resultAllButton = document.getElementById('resultAllButton');
    var resultAlltests = [0, 0, 0];
    var testName = "";
    var test = {
        "wordTest": function() {
            testName = "word";
            var question1 = new QuizQuestion ("kurage",
                ["respekt", "ärlighet", "disciplin", "tapperhet", "stolthet"],
                "tapperhet");
            var question2 = new QuizQuestion ("abrupt",
                ["oklart", "konstigt", "plötsligt", "onormalt", "kortvarigt"],
                "plötsligt");
            var question3 = new QuizQuestion ("nischad",
                ["övertygad", "nivågrupperad", "instängd", "specialiserad", "tillträdd"],
                "specialiserad");
            var question4 = new QuizQuestion ("domän",
                ["nivå", "område", "rättighet", "församling", "ledarskap"],
                "område");
            var question5 = new QuizQuestion ("försitta",
                ["nöta", "förbereda", "dröja", "gå över", "missa"],
                "missa");
            var allQuestions = [question1, question2, question3, question4, question5];
            var numCorrect = 0;
            var numWrong = 0;
            var numAnswers = 0;
            var numQuestion = 0;

            // prevButton.style.display = "none";
            bufiButton.style.display = "none";
            objeButton.style.display = "none";
            wordButton.style.display = "none";
            nextButton.style.display = "inline";
            // Constructor to initialize the objects from the objekt-literalen.
            function QuizQuestion(question, choices, correctAnswer) {
                this.question = question;
                this.choices = choices;
                this.correctAnswer = correctAnswer;
                // draw function
                this.draw = function() {
                    while (resultsContainer.firstChild) {
                        resultsContainer.removeChild(resultsContainer.firstChild);
                    }
                    word.style.display = "none";
                    numQuestion++;
                    var temp = [];
                    var userAnswer = "";

                    for (var i = 0; i < this.choices.length; i++) {
                        temp = document.createElement("div");
                        temp.className = "choices";
                        temp.id = this.choices[i];
                        temp.innerHTML = this.choices[i];

                        temp.addEventListener("click", function(event) {
                            // capture user input
                            userAnswer = event.target.innerHTML;
                            var choiceStyle = document.getElementById(event.target.innerHTML);

                            QuizAnswers (correctAnswer, userAnswer, question);
                            // changes properties for dom event
                            choiceStyle.style.pointerEvents = "none";
                            choiceStyle.style.color = 'gray';
                        }); resultsContainer.appendChild(temp);
                    }quizContainer.style.color = 'black';
                    resultsContainer.style.color = 'black';
                    resultsContainer.style.pointerEvents = "";
                    quizContainer.innerHTML = "<p>" +numQuestion+
                    ". Vad betyder ordet <i>"
                    + this.question + "</i>?</p>";
                };
            }

            //user response assessment function
            function QuizAnswers(correctAnswer, userAnswer, question) {
                numAnswers++;
                console.log("antal: " + numAnswers);

                if (userAnswer===correctAnswer) {
                    numCorrect++;
                    quizContainer.innerHTML = "<p>"+ numQuestion+ ". Korrekt, <i>"
                    + question +
                    "</i> betyder <b>" + correctAnswer + "</b>!</p>";
                    // color the answers green and removes clicks opportunities
                    quizContainer.style.color = 'green';
                    resultsContainer.style.color = 'gray';
                    resultsContainer.style.pointerEvents = "none";
                } else {
                    // color the answers red, with new opportunities to respond
                    quizContainer.innerHTML ="<p>"+ numQuestion+ ". Ordet <i>"
                    + userAnswer +
                    " </i>är inkorrekt. Nytt försök: Vad betyder <i>"
                    + question + "</i>?</p>";
                    quizContainer.style.color = 'red';
                    numWrong++;
                } optionContainer.innerHTML = "Antal rätt: " + numCorrect + " Antal fel: "
                + numWrong +
                " Antal svar: " + numAnswers + " Fråga: " + numQuestion + " av totalt "
                + allQuestions.length;
            }

            var i = 0;

            // navigation functions
            function nextItem() {
                i = i + 1; // increase i by one
                if (i == allQuestions.length) {
                    // prevButton.style.display = "none";
                    nextButton.style.display = "none";
                    resultButton.style.display = "inline";
                }
            }

            var idx = 0;

            // function for navigating between the questions
            nextButton.addEventListener(
                'click',
                function () {
                    nextItem();
                    idx ++;
                    if (idx === 1) {
                        question1.draw();
                    } else if (idx === 2) {
                        question2.draw();
                    } else if (idx === 3) {
                        question3.draw();
                    } else if (idx === 4) {
                        question4.draw();
                    } else if (idx === 5) {
                        question5.draw();
                    }
                }
            );
            // function that presents the result from the partial test
            resultButton.addEventListener(
                'click',
                function () {
                    resultsContainer.innerHTML = "<h1>Resultat från deltest 1</h1>Andel"+
                    " korrekta svar: "
                    + Math.floor(numCorrect /numAnswers*100)+ " %</p><p>Andel inkorrekta svar : "
                    + Math.floor(numWrong /numAnswers*100)+
                    " %</p><p>Antal svar: " + numAnswers + " och optimalt för testet är  "
                    + numQuestion + " </p>" + "</p><p>Antal besvarade frågor: "
                    + numQuestion + " av totalt "
                    + allQuestions.length +
                    "</p><h3>Nästa är deltest 2: Matematisk-logisk förmåga</h3>";
                    resultButton.style.display = "none";
                    bufiButton.style.display = "inline";
                    resultsContainer.style.color = 'black';
                    //first test add to resultAlltests
                    resultAlltests.splice(0, 1, numCorrect);
                    while (quizContainer.firstChild) {
                        quizContainer.removeChild(quizContainer.firstChild);
                    }
                }
            );
            console.log("resultat alla 1 " + resultAlltests);
        },
        "fizzBuzz": function() {
            testName = "fizzBuzz";
            var numCorrect = 0;
            var numWrong = 0;
            var numAnswers = 0;
            var numQuestion = 0;
            var unanswer = 0;
            var resultat =  "";
            var resultatNum =  "";
            var fizzbuzzArr= [];
            var numberArr = [];
            var correctAnswer = "";
            var number = "";
            var outputfizzbuzz = "";
            var optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];

            quizContainer.style.color = 'black';
            nextButton.style.display = "inline";
            resultsContainer.style.display = "none";
            bufiButton.style.display = "none";
            wordButton.style.display = "none";
            objeButton.style.display = "none";


            //Gets a random sequence of FizzBuzz in range of 6 items.
            function getRandomInt() {
                var start = Math.floor(Math.random() * 200) + 2224;

                fizzBuzz(start, start + 5);
            }
            // Generates FizzBuzz sequence and gets FizzBuzz test variables
            function fizzBuzz(start, stop) {
                resultat =  "";
                resultatNum =  "";
                fizzbuzzArr= [];
                numberArr = [];
                correctAnswer = "";
                number = "";
                outputfizzbuzz = "";
                for (var i = start; i <= stop; i++) {
                    if (i % 3 == 0 && i % 5 == 0) {
                        resultat = resultat +"FizzBuzz" +", ";
                    } else if (i % 3 == 0) {
                        resultat = resultat + "Fizz" +", ";
                    } else if (i % 5 == 0) {
                        resultat = resultat + "Buzz" +", ";
                    } else {
                        resultat = resultat + i +", ";
                    }
                }
                fizzbuzzArr = resultat.split(",");
                fizzbuzzArr.pop();
                correctAnswer = fizzbuzzArr.splice(-1, 1, '??????');
                outputfizzbuzz = fizzbuzzArr.join(', ');

                function fizzBuzzNum(start, stop) {
                    for (var i = start; i <= stop; i++) {
                        resultatNum = resultatNum + i +", ";
                    }
                    numberArr = resultatNum.split(",");
                    numberArr.pop();
                    number = numberArr.splice(-1, 1, '??????');
                }fizzBuzzNum(start, start + 5);
            }//end function fizzbuzz
            getRandomInt();

            //Objects with the FizzBuzz sequence, answer options and the correct answer'
            //Including randomization of the sequence.
            optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];
            var question1 = new QuizQuestion (outputfizzbuzz, optionFizzbuzz, correctAnswer);

            getRandomInt();
            optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];
            var question2 = new QuizQuestion (outputfizzbuzz, optionFizzbuzz, correctAnswer);

            getRandomInt();
            optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];
            var question3 = new QuizQuestion (outputfizzbuzz, optionFizzbuzz, correctAnswer);

            getRandomInt();
            optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];
            var question4 = new QuizQuestion (outputfizzbuzz, optionFizzbuzz, correctAnswer);

            getRandomInt();
            optionFizzbuzz = [" FizzBuzz", " Fizz", " Buzz", number];
            var question5 = new QuizQuestion (outputfizzbuzz, optionFizzbuzz, correctAnswer);
            var allQuestions = [question1, question2, question3, question4, question5];

            //Constructor for FizzBuzz output.
            function QuizQuestion(question, choices, correctAnswer) {
                this.question = question;
                this.choices = choices;
                this.correctAnswer = correctAnswer;

                this.draw = function() {
                    //Deletes the answer options from the previous question.
                    while (resultsContainer.firstChild) {
                        resultsContainer.removeChild(resultsContainer.firstChild);
                    }
                    buzz.style.display = "none";
                    var temp = [];
                    var userAnswer = "";

                    //Generates elements for the answer options and adds event listener.
                    for (var i = 0; i < this.choices.length; i++) {
                        temp = document.createElement("div");
                        temp.className = "choices";
                        temp.id = this.choices[i];
                        temp.innerHTML = this.choices[i];

                        temp.addEventListener("click", function(event) {
                            userAnswer = event.target.innerHTML;
                            var choiceStyle = document.getElementById(event.target.innerHTML);

                            QuizAnswers (correctAnswer, userAnswer, question);
                            choiceStyle.style.pointerEvents = "none";
                            choiceStyle.style.color = 'gray';
                        }); resultsContainer.appendChild(temp);
                    }//Resets the style of the options after each question
                    quizContainer.style.color = 'black';
                    resultsContainer.style.color = 'black';
                    resultsContainer.style.pointerEvents = "";
                    numQuestion++;
                    quizContainer.innerHTML = numQuestion+
                    ". Vad ska ersätta ?????? i sekvensen:<p> <i>"
                    + this.question + "</i></p>";
                };
            }
            //user response assessment function
            function QuizAnswers(correctAnswer, userAnswer, question) {
                numAnswers++;
                console.log("antal: " + numAnswers);

                if (userAnswer==correctAnswer) {
                    numCorrect++;
                    quizContainer.innerHTML = numQuestion+ ". Korrekt!<p><i>" +
                    question.slice(0, -6) +
                    "<b>" + correctAnswer + "!</b></i></p>";

                    // color the question green
                    quizContainer.style.color = 'green';
                    // color the answers gray and and removes pointerEvents.
                    resultsContainer.style.color = 'gray';
                    resultsContainer.style.pointerEvents = "none";
                } else if (userAnswer!=correctAnswer) {
                    quizContainer.innerHTML = numQuestion+ ". <i>" + userAnswer +
                    " </i>är inkorrekt. Nytt försök: Vad ska ersätta ?????? i sekvensen:<p><i>"
                    + question + "</i></p>";
                    //color the question red
                    //userAnswer.style.pointerEvents = "none";
                    quizContainer.style.color = 'red';
                    numWrong++;
                } else {
                    unanswer++;
                    console.log("obesvarade" + unanswer);
                } optionContainer.innerHTML = "Antal rätt: " + numCorrect + " Antal fel: "
                + numWrong +
                " Antal svar: " + numAnswers + " Fråga: " + numQuestion + " av totalt "
                + allQuestions.length;
            }
            //Functions that navigate between the questions and render the result of the test
            var j = 0;

            function nextItem() {
                j = j + 1;
                if (j == allQuestions.length) {
                    nextButton.style.display = "none";
                    resultButton.style.display = "inline";
                }
            }

            var idx = 0;

            nextButton.addEventListener(
                'click',
                function () {
                    resultsContainer.style.display = "inline";
                    nextItem();
                    idx ++;
                    if (idx === 1) {
                        question1.draw();
                    } else if (idx === 2) {
                        question2.draw();
                    } else if (idx === 3) {
                        question3.draw();
                    } else if (idx === 4) {
                        question4.draw();
                    } else if (idx === 5) {
                        question5.draw();
                    }
                    getRandomInt();
                }
            );

            resultButton.addEventListener(
                'click',
                function () {
                    resultsContainer.innerHTML = "<h1>Resultat från deltest 2</h1>"
                    + "Andel korrekta svar: "
                    + Math.floor(numCorrect /numAnswers*100) + " %</p><p>Andel inkorrekta svar : "
                    + Math.floor(numWrong /numAnswers*100)+
                    " %</p><p>Antal svar på testet: " + numAnswers +
                    " och optimalt för testet är " + numQuestion + " </p>" +
                    "</p><p>Antal besvarade frågor: "
                    + numQuestion + " av totalt "
                    + allQuestions.length + "</p><h3>Nästa är deltest 3: Instruktioner och "+
                    "visuell perception</h3>";
                    resultButton.style.display = "none";
                    resultsContainer.style.color = 'black';
                    bufiButton.style.display = "none";
                    objeButton.style.display = "inline";
                    //second test add to resultAlltests
                    resultAlltests.splice(1, 1, numCorrect);
                    while (quizContainer.firstChild) {
                        quizContainer.removeChild(quizContainer.firstChild);
                    }
                }
            );
            console.log("resultat alla 2 : " + resultAlltests);
        },
        "objectsTest": function() {
            testName = "object";
            var userAnswerArray = [];
            var temp = [];
            var userAnswer = "";
            var numCorrect = 0;
            var time = document.getElementById("countdowntimer");

            var options1 = ["Den gröna ovalen", "Den gula rektangeln", "Den röda ovalen",
                "Den gröna cirkeln", "Den svarta cirkeln", "Den gula ovalen", "Den blå rektangeln",
                "Den röda cirkeln", "Den blå kvadraten", "Den svarta kvadraten"];
            var objects1 = ["blue square", "yellow rectangle", "red circle", "green circle",
                "black circle",
                "green oval", "blue rectangle", "red oval", "yellow oval", "black square"];
            var answers1 = ["green oval", "yellow rectangle", "red oval", "green circle",
                "black circle",
                "yellow oval", "blue rectangle", "red circle", "blue square", "black square"];

            quizContainer.style.color = 'black';
            quizContainer.style.float = "left";
            resultsContainer.style.display = "none";
            bufiButton.style.display = "none";
            wordButton.style.display = "none";
            objeButton.style.display = "none";
            nextButton.style.display = "inline";
            time.style.display = "none";
            // creates a string for the numbered lists of objects
            var optionsstr1= "";
            var order = 0;

            for (var i = 0; i < options1.length; i++) {
                order ++;
                optionsstr1 += "<p>" + order + ". " + options1[i]+"</p>";
            }

            var question1 = new QuizQuestion(optionsstr1,
                objects1.sort(function() { return 0.5 - Math.random(); }),
                answers1);
            //
            // var question3 = new QuizQuestion(optionsstr1,
            //     objects1.sort(function() { return 0.5 - Math.random(); }),
            //     answers1);
            //
            // var question4 = new QuizQuestion(optionsstr1,
            //     objects1.sort(function() { return 0.5 - Math.random(); }),
            //     answers1);
            //
            // var question5 = new QuizQuestion(optionsstr1,
            //     objects1.sort(function() { return 0.5 - Math.random(); }),
            //     answers1);

            // var allQuestions = [question1, question2, question3, question4, question5];
            //Constructor for object output.
            function QuizQuestion(question, choices, correctAnswer) {
                this.question = question;
                this.choices = choices;
                this.correctAnswer = correctAnswer;

                this.draw = function() {
                    while (resultsContainer.firstChild) {
                        resultsContainer.removeChild(resultsContainer.firstChild);
                    }
                    object.style.display = "none";
                    timer();
                    time.style.display = "inline";
                    for (var i = 0; i < this.choices.length; i++) {
                        temp = document.createElement("div");
                        temp.className = "box " + this.choices[i];
                        temp.id = this.choices[i];
                        temp.innerHTML = this.choices[i];
                        temp.style.margin = "5px";
                        temp.style.marginTop = "20px";
                        temp.style.color = 'transparent';
                        resultsContainer.style.pointerEvents = "";
                        temp.addEventListener("click", function(event) {
                            userAnswer = event.target.innerHTML;
                            // resultsContainer.style.pointerEvents = "";
                            console.log('skriver in' + userAnswer);
                            QuizAnswers(correctAnswer, userAnswer);
                        });
                        resultsContainer.appendChild(temp);
                    }quizContainer.innerHTML = "Klicka på objekten enligt listans ordning: <br>"
                    +this.question;
                    resultsContainer.style.display = "inline";
                    optionContainer.style.display = "none";
                    nextButton.style.display = "none";
                };
            }
            // timer function to hide the objects
            function timer() {
                var timeleft = 15;
                var downloadTimer = setInterval(function() {
                    timeleft--;
                    document.getElementById("countdowntimer").textContent = timeleft
                    + ": Timer";
                    if (timeleft <= 0) {
                        clearInterval(downloadTimer);
                    }
                    if (timeleft == 0) {
                        resultsContainer.style.display = "none";
                        optionContainer.style.display = "inline";
                        //quizContainer.style.display = "none";
                        resultAllButton.style.display = "block";
                        time.style.display = "none";
                        while (quizContainer.firstChild) {
                            quizContainer.removeChild(quizContainer.firstChild);
                        }
                    }
                }, 1000);
            }
            // function for user input assessment
            function QuizAnswers(correctAnswer, userAnswer) {
                userAnswerArray.push(userAnswer);
                for (var i = 0, len = correctAnswer.length; i < len; i++) {
                    if (correctAnswer[i] == userAnswerArray[i]) {
                        correctAnswer.splice([i], 1);
                        userAnswerArray.splice([i], 1);
                        console.log("rätt svar: "+correctAnswer[i] + [i]);
                        console.log("anvansvar: "+userAnswerArray[i] + [i]);
                    }
                } numCorrect = options1.length - correctAnswer.length;
                optionContainer.innerHTML = "<p> Resultat från deltest 3</p><p> "+
                numCorrect + " och optimalt för testet är "+ options1.length+"<p>";
                console.log("rätt: "+ numCorrect);
                //third test add to resultAlltests
                resultAlltests.splice(2, 1, numCorrect);

                console.log(correctAnswer);
                console.log(userAnswerArray);
            }

            nextButton.addEventListener(
                'click',
                function () {
                    resultsContainer.style.display = "inline";
                    question1.draw();
                    // nextItem();
                }
            );
        },
        "results": function() {
            console.log("resultat");
            console.log("resultat alla 3 " + resultAlltests);
            // function for presenting the result from the entire test
            var resultat = 0;
            var kategori1 = "";
            var kategori2 = "";
            var kategori3 = "";

            if (resultAlltests[0] == 4 || resultAlltests[0] == 5) {
                kategori1 = "hög";
            } else if (resultAlltests[0] == 2 || resultAlltests[0] == 3 ) {
                kategori1 = "normal";
            } else {
                kategori1 = "låg";
            }
            if (resultAlltests[1] == 4 || resultAlltests[1] == 5) {
                kategori2 = "hög";
            } else if (resultAlltests[1] == 2 || resultAlltests[1] == 3 ) {
                kategori2 = "normal";
            } else {
                kategori2 = "låg";
            }
            if (resultAlltests[2] > 7) {
                kategori3 = "hög";
            } else if (resultAlltests[2] < 7 && resultAlltests[2] > 2 ) {
                kategori3 = "normal";
            } else {
                kategori3 = "låg";
            }
            resultat = resultAlltests.reduce(function(pv, cv) { return pv + parseInt(cv); }, 0);
            content.innerHTML = "<h1>Begåvningsprofil</h1>" +
            "Begåvningsprofilen är en tolkning av resultatet från deltesterna vart och" +
            " ett för sig. Kategorierna är svag, normal och hög."+
            "<h3>Resultatet från deltest 1 indikerar en<i><b> "+
            kategori1 +" </i> verbal begåvning.</b></h3>"+
            "<h3>Resultatet från deltest 2 indikerar en<i><b> "+
            kategori2 +" </i> numerisk begåvning.</b></h3>"+
            "<h3>Resultatet från deltest 3 indikerar en<i><b> "+
            kategori3 +" </i> figural begåvning.</b></h3>"+
            "<h2>Allmänbegåvning</h2>" + resultat + " av maximalt 20.";
        },
        "reset": function() {
            // resets and restarts the partial test
            switch (testName) {
                case "word":
                    console.log("word reset");
                    resultsContainer.innerHTML = "Gör ordtestet igen!";
                    test.wordTest();

                    break;
                case "fizzBuzz":
                    console.log("fizzBuzz reset");
                    quizContainer.innerHTML = "Gör fizzbuzz igen!";
                    test.fizzBuzz();

                    break;
                case "object":
                    console.log("object reset");
                    optionContainer.innerHTML = "Gör figurtestet igen!";
                    resultAllButton.style.display = "none";
                    test.objectsTest();
                    break;
                default:
                    console.log("Inget test");
            }
        },

    };

    return test;
})();
