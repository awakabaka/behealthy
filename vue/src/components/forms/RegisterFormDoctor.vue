<template>
  <div>
    <NavbarLogin/>
  <div class="profile" style="margin-bottom: 20px; margin-top: 40px; margin-left: auto; margin-right: auto; width: 40%">
    <b-card-text style="font-size:  20px">{{$t('register')}}</b-card-text>
    <b-form>
      <b-form-group
          id="input-group-name"
          :label=label_name
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
          :label=label_specialty
          label-align="left"
          label-for="input-specialty"
      >
        <b-form-input
            id="input-specialty"
            v-model="specialty"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-specialization"
          :label=label_specialization
          label-align="left"
          label-for="input-specialization"
      >
        <b-form-input
            id="input-specialization"
            v-model="specialization"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-university"
          :label=label_university
          label-align="left"
          label-for="input-university"
      >
        <b-form-input
            id="input-university"
            v-model="university"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-city"
          :label=label_city
          label-align="left"
          label-for="input-city"
      >
        <b-form-input
            id="input-city"
            v-model="city"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-workAddress"
          :label=label_workAddress
          label-align="left"
          label-for="input-workAddress"
      >
        <b-form-input
            id="input-workAddress"
            v-model="workAddress"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-phone"
          :label=label_phone
          label-align="left"
          label-for="input-phone"
      >
        <b-form-input
            id="input-phone"
            v-model="phone"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-licence"
          :label=label_licence
          label-align="left"
          label-for="input-licence"
      >
        <b-form-input
            id="input-licence"
            v-model="num_licence"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-email"
          :label=label_email
          label-align="left"
          label-for="input-email"
      >
        <b-form-input
            id="input-email"
            v-model="email"
            type="email"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-password"
          :label=label_password
          label-align="left"
          label-for="input-password"
      >
        <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-repeatPassword"
          :label=label_repeatPassword
          label-align="left"
          label-for="input-repeatPassword"
      >
        <b-form-input
            id="input-repeatPassword"
            v-model="repeatPassword"
            type="password"
            required
        ></b-form-input>
      </b-form-group>

      <b-button :variant="acceptableVerificationStyle"
                v-on:click="sendForm" style="margin-bottom: 20px; width: 50%">{{ $t('register-btn') }}</b-button>
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
import NavbarLogin from "@/components/navbar/NavbarLogin";
import axios from "axios";

export default {
  components: {NavbarLogin},
  data() {
    return {
      name: '',
      specialty: '',
      specialization: '',
      university: '',
      city: '',
      workAddress: '',
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
      num_licence: '',
      label_name: this.$t('full-name'),
      label_specialty: this.$t('specialty'),
      label_specialization: this.$t('specialization'),
      label_university: this.$t('university'),
      label_city: this.$t('city'),
      label_workAddress: this.$t('workAddress'),
      label_phone: this.$t('phone'),
      label_email: this.$t('email'),
      label_password: this.$t('password'),
      label_repeatPassword: this.$t('repeat-password'),
      label_licence: this.$t('licence'),
    }
  },
  methods: {
    sendForm() {
      const url = "http://localhost:5000/"
      axios
          .post(url + 'doctorrequest/addrequest', {
            name: this.name,
            specialty: this.specialty,
            specialization: this.specialization,
            university: this.university,
            city: this.city,
            workAddress: this.workAddress,
            phone: this.phone,
            email: this.email,
            password: this.password,
            repeatPassword: this.repeatPassword,
            license: this.num_licence
          })
          .then(response => {
            if (response) {
              this.$toast.info(this.$t('success-register-doctor'), {
                duration: 5000,
                onDismiss: this.$router.push('./children')
              })
            }
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 409) {
                this.$toast.error(this.$t('err-mail-exists'));
              } else if (err.response.status === 500) {
                this.$toast.error(this.$t('err-other'));
              }
            }
          })
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return this.name.length > 0 && this.specialty.length > 0 && this.specialization.length > 0 && this.university.length > 0
      && this.email.city > 0 && this.workAddress.length > 0 && this.phone.length > 0 && this.password.length > 0 &&
      this.repeatPassword.length > 0 && this.num_licence.length > 0 ? "info" : "outline-info";
    },
    acceptableVerification() {
      return !(this.name.length > 0 && this.specialty.length > 0 && this.specialization.length > 0 && this.university.length > 0
          && this.email.city > 0 && this.workAddress.length > 0 && this.phone.length > 0 && this.password.length > 0 &&
          this.repeatPassword.length > 0 && this.num_licence.length > 0);
    }
  }
}
</script>