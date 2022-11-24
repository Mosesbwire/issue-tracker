const Issue = require('../models/Issue')
const {DateTime } = require('luxon')

const IssueReportData = async (req,res)=>{
    

    const dataArray = []
    let dataStructure = {
        id: '',
        month: '',
        openedIssues: '',
        closedIsues: ''
    }
    

    try{
        const issues = await Issue.find({})
        issues.forEach(issue => {
            
            if (dataArray.length === 0){
                dataStructure.id = 0
                dataStructure.month = DateTime.local(issue.identifiedOn).monthShort
                dataStructure.openedIssues = 1
                dataStructure.closedIsues = issue.status === 'Closed' ? 1 : 0

                dataArray.push(dataStructure)
            }else {
                dataArray.forEach((data, index) => {
                    if (data.month === DateTime.local(issue.identifiedOn).monthShort){
                        data.openedIssues = data.openedIssues + 1
                        data.closedIssues = issue.status === 'Closed' ? (data.closedIssues + 1) : (data.closedIssues)
                    }else {
                        let obj = {}
                        obj[id] = index
                        obj[month] = DateTime.local(issue.identifiedOn).monthShort
                        obj[openedIssues] =1
                        obj[closedIsues] = issue.status === 'Closed' ? 1 : 0

                        dataArray.push(obj)
                    }
                })
            }
        })

        res.json(dataArray)

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports = {
    IssueReportData
}