#!/usr/bin/env node// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
var http = require('http');
var https = require('https');
const app = express();
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Entities = require('html-entities').AllHtmlEntities;
const fs = require('fs')

var kreaSeriesList = {}
var kreaWeeklyObject = {
  master:{},
  hasmaster:{}
}

fs.readFile('./kreaseries.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    kreaSeriesList = JSON.parse(data); //now it an object
}});

fs.readFile('./kreaweekly.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    kreaWeeklyObject = JSON.parse(data); //now it an object
}});

const entities = new Entities();

app.use(cors());

app.get('/', function(request, response) {
  response.send('no');
});

app.get('/series/lundby-summer', function(request, response){
  let resp = [
    {
      event_id: 'lb1',
      event_title: 'Invigning av Sommarboken 8-12 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/hc3LDoJADAXQLyJtZzrAdlDAZ1B8wWzMIGpIFF0QEv16iXFlQujupve0YCADU9u2utqmetT21uXcuEcWMdKMae6n6Qi1R5oitSd2CQ5DBdOtsWc0_vyKxpq48zihCPU6dJM0ZMSF-vrB__9ng1QEEjFOxJDPO-_1FpYEGzBg7Kmp2qp5TUvI3YKILBdOIfHisBTsWF-yI5ntWVklpCzhed_tsvdWfwCAKOmf/dz/d5/L2dBISEvZ0FBIS9nQSEh/'
    },
    {
      event_id: 'lb2',
      event_title: 'Makerspace 6-15 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!fd781663-93c9-4f28-b2dd-3f0acc1a70ef==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    },
    {
      event_id: 'lb3',
      event_title: 'Pysselverkstad 6-15 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!6e676d48-417d-4016-8863-f601263344da==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    },
    {
      event_id: 'lb4',
      event_title: 'Sommarboken 8-12 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!26b05f0a-ac86-4c18-8866-a17932b228f6==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    },
    {
      event_id: 'lb5',
      event_title: 'Sommarboken 8-12 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!d62f116e-5a22-4850-bfb6-c6c13f77b38f==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    },
    {
      event_id: 'lb6',
      event_title: 'Prova på origami 8-15 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!0e1e689f-4ead-47e0-b362-e5735b9fec30==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    },
    {
      event_id: 'lb7',
      event_title: 'Sommarboken 8-12 år',
      event_url: 'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!830a4d4c-5359-474f-8d08-4d97d8aae460==/#Z7_42G01J41K8RRC0A71A1F5V14M1'
    }
  ]
  
  
  response.set('Content-Type', 'application/json')
  response.send(resp)
})

app.get('/upcoming/:placeId', function(request, response) {
  let currentTime = new Date()
  currentTime.setHours(0,0,0,0)
  let iso = currentTime.toISOString()
  iso = encodeURI(iso)

  const aapi = `https://api.detskeriaarhus.dk/api/events?organizer.id=132&occurrences.startDate%5Bafter%5D=${iso}&order%5Boccurrences.startDate%5D=asc&items_per_page=60`
  fetch(aapi, {headers: {"Content-Type": "application/json"}})
    .then(res => res.json())
    .then(json => {
      let resp = []
      for (const event of json["hydra:member"]) {
        resp.push({
          event_id: event['@id'].match(/\d+/)[0],
          event_title: event.name,
          event_url: event.url
        })
      }
      
      response.set('Content-Type', 'application/json')
      response.send(resp)
    })
});

app.get('/series/lbv2', function(request, response) {
  const wsUrl = `https://placed.cc.au.dk/Ai1-BmJJPK/`;
  fetch(`${wsUrl}?raw`)
    .then(res => res.text())
    .then(html => {
      let respObj = []
      const { document } = (new JSDOM(html)).window
    
      for(const event of document.querySelectorAll('.event')) {
        //let dataid = event.getAttribute('data-id')
        let eventTime = parseInt(event.querySelector(`.meta .time div`).getAttribute('data-start'))
        let eventId = event.getAttribute('data-id')
        let eventTitle = event.querySelector(`.meta .title`).innerHTML
        
        respObj.push({
          event_id: eventId,
          event_title: eventTitle,
          event_url: 'https://krlx.fr'
        })

      }
    
      response.set('Content-Type', 'application/json')
      response.send(respObj);
    });
});

app.get('/series/aav2', function(request, response) {
  const wsUrl = `https://placed.cc.au.dk/socDVMqEj/`;
  fetch(`${wsUrl}?raw`)
    .then(res => res.text())
    .then(html => {
      let respObj = []
      const { document } = (new JSDOM(html)).window
    
      for(const event of document.querySelectorAll('.event')) {
        //let dataid = event.getAttribute('data-id')
        let eventTime = parseInt(event.querySelector(`.meta .time div`).getAttribute('data-start'))
        let eventId = event.getAttribute('data-id')
        let eventTitle = event.querySelector(`.meta .title`).innerHTML
        
        //Exception for event Rullinger
        if(eventId === 'event-6f202895a7bd6261849b') {
          continue
        }
        
        respObj.push({
          event_id: eventId,
          event_title: eventTitle,
          event_url: 'https://krlx.fr'
        })

      }
    
      response.set('Content-Type', 'application/json')
      response.send(respObj);
    });
});


app.get('/event-lb/:id', function(request, response) {
  const eventId = request.params.id
  const wsUrl = `https://placed.cc.au.dk/_7sFWnl66Y/`;
  fetch(`${wsUrl}?raw`)
    .then(res => res.text())
    .then(html => {
      let respObj = {}
      const { document } = (new JSDOM(html)).window
    
      for(const event of document.querySelectorAll('.event')) {
        if (event.getAttribute('data-id') == eventId) {
          respObj = {
            event_id: eventId,
            event_title: event.querySelector(`.meta .title`).innerHTML,
            event_ss_titre:'',
            event_description_courte:'',
            event_description: entities.decode(event.querySelector(`.meta .description`).innerHTML),
            event_mere:'0',
            event_programme:'0',
            event_url:'https://krlx.fr',
            dates: [],
            image_url:event.querySelector(`.meta .image`).getAttribute('data-url'),
            partenaire:[
            ]
          }
          
          for (const div of event.querySelectorAll('.meta .time div')) {
            let dateStart = (new Date(parseInt(div.getAttribute('data-start'))))
            let dateEnd = (new Date(parseInt(div.getAttribute('data-end'))))
            respObj.dates.push({
              date_id: `${dateStart.toISOString()}-${eventId}-date`,
              date_start: dateStart.toISOString(),
              date_end: dateEnd.toISOString(),
              event_id: eventId,
              place_id: 'lundby-summer',
              place_name: event.querySelector(`.meta .location`).innerHTML
            })
          }
        }

      }

          response.set('Content-Type', 'application/json')
          response.send([respObj])
    })
  .catch(e => {
    console.error(e)
  })
});


app.get('/event-aa/:id', function(request, response) {
  const eventId = request.params.id
  const wsUrl = `https://placed.cc.au.dk/socDVMqEj/`;
  let rullinger = eventId === 'event-90770bb157c62268ed9e'
  let rullinger_dates = []
  fetch(`${wsUrl}?raw`)
    .then(res => res.text())
    .then(html => {
      let respObj = {}
      const { document } = (new JSDOM(html)).window
    
      for(const event of document.querySelectorAll('.event')) {
        if (event.getAttribute('data-id') == eventId) {
          respObj = {
            event_id: eventId,
            event_title: event.querySelector(`.meta .title`).innerHTML,
            event_ss_titre:'',
            event_description_courte:'',
            event_description: entities.decode(event.querySelector(`.meta .description`).innerHTML),
            event_mere:'0',
            event_programme:'0',
            event_url:'https://krlx.fr',
            dates: [],
            image_url:event.querySelector(`.meta .image`).getAttribute('data-url'),
            partenaire:[
            ]
          }
          
          for (const div of event.querySelectorAll('.meta .time div')) {
            let dateStart = (new Date(parseInt(div.getAttribute('data-start'))))
            let dateEnd = (new Date(parseInt(div.getAttribute('data-end'))))
            respObj.dates.push({
              date_id: `${dateStart.toISOString()}-${eventId}-date`,
              date_start: dateStart.toISOString(),
              date_end: dateEnd.toISOString(),
              event_id: eventId,
              place_id: 'lundby-summer',
              place_name: event.querySelector(`.meta .location`).innerHTML
            })
          }
        }
        if (rullinger && event.getAttribute('data-id') == 'event-6f202895a7bd6261849b') {
          for (const div of event.querySelectorAll('.meta .time div')) {
            let dateStart = (new Date(parseInt(div.getAttribute('data-start'))))
            let dateEnd = (new Date(parseInt(div.getAttribute('data-end'))))
            rullinger_dates.push({
              date_id: `${dateStart.toISOString()}-${eventId}-date`,
              date_start: dateStart.toISOString(),
              date_end: dateEnd.toISOString(),
              event_id: eventId,
              place_id: 'lundby-summer',
              place_name: event.querySelector(`.meta .location`).innerHTML
            })
          }
        }

      }
          if (respObj.dates) {
            respObj.dates.push(...rullinger_dates)
          }

          response.set('Content-Type', 'application/json')
          response.send([respObj])
    })
  .catch(e => {
    console.error(e)
  })
});

app.get('/series/aarhus-krea', function(request, response) {
  const kreaSeriesUrl = 'https://api.detskeriaarhus.dk/api/events?name=SommerKREA'
  fetch(kreaSeriesUrl, {headers: {"Content-Type": "application/json"}})
    .then(res => res.json())
    .then(json => {
      let lastEventProcessed = -1
      let lastEventProcessedDate = null
      
      for (const event of json["hydra:member"]) {
        let eventId = event['@id'].match(/\d+/)[0]
        let eventStartDate = new Date(event.occurrences[0].startDate)
        //if (!kreaSeriesList[eventId]) {
          //Si c'est un evenement du mardi
          if (eventStartDate.getDay() == 2) {
            lastEventProcessed = eventId
            lastEventProcessedDate = eventStartDate
            
            kreaSeriesList[eventId] = {
              event_id: eventId,
              event_title: event.name,
              event_url: event.url
            }
          }
          //Si c'est un evenement du mercredi
          if (eventStartDate.getDay() == 3 && !kreaWeeklyObject.hasmaster[eventId]) {
            let diffDays = 8
            if(lastEventProcessedDate) {
              const diffTime = Math.abs(eventStartDate.getTime() - lastEventProcessedDate.getTime());
              diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            // Si il on a traité un autre evenement il y a moins de 3 jours
            if (lastEventProcessed && lastEventProcessedDate && diffDays < 3) {
              delete kreaSeriesList[eventId]
              let dates = []
              for(const occ of event.occurrences) {
                dates.push({
                  date_id: occ['@id'].match(/\d+/)[0],
                  date_start: occ.startDate,
                  date_end: occ.endDate,
                  event_id: lastEventProcessed,
                  place_id: '132',
                  place_name: occ.room || occ.name
                })
              }
              kreaWeeklyObject.master[lastEventProcessed] = {
                eventId: eventId,
                dates: dates
              }
              // wiil dflsdjfs ?
              kreaWeeklyObject.hasmaster[eventId] = lastEventProcessed
            } else {
              kreaSeriesList[eventId] = {
                event_id: eventId,
                event_title: event.name,
                event_url: event.url
              }
            }
          }
        //}
      }
    
      // console.log(kreaWeeklyObject)
    
      fs.writeFile('./kreaseries.json', JSON.stringify(kreaSeriesList), 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      })
    
      fs.writeFile('./kreaweekly.json', JSON.stringify(kreaWeeklyObject), 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      })
    
    
      let resp = []
      
      for (const eventid in kreaSeriesList) {
        resp.push(kreaSeriesList[eventid])
      }
      
      response.set('Content-Type', 'application/json')
      response.send(resp)
  })
})


app.get('/query/:query', function(request, response) {
  response.status(500)
  response.send('Developer is an idiot')
})

/**
 * TEMP Lundby-Summer API
 * Sorry Alix
 */
app.get('/event/lb1', function(request, response) {
  let idToGet = 'lb1'
  let respObj = {
    event_id: idToGet,
    event_title:'Invigning av Sommarboken 8-12 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Sommarlovet är här och självklart också Sommarboken! På den första träffen får du en boklåda att stoppa full med sommarläsning och du får såklart ha böckerna hela sommarlovet. Det blir också boktips, ett klurigt quiz och somrig fika. Välkomna!',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/hc3LDoJADAXQLyJtZzrAdlDAZ1B8wWzMIGpIFF0QEv16iXFlQujupve0YCADU9u2utqmetT21uXcuEcWMdKMae6n6Qi1R5oitSd2CQ5DBdOtsWc0_vyKxpq48zihCPU6dJM0ZMSF-vrB__9ng1QEEjFOxJDPO-_1FpYEGzBg7Kmp2qp5TUvI3YKILBdOIfHisBTsWF-yI5ntWVklpCzhed_tsvdWfwCAKOmf/dz/d5/L2dBISEvZ0FBIS9nQSEh/',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-06-14 13:00:00',
        date_end: '2019-06-14 14:30:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/54f531c5-27f7-4748-a282-5d43f0b14c43.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})

app.get('/event/lb2', function(request, response) {
  let idToGet = 'lb2'
  let respObj = {
    event_id: idToGet,
    event_title:'Makerspace 6-15 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Kom till bibblan för en eftermiddag med digitala påhitt. Testa att bygga en dator eller programmera en robot, sy ett armband med lysdioder eller spela piano på en banan. Drop-in!',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!fd781663-93c9-4f28-b2dd-3f0acc1a70ef==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-06-19 13:00:00',
        date_end: '2019-06-19 16:00:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/45634aac-4a0c-41ec-ba63-afdbf96f1738.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})

app.get('/event/lb3', function(request, response) {
  let idToGet = 'lb3'
  let respObj = {
    event_id: idToGet,
    event_title:'Pysselverkstad 6-15 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Vi dukar upp med olika roliga pyssel; gör en pärlplatta, en cool pin eller testa att göra ett makraméarmband! Drop-in.',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!6e676d48-417d-4016-8863-f601263344da==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-06-26 13:00:00',
        date_end: '2019-06-26 15:00:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/a45faac2-d770-41ff-a00b-5462db20176e.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})

app.get('/event/lb4', function(request, response) {
  let idToGet = 'lb4'
  let respObj = {
    event_id: idToGet,
    event_title:'Sommarboken 8-12 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'På den andra Sommarboken-träffen gör vi filmer av våra favoritböcker och snygga bokmärken på surfplattor (som du lånar på plats). Vi börjar också fylla vårt boktipsträd med nya tipsäpplen.',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!26b05f0a-ac86-4c18-8866-a17932b228f6==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-07-03 13:00:00',
        date_end: '2019-07-03 14:30:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/5422e9d5-cfaf-44bb-9f2c-212a3a4eacdc.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})


app.get('/event/lb5', function(request, response) {
  let idToGet = 'lb5'
  let respObj = {
    event_id: idToGet,
    event_title:'Sommarboken 8-12 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Vi fikar, tipsar varandra om bra böcker och gör snygga tryck på tygpåsar. Vi står för material!',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!d62f116e-5a22-4850-bfb6-c6c13f77b38f==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-07-24 13:00:00',
        date_end: '2019-07-24 14:30:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/09f2021d-4680-45a7-8244-0a5359602c50.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})

app.get('/event/lb6', function(request, response) {
  let idToGet = 'lb6'
  let respObj = {
    event_id: idToGet,
    event_title:'Prova på origami 8-15 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Kom till biblioteket på origami-workshop! Där kommer barnbibliotekarie Lisa bidra med sina kunskaper i pappersvikning och där får du välja fritt vad du vill skapa i papper. Allt från dinosaurier till fåglar och blommor.',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!0e1e689f-4ead-47e0-b362-e5735b9fec30==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-07-31 13:00:00',
        date_end: '2019-07-31 15:30:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/feb830d2-1923-49a9-a79b-38d5443d0de6.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})


app.get('/event/lb7', function(request, response) {
  let idToGet = 'lb7'
  let respObj = {
    event_id: idToGet,
    event_title:'Sommarboken 8-12 år',
    event_ss_titre:'',
    event_description_courte:'',
    event_description:'Sommarlovets sista Sommarbokenträff! Vi fikar, pratar om vad vi har läst under sommaren och löser ett klurigt mysterium i biblioteket.',
    event_mere:'0',
    event_programme:'0',
    event_url:'https://goteborg.se/wps/portal/enhetssida/lundby-bibliotek/vad-hander-pa-biblioteket-/bibliotekets-program/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziTYzcDQy9TAy9LYKCnA0czQ0dDd1MwwxNzAz1wwkpiAJKG-AAjgZQ_QGGLo6GJkD9Bh6GbgaOga5m_kGuJgYGPqZg_QTtRzfWKcjIydjAwN3fiJD-gtzQ0FBHRUUAvWTMVA!!/dz/d5/L2dBISEvZ0FBIS9nQSEh/p0/IZ7_42G01J41K8RRC0A71A1F5V14M1=CZ6_42G01J41K8RRC0A71A1F5V1461=MDbackUrl=EactivityId!830a4d4c-5359-474f-8d08-4d97d8aae460==/#Z7_42G01J41K8RRC0A71A1F5V14M1',
    dates: [
      {
        date_id: idToGet+'-date',
        date_start: '2019-08-14 13:00:00',
        date_end: '2019-08-14 14:30:00',
        event_id: idToGet,
        place_id: 'lundby-summer',
        place_name: 'Borstbindaregatan 12A'
      }
    ],
    image_url:'https://s3.eu-central-1.amazonaws.com/gbg.images/b0e1fc91-cd7f-41d3-91e4-0ae4732b5f69.jpg',
    partenaire:[
    ]
  }
    
  response.set('Content-Type', 'application/json')
  response.send([respObj])
})

/**
 * END of TEMP Lundby-Summer
 */

app.get('/event/:id', function(request, response) {
  let idToGet = request.params.id
  if (kreaWeeklyObject.hasmaster[request.params.id]) {
    idToGet = kreaWeeklyObject.hasmaster[request.params.id]
  }
  const wsUrl = `https://api.detskeriaarhus.dk/api/events/${idToGet}`;
  fetch(wsUrl, {headers: {"Content-Type": "application/json"}})
    .then(res => res.json())
    .then(json => {
      let respObj = {
        event_id: '',
        event_title:'',
        event_ss_titre:'',
        event_description_courte:'',
        event_description:'',
        event_mere:'0',
        event_programme:'0',
        event_url:'',
        dates: [],
        image_url:'',
        partenaire:[
        ]
      }
      
      respObj.event_description = json.description
      respObj.event_description_courte = respObj.event_ss_titre = json.excerpt
      respObj.event_id = json['@id'].match(/\d+/)[0]
      respObj.event_title = json.name
      respObj.image_url = json.image
    
      for(const occ of json.occurrences) {
        respObj.dates.push({
          date_id: occ['@id'].match(/\d+/)[0],
          date_start: occ.startDate,
          date_end: occ.endDate,
          event_id: json['@id'].match(/\d+/)[0],
          place_id: '132',
          place_name: occ.room
        })
      }
      if (kreaWeeklyObject.master[json['@id'].match(/\d+/)[0]]) {
        respObj.dates.push(...kreaWeeklyObject.master[json['@id'].match(/\d+/)[0]].dates)
      }
    
      response.set('Content-Type', 'application/json')
      response.send([respObj]);
    });
});

app.get('/ws/:id', function(request, response) {
  const wsUrl = `${decodeURIComponent(request.params.id)}/`;
  fetch(`${wsUrl}?raw`)
    .then(res => res.text())
    .then(html => {
      let respObj = {
        posts: [],
        books:[]
      }
      const { document } = (new JSDOM(html)).window
      for(const post of document.querySelectorAll('.post.exported')) {
        let postObj = {
          id: post.querySelector('.caption').getAttribute('__wid'),
          author: entities.decode(post.querySelector('.name').innerHTML),
          text: entities.decode(post.querySelector('.caption').innerHTML),
          librarian: post.querySelector('.creator >span') ? true : false,
          time: post.querySelector('.timestamp').getAttribute('data-timestamp')
        }
        
        if (post.classList.contains('imagepost')) {
          //console.log(`${wsUrl.match(/(https?:\/\/[a-z\.]*)\/.*/)[1]}/${post.querySelector('img').getAttribute('src')}`)
          postObj.img = `${wsUrl.match(/(https?:\/\/[a-z\.]*)\/.*/)[1]}/${post.querySelector('img').getAttribute('src')}`
          //console.log(`${wsUrl}${post.querySelector('img').getAttribute('src')}`)
        }
        if (post.classList.contains('gallerypost')) {
          //getAttribute of Null !
          const imgElement = post.querySelector('img')
          if (imgElement) {
            postObj.img = `${wsUrl.match(/(https?:\/\/[a-z\.]*)\/.*/)[1]}/${post.querySelector('img').getAttribute('src')}`
          } else {
            continue
          }
        }
        if (post.classList.contains('videopost')) {
          postObj.vid = `${wsUrl.match(/(https?:\/\/[a-z\.]*)\/.*/)[1]}/${post.querySelector('video').getAttribute('src')}`
        }
        if (post.classList.contains('multiplechoicepost')) {
          postObj.poll = []
          for (const choice of post.querySelectorAll('.choice')) {
            postObj.poll.push({
              answer: choice.querySelector('.answer').innerHTML,
              votes: parseInt(choice.getAttribute('data-votes'))
            })
          }
        }
        
        respObj.posts.push(postObj)
      }
    
      for(const event of document.querySelectorAll('.event')) {
        //let dataid = event.getAttribute('data-id')
        let eventTime = parseInt(event.querySelector(`.meta .time div`).getAttribute('data-start'))
        //console.log(eventTime)
        for(const book of event.querySelectorAll(`.book.exported`)) {
          //console.log(eventTime)
          let regexImgUrl = /url\("(https:\/\/.*\.au\.dk)?\/.+(\/.*\.(jpg|png)).+\);/gm
          let imgUrl = regexImgUrl.exec(entities.decode(book.querySelector('.preview').getAttribute('style')))
          if(imgUrl) {
            imgUrl = imgUrl[2]
            //console.log(imgUrl)
          }
          let bookObj = {
            isbn: entities.decode(book.querySelector('.isbn').innerHTML),
            pid: entities.decode(book.querySelector('.pid').innerHTML),
            title: entities.decode(book.querySelector('.title').innerHTML),
            author: entities.decode(book.querySelector('.author').innerHTML),
            date: entities.decode(book.querySelector('.release').innerHTML),
            desc: entities.decode(book.querySelector('.description').innerHTML),
            img: wsUrl+imgUrl,//wsUrl+entities.decode(book.querySelector('.pid').innerHTML).replace(':','-')+'.png'
            eventTime: eventTime
          }

          respObj.books.push(bookObj)
        }
        
        for(const book of event.querySelectorAll(`.bookshelf.exported .book`)) {
          //console.log(eventTime)
          let regexImgUrl = /url\("(https:\/\/.*\.au\.dk)?\/.+(\/.*\.(jpg|png)).+\);/gm
          let imgUrl = regexImgUrl.exec(entities.decode(book.querySelector('.preview').getAttribute('style')))
          if(imgUrl) {
            imgUrl = imgUrl[2]
            //console.log(imgUrl)
          }
          let bookObj = {
            isbn: entities.decode(book.querySelector('.isbn').innerHTML),
            pid: entities.decode(book.querySelector('.pid').innerHTML),
            title: entities.decode(book.querySelector('.title').innerHTML),
            author: entities.decode(book.querySelector('.author').innerHTML),
            date: entities.decode(book.querySelector('.release').innerHTML),
            desc: entities.decode(book.querySelector('.description').innerHTML),
            img: wsUrl+imgUrl,//wsUrl+entities.decode(book.querySelector('.pid').innerHTML).replace(':','-')+'.png'
            eventTime: eventTime
          }

          respObj.books.push(bookObj)
        }
      }
    
      response.set('Content-Type', 'application/json')
      response.send(respObj);
    })
  .catch(e => {
    console.error(e)
  })
});


app.get('/ws2/:id', function(request, response) {
  let respObj = {
    events: []
  }
  let wsUrls = []
  let requests = []
  switch (request.params.id) {
    case 'aa': 
      wsUrls.push('https://placed.cc.au.dk/socDVMqEj/')
      wsUrls.push('https://placed.cc.au.dk/KQr85-zj0D/')
      break
    case 'lb':
      wsUrls.push('https://placed.cc.au.dk/Ai1-BmJJPK/')
      break
    case 'mm':
      wsUrls.push('https://placed.cc.au.dk/VHClr_IugX/')
      break
    case 'atable':
      wsUrls.push('https://placed.cc.au.dk/Y2p7kat0Vu/')
      break
    case 'cap':
      wsUrls.push('https://placed.cc.au.dk/IpFz7FiAnj/')
      break
    case 'laca' :
      wsUrls.push('https://placed.cc.au.dk/26YPkBQmf/')
      break
  }
  
  //const wsUrl = `${decodeURIComponent(request.params.id)}/`
  for (const wsUrl of wsUrls) {
    requests.push(fetch(`${wsUrl}?raw`)
      .then(res => res.text())
      .then(html => {
        const { document } = (new JSDOM(html)).window

        for(const event of document.querySelectorAll('.event')) {
          let eventObj = {
            eventdata: {},
            books: [],
            posts: []
          }
          const eventId = event.getAttribute('data-id')
            eventObj.eventdata = {
              event_id: eventId,
              event_title: event.querySelector(`.meta .title`).innerHTML,
              event_ss_titre:'',
              event_description_courte:'',
              event_description: entities.decode(event.querySelector(`.meta .description`).innerHTML).replace(/<a/g, '<span').replace(/<\/a>/g, '</span>'),
              event_mere:'0',
              event_programme:'0',
              event_url:'https://krlx.fr',
              dates: [],
              image_url:event.querySelector(`.meta .image`).getAttribute('data-url'),
              partenaire:[
              ]
            }

            for (const div of event.querySelectorAll('.meta .time div')) {
              let dateStart = (new Date(parseInt(div.getAttribute('data-start'))))
              let dateEnd = (new Date(parseInt(div.getAttribute('data-end'))))
              eventObj.eventdata.dates.push({
                date_id: `${dateStart.toISOString()}-${eventId}-date`,
                date_start: dateStart.toISOString(),
                date_end: dateEnd.toISOString(),
                event_id: eventId,
                place_id: 'lundby-summer',
                place_name: event.querySelector(`.meta .location`).innerHTML
              })
            }
          //let dataid = event.getAttribute('data-id')
          let timeEl = event.querySelector(`.meta .time div`)
          let eventTime
          if(timeEl) {
            eventTime = parseInt(event.querySelector(`.meta .time div`).getAttribute('data-start'))
          } else {
            // Event with no Time ? Eww continue !
            console.log('Event with no time : skipped')
            continue
          }


          for(const post of event.querySelectorAll('.post.exported')) {
            if(post.classList.contains('deleted')) {
              continue
            }

          let postObj = {
            id: post.querySelector('.caption').getAttribute('__wid'),
            author: entities.decode(post.querySelector('.name').innerHTML),
            text: entities.decode(post.querySelector('.caption').innerHTML),
            librarian: post.querySelector('.creator >span') ? true : false,
            time: post.querySelector('.timestamp').getAttribute('data-timestamp')
          }

          if (post.classList.contains('imagepost')) {
            //console.log(`${wsUrl.match(/(https?:\/\/[a-z\.]*)\/.*/)[1]}/${post.querySelector('img').getAttribute('src')}`)
            let imgUrl = post.querySelector('img').getAttribute('src').match(/(\/.+\/)?(.+\.(jpg|png))/)[2]
            postObj.img = `${wsUrl}/${imgUrl}`
            //console.log(`${wsUrl}${post.querySelector('img').getAttribute('src')}`)
          }
          if (post.classList.contains('gallerypost')) {
            //getAttribute of Null !
            const imgElement = post.querySelector('img')
            const vidElement = post.querySelector('video')
            if (imgElement) {
              let imgUrl = post.querySelector('img').getAttribute('src').match(/(\/.+\/)?(.+\.(jpg|png))/)[2]
              postObj.img = `${wsUrl}/${imgUrl}`
            } else if (vidElement) {
              postObj.vid = `${wsUrl}/${post.querySelector('video').getAttribute('src').match(/(\/.+\/)?(.+\.(mov|MOV|MP4|mp4))/)[2]}`
            } else {
              continue
            }
          }
          if (post.classList.contains('videopost')) {
            postObj.vid = `${wsUrl}/${post.querySelector('video').getAttribute('src').match(/(\/.+\/)?(.+\.(mov|MOV|MP4|mp4))/)[2]}`
          }
          if (post.classList.contains('multiplechoicepost')) {
            postObj.poll = []
            for (const choice of post.querySelectorAll('.choice')) {
              postObj.poll.push({
                answer: choice.querySelector('.answer').innerHTML,
                votes: parseInt(choice.getAttribute('data-votes'))
              })
            }
          }

          eventObj.posts.push(postObj)
        }

          //console.log(eventTime)
          for(const book of event.querySelectorAll(`.book.exported`)) {
            //console.log(eventTime)
            let regexImgUrl = /url\("(https:\/\/.*\.au\.dk)?(\/.+\/)?(.+\.(jpg|png))?.+\);/gm
            let imgUrl = regexImgUrl.exec(entities.decode(book.querySelector('.preview').getAttribute('style')))
            if(imgUrl) {
              imgUrl = imgUrl[3]
              //console.log(imgUrl)
            } 

            if (!imgUrl) { // Here, the == is intentional
              imgUrl = 'no-cover-book-01.jpg'
            }


            let bookObj = {}
            try {
            bookObj = {
              isbn: entities.decode(book.querySelector('.isbn').innerHTML),
              pid: entities.decode(book.querySelector('.pid').innerHTML),
              title: entities.decode(book.querySelector('.title').innerHTML),
              author: entities.decode(book.querySelector('.author').innerHTML),
              date: entities.decode(book.querySelector('.release').innerHTML),
              desc: entities.decode(book.querySelector('.description').innerHTML),
              img: wsUrl+imgUrl,//wsUrl+entities.decode(book.querySelector('.pid').innerHTML).replace(':','-')+'.png'
              eventTime: eventTime
            }
            } catch(e) {
              console.log('Error while parsing a book element !')
              console.log(book.innerHTML)
            }

            eventObj.books.push(bookObj)
          }

          for(const book of event.querySelectorAll(`.bookshelf.exported .book`)) {
            //console.log(eventTime)
            let regexImgUrl = /url\("(https:\/\/.*\.au\.dk)?(\/.+\/)?(.+\.(jpg|png))?.+\);/gm
            let imgUrl = regexImgUrl.exec(entities.decode(book.querySelector('.preview').getAttribute('style')))
            if(imgUrl) {
              imgUrl = imgUrl[3]
              //console.log(imgUrl)
            }
            if (!imgUrl) { // Here, the == is intentional
              imgUrl = 'no-cover-book-01.jpg'
            }
            let bookObj = {
              isbn: entities.decode(book.querySelector('.isbn').innerHTML),
              pid: entities.decode(book.querySelector('.pid').innerHTML),
              title: entities.decode(book.querySelector('.title').innerHTML),
              author: entities.decode(book.querySelector('.author').innerHTML),
              date: entities.decode(book.querySelector('.release').innerHTML),
              desc: entities.decode(book.querySelector('.description').innerHTML),
              img: wsUrl+imgUrl,//wsUrl+entities.decode(book.querySelector('.pid').innerHTML).replace(':','-')+'.png'
              eventTime: eventTime
            }

            eventObj.books.push(bookObj)
          }
          respObj.events.push(eventObj)
        }

      })
    .catch(e => {
      console.error(e)
    }))
  }
  Promise.all(requests).then((values) => {
    response.set('Content-Type', 'application/json')
    response.send(respObj);
  })
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
