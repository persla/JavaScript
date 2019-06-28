(function () {
    'use strict';
    var test = window.Test;
    // var quizContainer = document.getElementsByClassName('quiz')[0];
    var intro = document.getElementsByClassName('intro')[0];
    var word = document.getElementsByClassName('word')[0];
    var buzz = document.getElementsByClassName('buzz')[0];
    var object = document.getElementsByClassName('object')[0];
    var content = document.getElementsByClassName("content")[0];
    // var nextButton = document.getElementById('next_button');
    // var resultButton = document.getElementById('result_button');
    var wordButton = document.getElementById('wordButton');
    var bufiButton = document.getElementById('bufiButton');
    var objeButton = document.getElementById('objeButton');
    var resultAllButton = document.getElementById('resultAllButton');

    // Buttons for navigating between the different tests
    wordButton.addEventListener(
        'click',
        function () {
            test.wordTest();
            intro.style.display = "none";
            word.style.display = "inline";
            buzz.style.display = "none";
            object.style.display = "none";
        }
    );

    bufiButton.addEventListener(
        'click',
        function () {
            test.fizzBuzz();
            intro.style.display = "none";
            word.style.display = "none";
            buzz.style.display = "inline";
            object.style.display = "none";
        }
    );

    objeButton.addEventListener(
        'click',
        function () {
            test.objectsTest();
            intro.style.display = "none";
            word.style.display = "none";
            buzz.style.display = "none";
            object.style.display = "inline";
        }
    );

    resultAllButton.addEventListener(
        'click',
        function () {
            test.results();
            intro.style.display = "none";
            word.style.display = "none";
            buzz.style.display = "none";
            object.style.display = "none";
        }
    );
    content.appendChild(wordButton);
    content.appendChild(bufiButton);
    content.appendChild(objeButton);
    content.appendChild(resultAllButton);

    window.console.log('Sandbox is ready!');
})();
