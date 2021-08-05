import axios from 'axios'
import React from 'react'

function App() {
  // console.log(process.env.REACT_APP_MY_API_KEY)
  let [data, setData] = React.useState(null)

  const handleRefresh = () => location.reload()

  const handleAnswer = (e) => {
    console.log(e.target.textContent.length)
    console.log(cAns.length)
    // console.log(e.target)
    if (e.target.textContent === cAns) {
      e.target.classList.add('correct')

    } else {
      e.target.classList.add('incorrect')

    }
  }

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple') 
      setData(response.data.results)
      // setData((response.data.results[0].question))
      
      // setIAnsOne(response.data.results[0].incorrect_answers[0])
      // setIAnsTwo(response.data.results[0].incorrect_answers[1])
      // setIAnsThree(response.data.results[0].incorrect_answers[2])
      // setCAns(response.data.results[0].correct_answer)

      
    }
    getData()
    
  }, [ ])
  // console.log(data)

  // function findSpecial() {
  //   if (data && data.includes('&quot;')) {
  //     console.log(data.replaceAll('&quot;', '"'))
  //     data = data.replaceAll('&quot;', '"')
  //   }
  //   if (data && data.includes('&#039;')) {
  //     // eslint-disable-next-line quotes
  //     console.log(data.replaceAll('&#039;', "'"))
  //     // eslint-disable-next-line quotes
  //     data = data.replaceAll('&#039;', "'")
  //   }
  // }

  // In what year was Pok&eacute;mon Diamond &amp; Pearl released in Japan?

  // findSpecial()

  // const allAnswers = data && data.map(ques => {
  //   ques.incorrect_answers.push(ques.correct_answer)
  //   console.log(ques.incorrect_answers.sort())
  //   return ques.incorrect_answers.sort()
  // })


  return (
    <section className="section">
      <div className="container">
        {data && data.map(ques => (
          <div>
<h1 className="title">{ques.question}</h1>
            {ques.incorrect_answers.push(ques.correct_answer)}
             {ques.incorrect_answers.sort()}
             <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[0]}</button>
             <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[1]}</button>
             <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[2]}</button>
             <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[3]}</button>
          </div>
          ))}
{/* 
        <div>
          <div>
            <div>
              <button className="button" onClick={handleAnswer}>{allAnswers[0]}</button>
              <button className="button" onClick={handleAnswer}>{allAnswers[1]}</button>
            </div>
            <div>
              <button className="button" onClick={handleAnswer}>{allAnswers[2]}</button>
              <button className="button" onClick={handleAnswer}>{allAnswers[3]}</button>
            </div>
          </div>
        </div>
        </div>
        <button className="button" onClick={handleRefresh} > Give Me Another Question! </button>
       */}
       </div>
    </section>

  )
}
export default App