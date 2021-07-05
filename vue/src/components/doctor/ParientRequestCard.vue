<template>
  <div style="max-width: 1550px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <div class="column" style="width: 280px; text-align: left;">
          <b-card-text style="margin-left: 30px; margin-bottom: 10px; color: #355454;">{{ name }}</b-card-text>
        </div>
        <div class="column">
          <b-card-text class="item">{{ $d(new Date(birthday), "short") }}</b-card-text>
        </div>
        <div class="column">
          <b-card-text class="item">{{ $t(male) }}</b-card-text>
        </div>
        <div class="column">
          <b-card-text class="item">{{ parent_name }}</b-card-text>
        </div>
        <div class="column" style="margin-left: auto; margin-top: -5px; margin-bottom: 7px;">
          <b-button variant="outline-info" style="margin-right: 10px" v-on:click="confirmRequest">{{$t('confirm')}}</b-button>
          <b-button variant="outline-info" v-on:click="rejectRequest">{{$t('reject')}}</b-button>
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
  padding-right: 20px;
  border-radius: 20px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}

.item {
  margin-left: 100px;
  margin-bottom: 10px;
  color: #355454;
}
</style>

<script>
import axios from "axios"

export default {
  data() {
    return{
      name: "",
      birthday: "",
      male: "",
      parentId: "",
      parent_name: "",
      parent_firstname: "",
      parent_secondname: ""
    }
  },
  props: {
    request_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    confirmRequest() {
      axios
          .patch("http://localhost:5000/patientrequest/" + this.request_data._id, {
              patientId: this.request_data.patientId,
              doctorId: localStorage.doctorId})
          .then(res => {
            if (res) {
              window.location.reload();
              this.$toast.success(this.$t('add-patient-success'))
            }
          })
    },
    rejectRequest() {
      axios
          .delete("http://localhost:5000/patientrequest/" + this.request_data._id)
          .then(res => {
            if (res) {
              this.$toast.warning(this.$t('reject-patient-success'))
            }
          })
    }
  },
  mounted() {
    axios
        .get("http://localhost:5000/patient/" + this.request_data.patientId)
        .then(res => {
          this.name = res.data.patient.name
          this.birthday = res.data.patient.birthday
          this.male = res.data.patient.male
          this.parentId = res.data.patient.parentId
          axios
              .get("http://localhost:5000/account/" + this.parentId)
              .then(res => {
                this.parent_name = res.data.parent.name
                this.parent_firstname = res.data.parent.firstName
                this.parent_secondname = res.data.parent.secondName
              })
        })
        .catch(err => {
          alert(err.message())
        })
  }
}
</script>