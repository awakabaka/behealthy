<template>
  <div>
    <b-container style="width: 1000px; margin-top: 20px; margin-bottom: 20px; color: #355454;" >
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
          <b-card :header="header"
                  header-bg-variant="info"
                  header-text-variant="white"
          >
            <b-form >
              <div class="form-row justify-content-center">
                <div class="flex-column " style="margin: auto; width: 80%;">
                  <b-form-group
                      :class="{ 'hasError': $v.form.name.$error }">
                    <b-form-input v-model="form.name" :placeholder="name_label" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="firstName" :placeholder="first_name_label" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="secondName" :placeholder="second_name_label" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="address" :placeholder="address_label" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="phone" type="number" :placeholder="phone_label" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="email" :placeholder="email_label" type="email" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="password" :placeholder="password_label" type="password" required></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input v-model="repeatPassword" type="password" :placeholder="repeat_password_label" required></b-form-input>
                  </b-form-group>

                </div>
              </div>
              <b-form-group>
                <b-button style="width:100%; background-color: #17A2B8; border: 0px; color: white" type="submit" v-on:click="met">{{ $t('register') }}</b-button>
              </b-form-group>
              <b-form-group>
                <b-button style="width:100%"
                          variant="outline-info" type="submit" v-on:click="moveToLogin">
                  {{ $t('cancel') }}</b-button>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios"
import { required, minLength, between } from 'vuelidate/lib/validators'
const url = "http://localhost:5000/account/signup"

export default {
  data() {
    return {
      header: this.$t('registration'),
      name_label: this.$t('name'),
      first_name_label: this.$t('first-name'),
      second_name_label: this.$t('second-name'),
      email_label: this.$t('email'),
      password_label: this.$t('password'),
      repeat_password_label: this.$t('repeat-password'),
      address_label: this.$t('address'),
      phone_label: this.$t('phone'),

      form: {
        name: "",
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        repeatPassword: "",
        address: "",
        phone: ""
      },
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    firstName: {
      required,
      between: between(20, 30)
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if(this.$v.form.$error) return
      // to form submit after this
      alert('Form submitted')
    },
    /* moveToLogin() {
       return this.$toast.info(this.$t('err-message-name'));
     },
     checkForm: function (e) {
       /*if (this.name && this.firstName && this.second_name_label && this.email && this.password && this.address && this.phone) {
         return true;
       }*/
    /*
          if (this.name.length < 3) {
            this.$toast.info(this.$t('err-message-name'));
          this.errors.push("err")
          }
          if (this.firstName.length < 3) {
            this.$toast.info(this.$t('err-message-name'));

          }
          if (this.secondName.length < 3) {
            this.$toast.info(this.$t('err-message-name'));
          }
          if (this.password.length < 6) {
            this.$toast.info(this.$t('err-message-name'));
          }

          if (this.repeatPassword.length < 6) {
            this.$toast.info(this.$t('err-message-name'));
          }
          if (this.password != this.repeatPassword) {
            this.$toast.info(this.$t('err-message-name'));
          }
          if (!this.address) {
            this.$toast.info(this.$t('err-message-name'));
          }
          if (!this.phone) {
            this.$toast.info(this.$t('err-message-name'));
          }

          e.preventDefault();

        },*/
    met() {
      if (this.errors.length < 1) {
        alert("Yep")
      } else alert("Nope")
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.passwordValidation) {
        alert("Hi")
        axios
            .post(url, {
              email: this.email,
              password: this.password,
              name: this.name,
              firstName: this.firstName,
              secondName: this.secondName,
              address: this.address,
              phone: this.phone,
            })
            .then(response => {
              if (response.status === 201) {
                alert(this.$t('success-register'))
                this.$router.push('./')
              }
            })
            .catch(err => {
              if (err.response) {
                if (err.response.status === 401) {
                  alert(this.$t('err-wrong-credentials'));
                } else if (err.request) {
                  alert(this.$t('err-lost-connection'))
                } else {
                  alert(this.$t('err-other'))
                }
              }
            })
      }
    }
  },
  computed: {
    /*    acceptableVerificationStyle() {
      return this.email.length > 0 && this.password.length > 0 && this.name.length > 0 && this.firstName.length > 0
          && this.secondName.length > 0 && this.repeatPassword.length > 0 && this.address.length > 0
          && this.phone.length > 0 ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.email.length > 0 && this.password.length > 0 && this.name.length > 0 && this.firstName.length > 0
          && this.secondName.length > 0 && this.repeatPassword.length > 0 && this.address.length > 0
          && this.phone.length > 0);
    }
  },*/

  }
}
</script>