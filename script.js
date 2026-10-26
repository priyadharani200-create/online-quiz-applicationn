const questions = {

            web: [

                {

                    q: "What does HTML stand for?",

                    options: [

                        "Hyper Text Markup Language",

                        "High Text Machine Language",

                        "Hyper Tool Multi Language",

                        "Home Text Markup Language"

                    ],

                    answer: 0

                },

                {

                    q: "Which language styles web pages?",

                    options: ["HTML", "CSS", "SQL", "Python"],

                    answer: 1

                },

                {

                    q: "Which language adds interactivity to websites?",

                    options: ["CSS", "HTML", "JavaScript", "XML"],

                    answer: 2

                },

                {

                    q: "Which tag creates a hyperlink?",

                    options: ["<p>", "<a>", "<h1>", "<img>"],

                    answer: 1

                },

                {

                    q: "Which tag displays an image?",

                    options: ["<image>", "<pic>", "<img>", "<src>"],

                    answer: 2

                }

            ],

 

            general: [

                {

                    q: "What is the capital of India?",

                    options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"],

                    answer: 2

                },

                {

                    q: "How many days are in a week?",

                    options: ["5", "6", "7", "8"],

                    answer: 2

                },

                {

                    q: "Which planet do we live on?",

                    options: ["Mars", "Earth", "Venus", "Jupiter"],

                    answer: 1

                },

                {

                    q: "Which is the largest ocean?",

                    options: [

                        "Atlantic",

                        "Indian",

                        "Arctic",

                        "Pacific"

                    ],

                    answer: 3

                },

                {

                    q: "How many months are in a year?",

                    options: ["10", "11", "12", "13"],

                    answer: 2

                }

            ],

 

            science: [

                {

                    q: "Which planet is known as the Red Planet?",

                    options: ["Earth", "Mars", "Venus", "Saturn"],

                    answer: 1

                },

                {

                    q: "What gas do plants absorb?",

                    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],

                    answer: 2

                },

                {

                    q: "What is the chemical formula of water?",

                    options: ["CO2", "O2", "H2O", "NaCl"],

                    answer: 2

                },

                {

                    q: "Which organ pumps blood?",

                    options: ["Brain", "Heart", "Lungs", "Kidney"],

                    answer: 1

                },

                {

                    q: "What force pulls objects toward Earth?",

                    options: ["Friction", "Magnetism", "Gravity", "Pressure"],

                    answer: 2

                }

            ]

        };

 

        let quizQuestions = [];

        let questionIndex = 0;

        let scoreValue = 0;

        let timeLeft = 60;

        let timerInterval;

        let locked = false;

 

        function startQuiz() {

            const category =

                document.getElementById("category").value;

 

            quizQuestions = [...questions[category]]

                .sort(() => Math.random() - 0.5);

 

            questionIndex = 0;

            scoreValue = 0;

            timeLeft = 60;

 

            document.getElementById("setup").style.display = "none";

            document.getElementById("result").style.display = "none";

            document.getElementById("quiz").style.display = "block";

 

            document.getElementById("timer").textContent = timeLeft;

 

            clearInterval(timerInterval);

 

            showQuestion();

 

            timerInterval = setInterval(() => {

                timeLeft--;

 

                document.getElementById("timer").textContent = timeLeft;

 

                if (timeLeft <= 0) {

                    finishQuiz();

                }

            }, 1000);

        }

 

        function showQuestion() {

            if (questionIndex >= quizQuestions.length) {

                finishQuiz();

                return;

            }

 

            locked = false;

 

            const question = quizQuestions[questionIndex];

 

            document.getElementById("question").textContent = question.q;

            document.getElementById("current").textContent =

                questionIndex + 1;

 

            document.getElementById("progress").value = questionIndex;

            document.getElementById("feedback").textContent = "";

 

            const answers = document.getElementById("answers");

            answers.innerHTML = "";

 

            document.getElementById("next").disabled = true;

 

            question.options.forEach((option, index) => {

                const button = document.createElement("button");

 

                button.textContent = option;

                button.onclick = () => chooseAnswer(index, button);

 

                answers.appendChild(button);

            });

        }

 

        function chooseAnswer(selectedIndex, selectedButton) {

            if (locked) return;

 

            locked = true;

 

            const question = quizQuestions[questionIndex];

            const buttons = document.querySelectorAll("#answers button");

 

            buttons.forEach(button => button.disabled = true);

 

            buttons[question.answer].classList.add("correct");

 

            if (selectedIndex === question.answer) {

                scoreValue++;

 

                document.getElementById("feedback").textContent =

                    "Correct answer!";

            } else {

                selectedButton.classList.add("wrong");

 

                document.getElementById("feedback").textContent =

                    "Incorrect answer!";

            }

 

            document.getElementById("next").disabled = false;

        }

 

        function nextQuestion() {

            if (!locked) return;

 

            questionIndex++;

            showQuestion();

        }

 

        function finishQuiz() {

            clearInterval(timerInterval);

 

            document.getElementById("quiz").style.display = "none";

            document.getElementById("result").style.display = "block";

 

            const total = quizQuestions.length;

            const percentage = total

                ? Math.round((scoreValue / total) * 100)

                : 0;

 

            document.getElementById("score").textContent =

                "Score: " + scoreValue + " / " + total;

 

            document.getElementById("percentage").textContent =

                "Performance: " + percentage + "%";

 

            let message;

 

            if (percentage >= 80) {

                message = "Excellent work!";

            } else if (percentage >= 50) {

                message = "Good effort! Keep practising.";

            } else {

                message = "Keep learning and try again!";

            }

 

            document.getElementById("message").textContent = message;

        }

 

        function showSetup() {

            clearInterval(timerInterval);

 

            document.getElementById("result").style.display = "none";

            document.getElementById("setup").style.display = "block";

        }