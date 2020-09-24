<script>
  import { Bar, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    extends: Bar,
    mixins: [reactiveProp],
    // eslint-disable-next-line vue/require-prop-types
    props: ['chartData', 'options'],
    watch: {
      chartData: function () {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>

<style>
</style>
