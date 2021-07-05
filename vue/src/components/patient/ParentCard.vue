<template>
  <div>
      <b-card class="parent" style="max-width: 20rem; height: 200px">
      <b-card-text style="margin-bottom: 10px; padding-bottom: 5px; text-align: center">{{ parent.name }}</b-card-text>
      <b-card-text style="margin-bottom: 10px">{{ $t('address') }}: {{ parent.city }}, {{ parent.address }}</b-card-text>
      <b-card-text style="margin-bottom: 10px">{{ $t('phone') }}: {{ parent.phone }}</b-card-text>
      <b-card-text style="margin-bottom: 0px">{{ $t('email') }}: {{ parent.email }}</b-card-text>
    </b-card>
  </div>
</template>

<style>
.parent {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding: 0px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
  text-align: start;
}
</style>

<script>

import axios from "axios";
import jwt_decode from "jwt-decode"

export default {
  data() {
    return {
      parent: []
    }
  },

  mounted() {
    const token = localStorage.jwt
    const decoded = jwt_decode(token)
    const parentId = decoded.parentId
    axios.get("http://localhost:5000/account/" + parentId)
        .then(response => {
          this.parent = response.data.parent
        })
        .catch(err => {
          if (err.response) {
            if (err.request) {
            alert(this.$t('err-lost-connection'))
          } else {
            alert(this.$t('err-other'))
          }
          }
        })
  }
}
</script>