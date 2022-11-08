const Agenda = require('agenda')
const config = require('config')

const agenda = new Agenda({
    db: {
        address: config.get('mongoUri'),
        collection: 'agendaJobs',
        options: { useUnifiedTopology: true }
    },
    processEvery: '1 minute'
})

agenda
    .on('ready', ()=> console.log('Agenda started'))
    .on('error', ()=> console.log('Agenda connection error'))


module.exports = agenda