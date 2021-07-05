<template>
  <div>
    <b-container style="width: 600px; margin-top: 100px; color: #355454;" >
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
          <b-card :header="header"
                  header-bg-variant="info"
                  header-text-variant="white"
          >
            <b-form @submit="onSubmit">
              <b-form-group
                  :label="email_label">
                <b-form-input v-model="email" required></b-form-input>
              </b-form-group>
              <b-form-group
                  :label="password_label">
                <b-form-input v-model="password" type="password" required></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button style="width:100%; margin-top: 40px; background-color: #55C8D4; border: 0px" type="submit"
                          :variant="acceptableVerificationStyle" :disabled="acceptableVerification">
                  {{ $t('sign-in') }}</b-button>
              </b-form-group>
              <b-link v-on:click="moveToRegister">{{ $t('register-link') }}</b-link>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios"

const url = "http://localhost:5000/"

export default {
  data() {
    return {
      header: this.$t('login'),
      email_label: this.$t('email'),
      password_label: this.$t('password'),

      email: "",
      password: ""
    }
  },
  methods: {
    moveToRegister() {
      this.$router.push('/signup')
    },

    onSubmit(event) {
      event.preventDefault();
      axios
          .post(url + 'account/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.jwt = response.data.token
            this.$router.push('/children')
          })
          .catch(err => {
            if (err.response) {
              if(err.response.status === 401) {
                this.$toast.error(this.$t('err-wrong-credentials'));
              } else if(err.response.status === 404) {
                axios.post(url + 'doctor/login', {
                  email: this.email,
                  password: this.password
                })
                    .then(response => {
                      localStorage.jwt = response.data.token
                      this.$router.push('/profile')
                    })
                    .catch(err => {
                      if (err.response) {
                        if (err.response.status === 401) {
                          this.$toast.error(this.$t('err-wrong-credentials'));
                        } else if (err.response.status === 404) {
                          axios.post(url + 'admin/login', {
                            email: this.email,
                            password: this.password
                          })
                              .then(response => {
                                localStorage.jwt = response.data.token
                                this.$router.push('/doctors')
                              })
                              .catch(err => {
                                if (err.response) {
                                  this.$toast.error(this.$t('err-wrong-credentials'));
                                } else if (err.request) {
                                  this.$toast.error(this.$t('err-lost-connection'))
                                } else {
                                  this.$toast.error(this.$t('err-other'))
                                }
                              })
                        }
                      }
                    })
              }

            } else if (err.request) {
              this.$toast.error(this.$t('err-lost-connection'))
            } else {
              this.$toast.error(this.$t('err-other'))
            }
          })
    }
  },
  computed: {
    acceptableVerificationStyle() {
      return this.email.length > 0 && this.password.length > 0 ? "dark" : "outline-dark";
    },
    acceptableVerification() {
      return !(this.email.length > 0 && this.password.length > 0);
    }
  },
}
</script>