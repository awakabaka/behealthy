<template>
  <div class="flex-row" style="width: 1300px; padding-top: 20px; padding-bottom: 20px; margin: auto">
    <b-form-group class="profile" style="width: 800px; margin: auto">
      <div style="font-size: 25px; color: #248F99; margin-bottom: 40px;">{{ $t('new_visit')}}</div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" v-model="type" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Плановий візит">
        <label class="form-check-label labels"  for="inlineRadio1">Плановий візит</label>
      </div>
      <div class="form-check form-check-inline" style="padding-bottom: 15px">
        <input class="form-check-input" v-model="type" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Позаплановий візит">
        <label class="form-check-label labels" for="inlineRadio2">Позаплановий візит</label>
      </div>
      <div class="form-group">
        <label class="labels" for="simptomps">{{$t('symptoms')}}</label>
        <textarea class="form-control" id="simptomps" v-model="simptomps" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label class="labels" for="diagnosis">{{ $t('diagnosis') }}</label>
        <textarea class="form-control" id="diagnosis" v-model="diagnosis" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label class="labels" for="treatment">{{ $t('treatment') }}</label>
        <textarea class="form-control" id="treatment" v-model="treatment" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label class="labels" for="notes">{{ $t('notes') }}</label>
        <textarea class="form-control" id="notes" v-model="notes" rows="3"></textarea>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label class="labels" for="height">{{ $t('height') }}</label>
            <input type="text" id="height" v-model="height" class="form-control" >
          </div>
          <div class="col">
            <label class="labels" for="weight">{{ $t('weight') }}</label>
            <input type="text" id="weight" v-model="weight" class="form-control" >
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="labels" for="reflexes">{{ $t('reflexes') }}</label>
        <textarea class="form-control" id="reflexes" v-model="reflexes" rows="3"></textarea>
      </div>

      <b-button variant="info" v-on:click="move_to_disableform">{{ $t('add_vaccination') }}</b-button>
      <div class="form-group" :hidden="disableform">
        <div style="width: 90%; margin-left: auto; margin-right: auto; height: 1px; background-color: #000000;
        margin-bottom: 20px; margin-top: 20px;"/>

        <b-card-text style="font-size: 20px">{{$t('add_vaccination')}}</b-card-text>
        <div class="row">
          <div class="col">
            <label class="labels" for="name-vaccination">{{ $t('name-vaccination') }}</label>
            <input type="text" id="name-vaccination" v-model="vaccination_name" class="form-control" >
          </div>
          <div class="col">
            <label class="labels" for="dose">{{ $t('dose') }}</label>
            <input type="text" id="dose" v-model="vaccination_dose" class="form-control" >
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="labels" for="series">{{ $t('series') }}</label>
            <input type="text" id="series" v-model="vaccination_series" class="form-control" >
          </div>
          <div class="col">
            <label class="labels" for="reaction">{{ $t('reaction') }}</label>
            <input type="text" id="reaction" v-model="vaccination_reaction" class="form-control" >
          </div>
        </div>
        <div style="width: 90%; margin-left: auto; margin-right: auto; height: 1px; background-color: #000000; margin-top: 30px;"/>
      </div>
      <b-button style=" width: 100%; margin-top: 15px" type="submit"
                v-on:click="onSubmit"
                :variant="acceptableVerificationStyle" :disabled="acceptableVerification">{{ $t('send') }}</b-button>
      <b-button style=" width: 100%; margin-top: 15px; margin-bottom: 20px;" type="submit"
                v-on:click="onSubmit"
                variant="outline-info">{{ $t('cancel') }}</b-button>
    </b-form-group>
  </div>
</template>

<style>
.profile {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.labels {
  margin-right: auto;
  color: #2c3e50;
}
.mb-0 {
  padding-top: 5px;
}
</style>

<script>

import axios from "axios";

export default {
  data() {
    return {
      type: '',
      simptomps: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      height: '',
      weight: '',
      reflexes: '',
      vaccination_name: '',
      vaccination_dose: '',
      vaccination_series: '',
      vaccination_reaction: '',
      status: '',
      disableform: true

    }
  },
  computed: {
    acceptableVerificationStyle() {
      return this.simptomps.length > 0 && this.type.length > 0 && this.diagnosis.length > 0 &&
      this.treatment.length > 0 && this.notes.length > 0 && this.height.length > 0
      && this.weight.length > 0 && this.reflexes.length > 0 ? "info" : "outline-info";
    },
    acceptableVerification() {
      return !(this.simptomps.length > 0 && this.type.length > 0 && this.diagnosis.length > 0 &&
          this.treatment.length > 0 && this.notes.length > 0 && this.height.length > 0
          && this.weight.length > 0 && this.reflexes.length > 0);
    }
  },
  methods: {
    move_to_disableform(){
      this.disableform = !this.disableform
    },
    check() {
      alert(this.vaccination_name + " t " + this.diagnosis + " f " + localStorage.patientId)
    },
    onSubmit() {
      const url = "http://localhost:5000/"
      axios
          .post(url + 'visit', {
            patientId: localStorage.patientId,
            doctorId: localStorage.doctorId,
            type: this.type,
            simptomps: this.simptomps,
            diagnosis: this.diagnosis,
            treatment: this.treatment,
            notes: this.notes,
            height: this.height,
            weight: this.weight,
            reflexes: this.reflexes
          })
          .then(response => {
            this.$toast.info(this.$t('visit-created-msg'))
            if (response && this.vaccination_name !== '') {
              axios
                  .post(url + 'vaccination', {
                    patientId: localStorage.patientId,
                    doctorId: localStorage.doctorId,
                    name: this.vaccination_name,
                    dose: this.vaccination_dose,
                    series: this.vaccination_series,
                    reaction: this.vaccination_reaction,
                    visitId: response._id
                  })
              .then(res => {
                if (res.status === 200){
                  this.$toast.info(this.$t('vaccination-created-msg'))
                }
                  }

              )
            }
            this.$router.push('/visits')
          })
    }
  }
}
</script>