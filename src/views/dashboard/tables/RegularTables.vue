<!-- eslint-disable -->
<template>
  <v-container fluid>
     <v-row>
        <v-col cols="12">
         <v-card v-if="usableCountryData.length > 0">
            <v-card-title>
            <v-card-text align="right" v-if="countryData['data']['last_update']">Updated: {{ countryData['data']['last_update'] }}</v-card-text>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
            </v-card-title>
            <br>
            <v-data-table
            :headers="headers"
            :items="usableCountryData"
            :search="search"
            ></v-data-table>
         </v-card>
         <v-skeleton-loader
         v-else
         class="mx-auto"
         max-width="auto"
         type="table"
         ></v-skeleton-loader>
      </v-col>
     </v-row>
     <v-row>
      <v-col cols="8">
         <v-card>
         <bar-chart v-if="countryOneChartData != null" :options="chartOptions" :chart-data="countryChartData" />
         </v-card>
      </v-col>
      <v-autocomplete @change="populateChart" :items="countries"></v-autocomplete>
     </v-row>
     <h4>Data provided by https://documenter.getpostman.com/view/4074074/SzS7Pkup?version=latest</h4>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import BarChart from '../component/BarChart'

export default {
   components: {
      BarChart
   },
   data: () => ({
      search: '',
      countries: [],
      countryData: [],
      usableCountryData: [],
      countryOneChartData: [],
      countryTwoChartData: [],
      countryChartDataLabel: [],
      headers: [
         { text: 'Country', align: 'start', filterable: true, value: 'country' },
         { text: 'Active Cases', value: 'active_cases' },
         { text: 'New Cases', value: 'new_cases' },
         { text: 'New Deaths', value: 'new_deaths' },
         { text: 'Serious/Critical Cases', value: 'serious_critical' },
         { text: 'Total Cases', value: 'total_cases' },
         { text: 'Cases/1Mil Pop.', value: 'cases_per_mill_pop' },
         { text: 'Total Deaths', value: 'total_deaths' },
         { text: 'Total Recovered', value: 'total_recovered' },
      ],
      chartOptions: {
         responsive: true,
         title: {
            display: true,
            text: 'Country COVID-19 Comparison Chart',
            fontSize: 30
         },
         legend: {
            align: 'start',
            position: 'bottom',
         },
      },
      countryChartData: null,
   }),
   created () {
      this.getCountries()
   },
   methods: {
      getCountries() {
         axios.get("https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=220")
         .then(response => this.countryData = response.data)
         .then(() => this.countryData['data']['rows'].map((data) => this.countries.push(data['country'])))
         .then(() => this.countryData['data']['rows'].map((data) => this.usableCountryData.push(data)))
         .then(() => this.populateChart())
         .catch(error => console.log('error', error))
      },

      populateChart() {
         console.log(this.usableCountryData)
         this.usableCountryData.map((data) => {
            this.countryChartDataLabel.push(data['country'])
            this.countryOneChartData.push(data['total_deaths'])
            console.log('hellooooo')
            this.countryChartData = {
               labels: this.countryChartDataLabel,
               datasets: [{
                  data: this.countryOneChartData,
                  pointBorderColor: 'black',
                  pointBackgroundColor: 'black',
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:2,
                  hoverBorderColor:'#000'
               }]
            }
         })
      }
   }
}
</script>
