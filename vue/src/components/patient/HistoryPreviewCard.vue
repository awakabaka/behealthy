<template>

    <b-card style="width: 250px; border: 0px; padding: 0px;">
      <div class="row">
        <div class="column" :id=patient_data._id style="width: 5px; height: 70px;"/>
        <div class="column" style="max-width: 157px">
          <b-card-text class="date" style="text-align: left">{{ $d(new Date(patient_data.time), "short") }}</b-card-text>
          <b-card-text class="textcrdp" style="text-align: left">{{ patient_data.diagnosis }}</b-card-text>
          <b-card-text class="textcrdp" style="text-align: left">{{ patient_data.treatment }}</b-card-text>
        </div>
      </div>
    </b-card>

</template>

<style>
.textcrdp {
  font-size: 15px;
  color: #355454;
  margin: 5px;
}
.date {
  color: gray;
  font-size: 12px;
  margin: 5px;
}
</style>

<script>

export default {
  data() {
    return {
      doctor: ""
    }
  },
  props: {
    patient_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkColor() {
      if (this.patient_data.type === "Позаплановий візит") {
        document.getElementById(this.patient_data._id).style.background = "plum"
      } else
      if (this.patient_data.type === "Плановий візит") {
        document.getElementById(this.patient_data._id).style.background = "palegreen"
      }
    }
  },
  mounted() {
    this.checkColor()
  }
}
</script>