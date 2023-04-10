const jokeText = document.querySelector("#js-joke-text");
const answerContainer = document.querySelector("#js-answer-container");
const answerText = document.querySelector("#js-answer-text");
const newJokeButton = document.querySelector("#js-new-joke");
const showAnswerButton = document.querySelector("#js-show-answer");
const loadingContainer = document.querySelector("#js-loading");

const endpoint = "https://v2.jokeapi.dev/joke/Any?safe-mode";

async function getJoke() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    if (json.type === "single") {
      displayJoke(json.joke);
      hideAnswer();
    } else {
      displayJoke(json.setup);
      displayAnswer(json.delivery);
      hideAnswer();
    }
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new joke");
  }
}

function displayJoke(joke) {
  jokeText.textContent = joke;
}

function displayAnswer(answer) {
  answerText.textContent = answer;
}

function showAnswer() {
  answerContainer.classList.remove("hidden");
}

function hideAnswer() {
  answerContainer.classList.add("hidden");
}

newJokeButton.addEventListener("click", () => {
  getJoke();
  hideAnswer();
});

showAnswerButton.addEventListener("click", () => {
  showAnswer();
});


newJokeButton.addEventListener("click", getJoke);

async function getJoke() {
    try {
        
        loadingContainer.classList.remove("hidden");

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        if(json.type === 'single') {
            displayJoke(json.joke);
        } else {
            displayJoke(json.setup);
            displayAnswer(json.delivery);
        }
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new joke');
    } finally {
        
        loadingContainer.classList.add("hidden");
    }
}


getJoke();
hideAnswer();