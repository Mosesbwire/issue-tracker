import React, {useEffect,useState,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {barChartData} from '../../actions/issueReport'
import Barchart from './Barchart'

const BarChartContainer = ({barChartData, data: {loading, report}}) => {
    useEffect(()=>{
        barChartData()
    }, [barChartData])

    const [chartData, setChartData] = useState({
        labels: report.map(rpt => rpt.month),
        datasets : [
            {
                label: 'Issues opened by month',
                data: report.map(rpt => rpt.openedIssues),
                backgroundColor: ['#133F46'],
                borderColor: '#D6E6D5',
                borderWidth: 2
            }
        ]
    })


  return loading || report === null ? <p>Loading chart...</p> : <Fragment>
    <Barchart data={chartData}/>
  </Fragment>
    

  
}

BarChartContainer.propTypes = {
    data: PropTypes.object.isRequired,
    barChartData: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    data: state.issueReport
})

export default connect(mapStateToProps, {barChartData})(BarChartContainer)
