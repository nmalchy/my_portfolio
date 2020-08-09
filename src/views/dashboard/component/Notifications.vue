<!-- eslint-disable -->
<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <base-material-card>
         <template v-slot:heading>
            <div class="display-2 font-weight-light text-center">
              When's my next bus?
            </div>
         </template>
         <v-text-field
         label="Bus Stop Number"
         v-model="stopNumber"
         @keydown="clearFields"
         ></v-text-field>
         <v-text-field
         label="Bus Route Number"
         v-model="busRouteNumber"
         @keydown="clearFields"
         ></v-text-field>
         <v-btn color="success" @click="getNextBus">
            Submit
         </v-btn>
        </base-material-card>
         <v-card v-if="allBusLoaded">
            <v-card-title>Next Buses</v-card-title>
            <br>
            <v-card-text v-for="(est, index) in estArrival" :key='est'>The {{ bus[index] }} is estimated to arrive at {{ est }}</v-card-text>
            <v-card-text><small>Disclaimer: Your bus may arrive 5-10 minutes early and will NOT wait at the stop to leave at the proper time, arrive early to avoid this common occurrence.</small></v-card-text>
         </v-card>
         <v-card v-if="specificBusLoaded">
            <v-card-title>Next {{ bus }} Buses</v-card-title>
            <br>
            <v-card-text v-for="est in estArrival" :key='est'>The {{ bus }} is estimated to arrive at {{ est }}</v-card-text>
            <v-card-text><small>Disclaimer: Your bus may arrive 5-10 minutes early and will NOT wait at the stop to leave at the proper time, arrive early to avoid this common occurrence.</small></v-card-text>
         </v-card>
         <v-card v-if="errorAlert">
            <v-card-title>Incorrect Stop # or Route</v-card-title>
            <v-card-text>Please check the stop number or bus route and try again.</v-card-text>
         </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
      <base-material-card>
         <template v-slot:heading>
            <div class="display-2 font-weight-light text-center">
              Where's a bus stop near me?
            </div>
         </template>
         <v-btn color="success" @click="getStopsNearMe">
            Submit
         </v-btn>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

  export default {
    name: 'translink-project',

    data: () => ({
      stopNumber: '',
      apiKey: '1jbdaevnaKMeJMP5LVwC',
      busData: [],
      bus: [],
      busRouteNumber: '',
      estArrival: [],
      allBusLoaded: false,
      specificBusLoaded: false,
      errorAlert: false
    }),
    methods: {
      getNextBus() {
         axios.defaults.headers.common = {
            'accept': 'application/json'
         }
         if (this.busRouteNumber.length > 0) {
            axios.get(`https://api.translink.ca/rttiapi/v1/stops/${this.stopNumber}/estimates?apikey=${this.apiKey}&timeframe=120&count=3&routeNo=${this.busRouteNumber}`)
            .then(response => this.busData = response.data)
            .then(() => {
               this.bus = ''
               this.estArrival = []
               this.specificBusLoaded = false

               this.busData[0]['Schedules'].map((data) => {
               this.bus = this.busData[0]['RouteNo']
               this.estArrival.push(data['ExpectedLeaveTime'])
               })
               this.errorAlert = false
               this.specificBusLoaded = true
            })
            .catch(error => {
               this.errorAlert = true
               console.log('error', error)
            })
            } else {
               axios.get(`https://api.translink.ca/rttiapi/v1/stops/${this.stopNumber}/estimates?apikey=${this.apiKey}`)
               .then(response => this.busData = response.data)
               .then(() => {
                  this.bus = []
                  this.estArrival = []
                  this.allBusLoaded = false

                  for (let i = 0; i < this.busData.length; i++) {
                     this.busData[i]['Schedules'].map((data) => {
                     this.bus.push(this.busData[i]['RouteNo'])
                     this.estArrival.push(data['ExpectedLeaveTime'])
                     })
                  }
                  this.errorAlert = false
                  this.allBusLoaded = true
               })
               console.log(this.bus)
               .catch(error => {
                  this.errorAlert = true
                  console.log('error', error)
               })
            }
         },

         clearFields() {
            this.allBusLoaded = false
            this.specificBusLoaded = false
            this.bus = []
            this.estArrival = []
         },

         getStopsNearMe() {
            axios.defaults.headers.common = {
               'accept': 'application/json'
            }

            axios.get(`https://api.translink.ca/rttiapi/v1/stops?apikey=${this.apiKey}&lat=49.248523&long=-123.108800&radius=1000`)
            .then(response => console.log(response.data))
            .catch(error => console.log('error', error))
         }
      },
  }
</script>
