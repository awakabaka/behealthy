<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1550px">
  <b-card class="profileh" style="width: 1400px;">
      <div class="row">
      <b-card-text style="margin-bottom: 10px; margin-right: auto; margin-left: 30px;">{{ patient_data.type }} </b-card-text>
        <b-card-text style="margin-bottom: 10px; margin-left: auto; margin-right: 30px; color: gray; font-size: 14px">{{ $d(new Date(patient_data.time), "long") }}</b-card-text>
    </div>
    <div class="flex-row" style="border: 1px; border-style: dotted; border-color: #355454; margin-bottom: 15px;"/>
    <div class="row">
      <div class="column">
        <b-card-text style="margin-bottom: 10px; line-break: strict; text-align: left">{{ $t('symptoms') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('diagnosis') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px">{{ $t('treatment') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('notes') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('height') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('weight') }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('reflexes') }}</b-card-text>
      </div>
      <div class="column" style="margin-left: 60px">
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.simptomps }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.diagnosis }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.treatment }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.notes }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.height }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.weight }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ patient_data.reflexes }}</b-card-text>
      </div>
    </div>
  </b-card>
  </div>
</template>

<style>
.profileh {
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
.column {
  margin-left: 30px;
  text-align: left;

}
</style>

<script>

export default {
  data() {
    return {
      doctor: "",
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
}
</script>