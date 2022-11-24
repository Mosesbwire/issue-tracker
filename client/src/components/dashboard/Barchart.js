import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Barchart = ({data}) => {
  return (
    <div>
      <Bar
        data={data}
        options= {
            
            {plugins: {
                title: {
                    display: true,
                    text: 'Total issues opened by month'
                },
                legend:{
                    display: false
                }
            }}
        }
      />
    </div>
  )
}

Barchart.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Barchart
