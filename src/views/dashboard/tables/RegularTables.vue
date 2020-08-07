<!-- eslint-disable -->
<template>
  <v-container fluid>
   <div></div>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
   data: () => ({
      items: [],
   }),
   created () {
      this.getCanadaStats()
   },
   methods: {
      getCanadaStats() {
         axios.get("https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=can")
         .then(response => console.log(response.data))
         .catch(error => console.log('error', error));
      }
   }
}
</script>
