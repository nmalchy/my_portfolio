<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="6">
        <base-material-card
          height="319"
          class="pa-7"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Where's a bus stop near me?
            </div>
          </template>
          <small>Location Services Required. If there was no prompt, try refreshing. Checks a vicinity of 500 metres.</small>
          <br>
          <v-text-field
            v-model="stopNumberNearMe"
            label="Bus Route (Optional)"
            @keydown="clearNearbyFields"
          />
          <br>
          <br>
          <v-card-actions>
            <v-btn
              color="success"
              @click="getStopsNearMe"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </base-material-card>
        <v-card v-if="nearbyRoutesStopNum.length > 0">
          <v-card-title>Nearby Stops</v-card-title>
          <br>
          <v-card-text
            v-for="(stops, index) in nearbyRoutesStopNum"
            :key="stops"
          >
            Stop No. {{ nearbyRoutesStopNum[index] }}. Bus routes at this stop:
            <span v-html="nearbyRoutes[index]" />. Located at {{ nearbyRouteOnStreet[index] }} intersecting {{ nearbyRouteIntersectingStreet[index] }}
            and is {{ distanceAway[index] }} metres away.
          </v-card-text>
          <v-card-text><small>Disclaimer: Location accuracy error of +/- 5%</small></v-card-text>
        </v-card>
        <v-card v-if="locationErrorAlert">
          <v-card-title>Incorrect route or the route is not within a 500 meter radius.</v-card-title>
          <v-card-text>Please check the bus route and try again.</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="6"
      >
        <base-material-card class="pa-7">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              When's my next bus?
            </div>
          </template>
          <v-text-field
            v-model="stopNumber"
            label="Bus Stop Number"
            @keydown="clearFields"
          />
          <v-text-field
            v-model="busRouteNumber"
            label="Bus Route Number"
            @keydown="clearFields"
          />
          <v-card-actions>
            <v-btn
              color="success"
              @click="getNextBus"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </base-material-card>
        <v-card v-if="allBusLoaded">
          <v-card-title>Next Buses</v-card-title>
          <br>
          <v-card-text
            v-for="(est, index) in estArrival"
            :key="index"
          >
            The {{ bus[index] }} is estimated to arrive at {{ est }}
          </v-card-text>
          <v-card-text><small>Disclaimer: Your bus may arrive 5-10 minutes early and will NOT wait at the stop to leave at the proper time, arrive early to avoid this common occurrence.</small></v-card-text>
        </v-card>
        <v-card v-if="specificBusLoaded">
          <v-card-title>Next {{ bus }} Buses</v-card-title>
          <br>
          <!-- eslint-disable vue/valid-v-for -->
          <v-card-text v-for="est in estArrival">
            The {{ bus }} is estimated to arrive at {{ est }}
          </v-card-text>
          <v-card-text><small>Disclaimer: Your bus may arrive 5-10 minutes early and will NOT wait at the stop to leave at the proper time, arrive early to avoid this common occurrence.</small></v-card-text>
        </v-card>
        <v-card v-if="errorAlert">
          <v-card-title>Incorrect or Missing Route/Stop #</v-card-title>
          <v-card-text>Please check the stop number or bus route and try again.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-footer
      class="font-weight-medium"
    >
      <v-row>
        <v-col
          class="text-center"
          cols="12"
        >
          Data provided by:<a
            href="https://developer.translink.ca/"
            target="_blank"
          >https://developer.translink.ca/</a>
        </v-col>
        <v-col
          class="text-center"
          cols="12"
        >
          Source Code:<a
            href="https://github.com/nmalchy/my_portfolio/blob/master/src/views/dashboard/pages/TranslinkBusLocator.vue"
            target="_blank"
          >https://github.com/nmalchy/my_portfolio/blob/master/src/views/dashboard/pages/TranslinkBusLocator.vue</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
  /* eslint-disable no-return-assign */
  import axios from 'axios'

  export default {
    name: 'TranslinkProject',

    data: () => ({
      stopNumber: '',
      apiKey: '1jbdaevnaKMeJMP5LVwC',
      busData: [],
      bus: [],
      busRouteNumber: '',
      stopNumberNearMe: '',
      estArrival: [],
      allBusLoaded: false,
      specificBusLoaded: false,
      errorAlert: false,
      locationErrorAlert: false,
      lat: '',
      lng: '',
      nearbyRoutes: [],
      nearbyRoutesStopNum: [],
      nearbyRouteOnStreet: [],
      nearbyRouteIntersectingStreet: [],
      distanceAway: [],
    }),
    methods: {
      getNextBus () {
        axios.defaults.headers.common = {
          accept: 'application/json',
        }
        if (this.busRouteNumber.length > 0) {
          axios.get(`https://api.translink.ca/rttiapi/v1/stops/${this.stopNumber}/estimates?apikey=${this.apiKey}&timeframe=120&count=3&routeNo=${this.busRouteNumber}`)
            .then(response => this.busData = response.data)
            .then(() => {
              this.bus = ''
              this.estArrival = []
              this.specificBusLoaded = false

              this.busData[0].Schedules.map((data) => {
                this.bus = this.busData[0].RouteNo
                this.estArrival.push(data.ExpectedLeaveTime)
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
                this.busData[i].Schedules.map((data) => {
                  this.bus.push(this.busData[i].RouteNo)
                  this.estArrival.push(data.ExpectedLeaveTime)
                })
              }
              this.errorAlert = false
              this.allBusLoaded = true
            })
            .catch(error => {
              this.errorAlert = true
              console.log('error', error)
            })
        }
      },

      clearFields () {
        this.allBusLoaded = false
        this.specificBusLoaded = false
        this.bus = []
        this.estArrival = []
      },

      clearNearbyFields () {
        this.nearbyRoutes = []
        this.nearbyRoutesStopNum = []
        this.nearbyRouteOnStreet = []
        this.nearbyRouteIntersectingStreet = []
        this.distanceAway = []
      },

      getStopsNearMe () {
        axios.defaults.headers.common = {
          accept: 'application/json',
        }

        this.$getLocation({
          enableHighAccuracy: false,
        })
          .then(coordinates => {
            this.lat = coordinates.lat.toString().substr(0, 7)
            this.lng = coordinates.lng.toString().substr(0, 7)

            axios.get(`https://api.translink.ca/rttiapi/v1/stops?apikey=${this.apiKey}&lat=${this.lat}&long=${this.lng}&radius=500`)
              .then(response => {
                if (this.stopNumberNearMe.length > 0) {
                  const filteredNearbyStops = response.data.filter((data) => data.Routes.includes(this.stopNumberNearMe))
                  if (filteredNearbyStops.length > 0) {
                    this.locationErrorAlert = false
                    filteredNearbyStops.map((data) => {
                      this.nearbyRoutes.push(data.Routes)
                      this.nearbyRoutesStopNum.push(data.StopNo)
                      this.nearbyRouteOnStreet.push(data.OnStreet)
                      this.nearbyRouteIntersectingStreet.push(data.AtStreet)
                      this.distanceAway.push(data.Distance)
                    })
                  } else {
                    this.locationErrorAlert = true
                  }
                } else {
                  this.locationErrorAlert = false
                  response.data.map((data) => {
                    if (data.Routes.length > 0) {
                      this.nearbyRoutes.push(data.Routes)
                    } else {
                      this.nearbyRoutes.push('No routes for some reason, check <a href="https://alerts.translink.ca/" target="blank">https://alerts.translink.ca/</a> to inquire further')
                    }
                    this.nearbyRoutesStopNum.push(data.StopNo)
                    this.nearbyRouteOnStreet.push(data.OnStreet)
                    this.nearbyRouteIntersectingStreet.push(data.AtStreet)
                    this.distanceAway.push(data.Distance)
                  })
                }
              })
              .catch(error => {
                this.locationErrorAlert = true
                console.log('error', error)
              })
          })
      },
    },
  }
</script>
