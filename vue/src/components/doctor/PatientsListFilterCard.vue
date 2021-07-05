<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1550px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <div class="column">
          <b-card-text style="width: 150px; text-align: start">{{ patient_data.name }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px;">
          <b-card-text class="itempl">{{ $d(new Date(patient_data.birthday), "short") }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px;">
          <b-card-text class="itempl">{{ $t(patient_data.male) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px; width: 100px">
          <b-card-text class="itempl">{{ patient_data.pulse }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px; width: 100px">
          <b-card-text class="itempl">{{ patient_data.temperature }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 100px; width: 100px">
          <b-card-text class="itempl">{{ patient_data.ast }}</b-card-text>
        </div>
        <div class="flex-column" style="margin-left: auto; margin-bottom: auto; margin-top: -5px; margin-bottom: 7px;">
          <b-button variant="outline-info" style="margin-right: 20px" v-on:click="move_to_add_visit">{{ $t('create-visit') }}</b-button>
          <b-button variant="outline-info" v-on:click="move_to_see_profile">{{ $t('see-profile') }}</b-button>
        </div>
      </div>
    </b-card>
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

.itempl {
  text-align: left;
  margin-bottom: 10px;
  color: #355454;
}
</style>

<script>
export default {
  data() {
    return {
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
    move_to_add_visit() {
      alert(this.patient_data._id)
      localStorage.patientId = this.patient_data._id
      this.$router.push('/newvisit')
    },
    move_to_see_profile() {
      localStorage.patientId = this.patient_data._id
      this.$router.push('/seepatient')
    }
  },
  mounted() {
    console.log(this.patient_data)
  }
}
</script>