

let currentQuestion = 0
let score = 0
const timerBegin = 30
let timer = timerBegin
let timerPaused = false

const questions = [
  {
    question: ' How many time zones are there in Russia? ',
    option1: '5',
    option2: '8 ',
    option3: '11 ',
    correctAnswer: '3'
  },
  {
    question: 'What’s the national flower of Japan?',
    option1: 'Cherry blossom',
    option2: 'Daisy',
    option3: 'Sunflower',
    correctAnswer: '1'
  },
  {
    question: 'How many stripes are there on the US flag?',
    option1: '7',
    option2: '10',
    option3: '13',
    correctAnswer: '3'
  },

  {
    question: 'What’s the national animal of Australia ?',
    option1: 'Red Kangaroo',
    option2: 'Koala',
    option3: 'Marsupials',
    correctAnswer: '1'
  },
  {
    question: 'How many days does it take for the Earth to orbit the Sun? ',
    option1: '170',
    option2: '1',
    option3: '365',
    correctAnswer: '3'
  },
  {
    question: 'Name the largest (not highest) mountain range in the world? ',
    option1: 'Everest',
    option2: 'The Andes',
    option3: 'Kilimanjaro',
    correctAnswer: '2'
  },
  {
    question: 'Name the longest river in the world?  ',
    option1: 'The mississipi',
    option2: 'The Nile ',
    option3: 'The Congo River',
    correctAnswer: '2'
  },
  {
    question: 'Which language has the most words',
    option1: 'English',
    option2: 'French',
    option3: 'Chinese',
    correctAnswer: '1'
  },
  {
    question: 'What is the all-time most-streamed song on Spotify to date? ',
    option1: 'Burnay Boy, Ye',
    option2: 'Michael Jackson, Thriller',
    option3: 'Ed Sheeran, The Shape of You',
    correctAnswer: '3'
  },
  {
    question: 'Who is 3rd on the all-time list of female tennis Grand Slam champions?  ',
    option1: 'Serena Williams',
    option2: 'Maria Sharapova',
    option3: 'Martina Hingis',
    correctAnswer: '1'
  },
  {
    question: 'When was Netflix founded ?',
    option1: '2001',
    option2: '1997',
    option3: '2005',
    correctAnswer: '2'
  },
]

// Document ready that runs code on page load after html elements have rendered.
$(() => {
  const $h1 = $('h1')

  // Select each option label so we can update them from question to question
  // get them by their for attribute value.
  const $radioInputLabel1 = $('label[for="question-1"]')
  const $radioInputLabel2 = $('label[for="question-2"]')
  const $radioInputLabel3 = $('label[for="question-3"]')

  // This function is responsible for rendering each question.
  const renderQuestion = () => {
    // Get the data object for the question being rendered.
    const questionData = questions[currentQuestion]

    // Update the question.
    $h1.text(questionData.question)

    // Update each option's label with question options.
    $radioInputLabel1.text(questionData.option1)
    $radioInputLabel2.text(questionData.option2)
    $radioInputLabel3.text(questionData.option3)
  }

  function goToNextQuestion() {
    // When a user switches to another question,
    // enable and uncheck answers radio buttons,
    // disable the next question button,
    // hide the text that tells the user if they got the
    // right answer or not.
    $('input[name=question]').attr("disabled", false)
    $('#Nextquestion').attr("disabled", true)
    $('input[name=question]:checked+label', '#questionsForm').css({ 'background-color': '' })
    $('input[name=question]').prop("checked", false)
    $('#goodanswer').text('')

    // Reset and resume the timer.
    timer = timerBegin
    timerPaused = false

    // if this the last question available in the questions array
    if (currentQuestion === questions.length - 1) {
      $('#labelcounter').text('Quiz finished, your final score is : ')
      alert('quiz finished!')

      // Reset quiz and start again.
      currentQuestion = 0
      score = 0
      renderQuestion()
      $('#labelcounter').text('Number of questions solved : ')
      $('#compteur').text(score)
    } else {
      // Increment the currentQuestion by 1.
      currentQuestion += 1
      // RenderQuestion again so new question will render on page utilizing 
      // updated currentQuestion value
      renderQuestion()
    }
  }

  // kick off the app and render the first question.
  renderQuestion()

  // Handle the selection of an answer.
  $('input[name=question]').change(function () {
    // Get the value corresponding to the selected answer.
    const selectedAnswer = $('input[name=question]:checked', '#questionsForm').val()
    console.log(`selectedAnswer: ${selectedAnswer}`)

    // Disable the radio buttons to make sure that the user cannot select
    // another answer.
    $('input[name=question]').attr("disabled", true)

    // Compare the selected answer with the correct answer.
    const questionData = questions[currentQuestion]
    console.log(`correctAnswer: ${questionData.correctAnswer}`)
    if (selectedAnswer === questionData.correctAnswer) {
      // Display a text saying that the user got the correct answer,
      // and increment the score.
      $('#goodanswer').text('Good answer')
      $('#goodanswer').css({ 'color': 'green', 'font-size': '200%' });

      score = score + 1
      $('#compteur').text(score)

      $('input[name=question]:checked+label', '#questionsForm').css({ 'background-color': 'green' })
    }
    else {
      // Display a text saying that the user got an incrorrect answer.
      $('#goodanswer').text('Wrong answer')
      $('#goodanswer').css({ 'color': 'red', 'font-size': '200%' });

      $('input[name=question]:checked+label', '#questionsForm').css({ 'background-color': 'red' })
    }

    // Enable the button that allows the user to switch to another question.
    $('#Nextquestion').attr("disabled", false)

    // Pause and hide the timer to give the user time to press the button.
    timerPaused = true
    $("#timer").text("")
  })

  // Handle clicks to the 'Next Question' button.
  $('form').on('submit', (e) => {
    e.preventDefault()

    // Switch to the next question.
    goToNextQuestion()
  })

  // Decrease the timer by one, every second.
  setInterval(function () {
    if (!timerPaused) {
      timer -= 1
      $("#timer").text(timer)
      if (timer === 0) {
        console.log("Time is up!")

        // Switch to the next question.
        goToNextQuestion()
      }
    }
  }, 1000);
})

