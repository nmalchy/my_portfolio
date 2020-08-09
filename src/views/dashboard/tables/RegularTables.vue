<!-- eslint-disable -->
<template>
  <v-container fluid>
     <v-row>
        <v-col cols="12">
         <base-material-card class="pa-5" v-if="usableCountryData.length > 0">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              General COVID-19 Statistics By Country
            </div>
          </template>
            <v-card-title>
            <v-card-text align="right" v-if="countryData['data']['last_update']">Stats Updated: {{ countryData['data']['last_update'] }}</v-card-text>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
            dense
            ></v-text-field>
            </v-card-title>
            <br>
            <v-data-table
            :headers="headers"
            :items="usableCountryData"
            :search="search"
            ></v-data-table>
         </base-material-card>
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
         <v-card v-if="countryChartData != null" class="pa-5">
         <bar-chart :options="chartOptions" :chart-data="countryChartData" />
         </v-card>
         <v-skeleton-loader
         v-else
         class="mx-auto"
         max-width="auto"
         type="card"
         ></v-skeleton-loader>
      </v-col>
      <v-col cols="4">
      <v-card class="pa-5" v-if="countryChartData != null">
         <v-autocomplete 
         v-model="countryOneChartData"
         @change="populateChart" 
         :items="countries"
         label="Country One"
         dense
         outlined
         ></v-autocomplete>
         <v-autocomplete 
         v-model="countryTwoChartData"
         @change="populateChart" 
         :items="countries"
         label="Country Two"
         dense
         outlined
         ></v-autocomplete>
         <v-select
         v-model="comparisonMetricVal"
         @change="populateChart" 
         :items="comparisonMetric"
         label="Comparison Metric"
         dense
         outlined
         ></v-select>
         </v-card>
         <v-skeleton-loader
         v-else
         class="mx-auto"
         max-width="auto"
         type="card"
         ></v-skeleton-loader>
      </v-col>
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
      countryOneChartData: 'Canada',
      countryTwoChartData: 'USA',
      comparisonMetric: [
         'Active Cases', 
         'New Cases', 
         'New Deaths', 
         'Serious/Critical Cases',
         'Cases/1MilPop',
         'Total Deaths',
         'Total Recovered'
      ],
      comparisonMetricVal: "Total Deaths",
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
      chartOptions: null,
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
         .then(() => {
            let comparisonMetricUnfiltered = Object.keys(this.countryData['data']['rows'][0])
            //this.comparisonMetricVal = comparisonMetricUnfiltered.filter((data) => data !== 'flag' || 'country' || 'country_abbreviation')
         })
         .then(() => this.countryData['data']['rows'].map((data) => this.usableCountryData.push(data)))
         .then(() => this.populateChart())
         .catch(error => console.log('error', error))
      },

      populateChart() {
         let country1 = this.countryData['data']['rows'].filter((data) => data['country'] == this.countryOneChartData)
         let country2 = this.countryData['data']['rows'].filter((data) => data['country'] == this.countryTwoChartData)
         let comparisonMetricValReal = 'total_deaths';

            switch (this.comparisonMetricVal) {
               case 'Active Cases':
                  comparisonMetricValReal = "active_cases";
                  break;
               case 'New Cases':
                  comparisonMetricValReal = "new_cases";
                  break;
               case 'New Deaths':
                  comparisonMetricValReal = "new_deaths";
                  break;
               case 'Serious/Critical Cases':
                  comparisonMetricValReal = "serious_critical";
                  break;
               case 'Cases/1MilPop':
                  comparisonMetricValReal = "cases_per_mill_pop";
                  break;
               case 'Total Cases':
                  comparisonMetricValReal = "total_cases";
                  break;
               case 'Total Deaths':
                  comparisonMetricValReal = "total_deaths";
                  break;
               case 'Total Recovered':
                  comparisonMetricValReal = "total_recovered";
               }
            var colorArray = [];

            for (var i = 0; i < 2; i++)
            {
               var r = Math.floor(Math.random() * 255+9);
               var g = Math.floor(Math.random() * 255+11);
               var b = Math.floor(Math.random() * 255+3);
               colorArray.push("rgb(" + r + "," + g + "," + b + ", 0.5)");
            }

            this.countryChartData = {
               labels: [this.countryOneChartData, this.countryTwoChartData],
               datasets: [{
                  data: [
                     parseFloat(country1[0][comparisonMetricValReal].replace(/,/g, '')),
                     parseFloat(country2[0][comparisonMetricValReal].replace(/,/g, ''))
                  ],
                  backgroundColor: colorArray,
                  pointBorderColor: 'black',
                  pointBackgroundColor: 'black',
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:2,
                  hoverBorderColor:'#000'
               }]
            }
            
            this.chartOptions = {
               responsive: true,
               title: {
                  display: true,
                  text: 'Country COVID-19 Comparison Chart',
                  fontSize: 20
               },
               legend: {
                  display: false,
               },
               scales: {
                  yAxes: [{
                        ticks: {
                           beginAtZero: true
                        },
                        position: "left",
                        scaleLabel: {
                              display: true,
                              labelString: this.comparisonMetricVal,
                        },
                  }]
               }
            }
      }
   }
}
</script>
