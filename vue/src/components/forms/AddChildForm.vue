<template>
  <div>
    <div class="profile" style="margin-bottom: 20px; margin-top: 40px; margin-left: auto; margin-right: auto; width: 47%">
      <b-card-text style="font-size:  20px">{{$t('register')}}</b-card-text>
      <b-form>
        <b-form-group
            id="input-group-name"
            :label=name_label
            label-align="left"
            label-for="input-name"
        >
          <b-form-input
              id="input-name"
              v-model="name"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-firstName"
            :label=birthday_label
            label-align="left"
            label-for="input-specialty"
        >
          <BDatepicker id="input-specialty" v-model="birthday" :min="min" :max="max" locale="en" required
                       :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"/>
        </b-form-group>

        <b-form-group
            id="input-group-inputState"
            :label=male_label
            label-align="left"
            label-for="inputState"
        >
            <select id="inputState" class="form-control" v-model="male">
              <option selected value="girl">{{$t('girl')}}</option>
              <option value="boy">{{$t('boy')}}</option>
            </select>
        </b-form-group>

        <div class="row justify-content-center">
        <b-form-group
            id="input-group-university"
            :label=height_label
            label-align="left"
            label-for="input-university"
            style="margin-right: 6px"
        >
          <b-form-input
              id="input-university"
              v-model="height"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-city"
            :label=weight_label
            label-align="left"
            label-for="input-city"

        >
          <b-form-input
              id="input-city"
              v-model="weight"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-blood"
            :label=blood_label
            label-align="left"
            label-for="input-city"
            style="margin-left: 6px"

        >
          <select id="input-group-blood" style="width: 220px" class="form-control" v-model="blood">
            <option selected value="A+">A+</option>
            <option value="O+">O+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="O-">O-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
          </select>
        </b-form-group>
        </div>

        <b-form-group
            id="input-group-workAddress"
            :label=full_term_label
            label-align="left"
            label-for="fullTerm-label"
        >
          <select id="fullTerm-label" class="form-control" v-model="fullTerm">
            <option selected value="term">{{$t('term')}}</option>
            <option value="aborted">{{$t('aborted')}}</option>
            <option value="post-term">{{$t('post-term')}}</option>
          </select>
        </b-form-group>

        <b-button :variant="acceptableVerificationStyle"
                  v-on:click="sendForm" style="margin-bottom: 20px; width: 50%">{{ $t('add-new-child') }}</b-button>
      </b-form>
    </div>
  </div>
</template>

<style>
.profile {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
</style>

<script>
import axios from "axios"
import jwt_decode from "jwt-decode";

export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1)
    // 15th two months prior
    const minDate = new Date(today)
    minDate.setFullYear(minDate.getFullYear()-1)
    minDate.setMonth(minDate.getMonth())
    minDate.setDate(now.getDate() + 5)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth())
    maxDate.setDate(now.getDate())
    return {
      header: this.$t('add-new-child'),
      name_label: this.$t('name'),
      birthday_label: this.$t('birthday'),
      male_label: this.$t('male'),
      height_label: this.$t('height'),
      weight_label: this.$t('weight'),
      blood_label: this.$t('blood'),
      full_term_label: this.$t('full-term'),

      parentId: "",
      name: "",
      birthday: "",
      male: "",
      height: "",
      weight: "",
      blood: "",
      fullTerm: "",

      tomorrowDate: now.getFullYear()+'-'+
          (now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0'+(now.getMonth() + 1))+'-'+
          (today.getDate() > 9 ? today.getDate() + 1 : '0'+today.getDate() + 1),
      min: minDate,
      max: maxDate
    }
  },
  methods: {
    chechData() {
      alert(localStorage.patentId + " " + this.name + this.birthday + this.male + this.height + this.weight + this.blood + this.fullTerm)
    },
    sendForm() {
      const token = localStorage.jwt
      const decoded = jwt_decode(token)
      const parentId = decoded.parentId

      const url = "http://localhost:5000/"
      axios
          .post(url + 'patient/add', {
            name: this.name,
            birthday: this.birthday,
            male: this.male,
            height: this.height,
            weight: this.weight,
            blood: this.blood,
            fullTerm: this.fullTerm,
            parentId: parentId
          })
          .then(response => {
            if (response) {
              this.$toast.info(this.$t('success-register'), {
                duration: 5000,
                onDismiss: this.$router.push('./children')
              })
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 404) {
                this.$toast.error(this.$t('err-other'));
              } else if (err.response.status === 500) {
                this.$toast.error(this.$t('err-other'));
              }
            }
          })
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return this.name.length > 0 && this.birthday.length > 0 && this.height.length > 0 && this.weight.length > 0
      && this.blood.length > 0 && this.male.length > 0 && this.fullTerm.length > 0 ? "info" : "outline-info";
    },
    acceptableVerification() {
      return !(this.name.length > 0 && this.birthday.length > 0 && this.height.length > 0 && this.weight.length > 0
          && this.blood.length > 0 && this.male.length > 0 && this.fullTerm.length > 0);
    }
  },
}
</script>