import { useState, useRef } from 'react'
import './App.css'
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

function App() {

  const chartRef = useRef();
  const [index, setIndex] = useState()
  const [beforeHover, setBeforeHover] = useState(0);
  const [afterHover, setAfterHover] = useState(0);
  const [finalTime, setFinalTime] = useState(0)
  const [display, setDisplay] = useState(false);

  Chart.register(ArcElement, Legend, Tooltip);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const onClick = (event) => {

    // checking time upon clicking
    setAfterHover(parseInt(Date.now()));

    // subtracting and getting the time hovered on the data // TODO fix this, it isnt operating correctly
    setFinalTime(Math.abs(beforeHover - afterHover) / 1000);

    // display the div for the time hovered
    setDisplay(true);

  }

  const options = {

    onHover: (event, chartElements) => {

      if (chartElements.length > 0) {

        // the time at which hovering started
        setBeforeHover(parseInt(Date.now()));

        // get the index for the data that was hovered on and get its name
        const hoverIdx = chartElements[0].index;
        setIndex(data.labels[hoverIdx]);
      }

    },
  }

  return (
    <>
      <main>
          <h1>Using React Chart.js 2</h1>
          <Pie data={data} ref={chartRef} onClick={onClick} options={options} />
        {
          display ? 
          <div className='dataWrapper'>
            <p>You hovered over {index} for {finalTime} seconds.</p>
          </div>
          :
          null
        }
      </main>
    </>
  )
}

export default App;
