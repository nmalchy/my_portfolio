<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <base-material-card
          v-if="usableCountryData.length > 0"
          class="pa-5"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              General COVID-19 Statistics By Country
            </div>
          </template>
          <v-card-title>
            <v-card-text
              v-if="countryData[0][0]['Date']"
              align="right"
            >
              Figures Last Updated: {{ countryData[0][0]['Date'].substring(0,10) }}
            </v-card-text>
            <v-spacer />
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
              dense
            />
          </v-card-title>
          <br>
          <v-data-table
            :headers="headers"
            :items="usableCountryData"
            :search="search"
          />
        </base-material-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          max-width="auto"
          type="table"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card
          v-if="countryChartData != null"
          class="pa-5"
        >
          <bar-chart
            :options="chartOptions"
            :chart-data="countryChartData"
          />
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          max-width="auto"
          type="card"
        />
      </v-col>
      <v-col cols="4">
        <v-card
          v-if="countryChartData != null"
          class="pa-5"
        >
          <v-autocomplete
            v-model="countryOneChartData"
            :items="countries"
            label="Country One"
            dense
            outlined
            @change="populateChart"
          />
          <v-autocomplete
            v-model="countryTwoChartData"
            :items="countries"
            label="Country Two"
            dense
            outlined
            @change="populateChart"
          />
          <v-select
            v-model="comparisonMetricVal"
            :items="comparisonMetric"
            label="Comparison Metric"
            dense
            outlined
            @change="populateChart"
          />
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          max-width="auto"
          type="card"
        />
      </v-col>
    </v-row>
    <h4 class="text-center">
      Data provided by:
      <a
        href="https://documenter.getpostman.com/view/10808728/SzS8rjbc"
        target="_blank"
      >
        https://documenter.getpostman.com/view/10808728/SzS8rjbc
      </a>
    </h4>
    <h4 class="text-center">
      Source Code:
      <a
        href="https://github.com/nmalchy/my_portfolio/blob/master/src/views/dashboard/pages/Covid19Tracker.vue"
        target="_blank"
      >
        https://github.com/nmalchy/my_portfolio/blob/master/src/views/dashboard/pages/Covid19Tracker.vue
      </a>
    </h4>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import BarChart from '../component/BarChart'

  export default {
    components: {
      BarChart,
    },
    data: () => ({
      search: '',
      countries: [],
      countryData: [],
      usableCountryData: [],
      countryOneChartData: 'Canada',
      countryTwoChartData: 'United States of America',
      comparisonMetric: [
        'New Confirmed Cases',
        'Total Confirmed Cases',
        'New Deaths',
        'New Recovered',
        'Total Deaths',
        'Total Recovered',
      ],
      comparisonMetricVal: 'Total Deaths',
      headers: [
        { text: 'Country', align: 'start', filterable: true, value: 'Country' },
        { text: 'New Confirmed Cases', value: 'NewConfirmed' },
        { text: 'Total Confirmed Cases', value: 'TotalConfirmed' },
        { text: 'New Deaths', value: 'NewDeaths' },
        { text: 'Total Deaths', value: 'TotalDeaths' },
        { text: 'New Recovered', value: 'NewRecovered' },
        { text: 'Total Recovered', value: 'TotalRecovered' },
      ],
      chartOptions: null,
      countryChartData: null,
    }),
    created () {
      setTimeout(this.getCountries(), 5000)
    },
    methods: {
      getCountries () {
        axios.get('https://api.covid19api.com/summary')
          // .then(response => console.log(response))
          .then(response => this.countryData.push(response.data.Countries))
          .then(console.log(this.countryData))
          .then(() => this.countryData[0].map((data) => this.countries.push(data.Country)))
          .then(() => this.countryData[0].map((data) => this.usableCountryData.push(data)))
          .then(() => this.populateChart())
          .catch(error => console.log('error', error))
      },

      populateChart () {
        const country1 = this.countryData[0].filter((data) => data.Country === this.countryOneChartData)
        const country2 = this.countryData[0].filter((data) => data.Country === this.countryTwoChartData)

        console.log(country1)
        let comparisonMetricValReal = ''

        switch (this.comparisonMetricVal) {
          case 'Total Confirmed Cases':
            comparisonMetricValReal = 'TotalConfirmed'
            break
          case 'New Confirmed Cases':
            comparisonMetricValReal = 'NewConfirmed'
            break
          case 'New Deaths':
            comparisonMetricValReal = 'NewDeaths'
            break
          case 'New Recovered':
            comparisonMetricValReal = 'NewRecovered'
            break
          case 'Total Deaths':
            comparisonMetricValReal = 'TotalDeaths'
            break
          case 'Total Recovered':
            comparisonMetricValReal = 'TotalRecovered'
            break
          default:
            comparisonMetricValReal = 'TotalDeaths'
        }

        var colorArray = []

        for (var i = 0; i < 2; i++) {
          var r = Math.floor(Math.random() * 255 + 9)
          var g = Math.floor(Math.random() * 255 + 11)
          var b = Math.floor(Math.random() * 255 + 3)
          colorArray.push('rgb(' + r + ',' + g + ',' + b + ', 0.5)')
        }

        this.countryChartData = {
          labels: [this.countryOneChartData, this.countryTwoChartData],
          datasets: [{
            data: [
              parseFloat(country1[0][comparisonMetricValReal]),
              parseFloat(country2[0][comparisonMetricValReal]),
            ],
            backgroundColor: colorArray,
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 2,
            hoverBorderColor: '#000',
          }],
        }

        this.chartOptions = {
          responsive: true,
          title: {
            display: true,
            text: 'Country COVID-19 Comparison Chart',
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: this.comparisonMetricVal,
              },
            }],
          },
        }
      },
    },
  }
</script>
