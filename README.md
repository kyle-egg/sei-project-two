# Pub Quiz Generator - A React App With A Public API

![Image of Quiz](https://media.giphy.com/media/qegt1zU9Jrs4mjMBkt/giphy.gif)

My second project for the General Assembly Software Engineering Immersive course, a React app pair-coded with GA classmate Nnanna Uwakwe in a 48-hour hackathon.

## Deployment

I deployed this website using [Netlify](https://pub-quiz-generator.netlify.app/). 

## Table Of Contents
* Concept
* Project Brief
* Technologies Used
* Installation Instructions
* Wireframe and Story
* Process
* Finishing Touches
* Unsolved Problems
* Challenges
* Wins
* Features Wishlist 
* Key Learnings

## Concept

The **Pub Quiz Generator** speaks for itself! As this application generates ten general knowledge questions (with varying difficulty), for a user to play. 

## Project Brief

* Build a React application that consumes a public API. 
* Implement a wireframe of the project and an explanation of core MVP and extension goals.
* Have a visually impressive design.
* Be deployed online so it's publicly accessible.
* Timeframe: 2 days.

## Technologies used:
* React.js
* JavaScript (ES6)
* HTML5
* SCSS
* Open Trivia DataBase API
* Axios
* react-router-dom
* Bulma CSS Framework

## Installation Instructions
1. Clone repo code from GitHub onto your machine.
2. Open in VS Code
3. Run `npm run dev` in the Terminal.

## Wireframe And Story

After being given the brief Nnanna and I started to explore some public APIs for some ideas. 

After a bit of research, we came across the Open Trivia DataBase API which on first glance seemed like an easy API to use when looking at the Documentation. Which led us to create a Pub Quiz Generator. For our MVP Pub Quiz Generator, we went for the idea of having a simple one page application of ten multiple questions of random difficulty and category. We created the Wireframe below of how we wanted the quiz to look, presenting both the questions and the answers.  

Then for an extension goal, we wanted to add more difficulties and categories if time persists. 

## Process

With the idea set and plan in place, we started to pair code the project, with myself doing the coding and sharing the screen on Zoom, discussing along the way with each other.
After we successfully mapped out the data and refreshed the page a few times, we quickly came across a problem with the data from the API. As we found out that the data’s special characters were encoded. Example Below. 

``` JSON
	
response_code	0
results	
0	
category	"Entertainment: Film"
type	"multiple"
difficulty	"medium"
question	"What is the name of the Artificial Intelligence system in the 1983 film, &quot;WarGames&quot;?"
correct_answer	"War Operation Plan Response"
incorrect_answers	
0	"Self Evolving Thought Helix"
1	"Master Control Program"
2	"West Campus Analog Computer"
```

This was not the greatest scenario considering the short time limit we were provided to complete the project and that we had already come across a problem early doors. We spent quite a while on this problem and tried and tested a few solutions, even at one point resorting to a vanilla .replace() function for all individual characters. Whilst this would have worked, we thought it would be too time consuming considering we would have to convert each special character individually for each data type - ‘question’, ‘correct_answer’, ‘incorrect_answers’.


After some more research, we came across a solution and realised that we needed to convert the data into html, in order to present it as a readable language and came up with the below.

```javascript
 // *** Data Decoding Function
 function decodeData(str) {
   const dataCleaner = document.createElement('textarea')
   dataCleaner.innerHTML = str
   return dataCleaner.value
 }
 ```
In creating this function, we converted the data as a ‘textarea’ which turns the data into html that in turn understands the encoding. We then decided we wanted to decode this data before setting it into state, decoding each data type separately. 

Once successfully decoding the characters, we came across another minor problem once we mapped out the questions, correct answers and incorrect answers. This problem was that, because the incorrect answers and correct answers were separated within the API, as shown in the API example earlier. The correct answer would always be in the same multiple choice spot for each question. Which obviously, would not make for a very good game!

The solution for this was to combine the incorrect answers and the correct answers together and then sort it alphabetically in order for the correct answer to always be in a different spot. 

We did this by spreading the incorrect answers with the correct answer, whilst also decoding the data, as per the below:

```javascript
React.useEffect(() => {
   const getData = async () => {
     const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
     const rawData = response.data.results
     const refData = rawData.map((item, index) => {
       const answer = decodeData(item.correct_answer)
       const options = [
         ...item.incorrect_answers.map(answer => decodeData(answer)),
         answer
       ]
       return {
         id: `${index}-${Date.now()}`,
         questions: decodeData(item.question),
         answer: answer,
         options: options.sort(),
       }
     })
     setData(refData)
   }
   getData()
  
 }, [])
```

Doing all this now allowed us to display all the data in the JSX in one mapping function, as now the correct answers and incorrect answers were jumbled up and defined as ‘options’ as per the below:

**JSX**

```javascript
{!isLoading && data.map(card => (
             <div key={card.id} className="qwrapper container">
               <h2 className="title">{card.questions}</h2>
               <div>
                 <button className="button" onClick={handleAnswer}>{card.options[0]}</button>
                 <button className="button" onClick={handleAnswer}>{card.options[1]}</button>
                 <button className="button" onClick={handleAnswer}>{card.options[2]}</button>
                 <button className="button" onClick={handleAnswer}>{card.options[3]}</button>
               </div>
             </div>
           ))}
```

With the data now successfully mapped out, we needed to create the function in order to make the quiz a quiz! Making sure the incorrect answers and correct answers were properly identified when selected. 

![Image of Qs](https://media.giphy.com/media/WADdo8FHQ4jyhozC7D/giphy.gif)

To do this, we created the below function, calling it as handleAnswer as shown in the above JSX. Whilst also creating a score, allowing for the user to have a second go at answering the question correctly, if he/she got it wrong the first time.

```javascript
 const handleAnswer = (e) => {
   const correctAns = data.map(ans => (ans.answer))
   if (correctAns.includes(e.target.textContent)) {
     setScore(score + 10)
     e.target.classList.add('correct')
   } else {
     setScore(score - 5)
     e.target.classList.add('incorrect')
   }
 }
```

## Finishing Touches
* Considering we came across quite a few problems, we were quite strapped for time and could not achieve some of the extension goals we wanted to. 
* Therefore we spent the remaining time styling the app (using Bulma as my framework) and created a splash page to take the User from the Home page to the Questions.
* We also created buttons to restart the game with new questions if the User wanted to play again. 

## Unsolved Problems

Instead of presenting all the ten questions on one page, we initially did want to stack the questions (displaying one at a time) as per the wireframe. 

## Challenges

Building our first React app from scratch provided a fair amount of challenges, the API in particular became very problematic, as we spent the majority of our time trying to research methods to try to decode the data.

## Wins

Having previously built a game as a solo project, I found pair-coding very beneficial. The ability to bounce off ideas with each other was great, especially with such a short time period to complete the project. 

## Features Wish List

* Adding in more categories and difficulties which can be selected by the user. 

## Key Learnings 

This project made me understand APIs and the problems that can arise when using one, especially for us! It made me understand that not all APIs are straightforward in how the data is presented. This was also my first project working as a team, which improved my technical communication skills considering we were pair-coding remotely.
