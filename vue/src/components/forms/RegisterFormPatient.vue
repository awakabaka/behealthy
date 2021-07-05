<template>
  <div>
    <b-button style="margin-top: 20px; width: 30%" variant="info" v-on:click="move_to_doctor_register">{{$t('register-doctor')}}</b-button>

    <div class="profile" style="margin-bottom: 20px; margin-top: 20px; margin-left: auto; margin-right: auto; width: 40%">
        <b-card-text style="font-size: 20px; margin-left: auto; margin-right: auto;" v-on:click="move_to_doctor_register">{{$t('register')}}</b-card-text>
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
            :label=label_address
            label-align="left"
            label-for="input-workAddress"
        >
          <b-form-input
              id="input-workAddress"
              v-model="address"
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

        <b-button variant="info"
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
import axios from "axios";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      address: '',
      city: '',
      phone: '',
      label_phone: this.$t('phone'),
      label_name: this.$t('full-name'),
      label_email: this.$t('email'),
      label_password: this.$t('password'),
      label_repeatPassword: this.$t('repeat-password'),
      label_address: this.$t('address'),
      label_city: this.$t('city')
    }
  },
  methods: {
    move_to_doctor_register() {
      this.$router.push('/register/doctor')
    },
    sendForm() {
      const url = "http://localhost:5000/"
      axios
          .post(url + 'account/signup', {
            name: this.name,
            city: this.city,
            email: this.email,
            password: this.password,
            address: this.address,
            phone: this.phone
          })
          .then(response => {
            if (response) {
              this.$toast.info(this.$t('success-register'), {
                duration: 5000,
                onDismiss: this.$router.push('/')
              })
            }
          })
          .catch(err => {
            if (err.response) {
              this.$toast.error(this.$t('err-other'));
            } else if (err.response.status === 409) {
                this.$toast.error(this.$t('err-mail-exists'));
              } else if (err.response.status === 500) {
                this.$toast.error(this.$t('err-other'));
              }
          })
    }
  },
  computed: {

  }
}
</script>