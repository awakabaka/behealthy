<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <div class="row" style="width: 100%">
        <div class="flex-column" style="margin: auto;">
          <b-dropdown id="dropdown-grouped" text="Фільтрувати за:" class="m-2"
                      variant="outline-info">
            <b-dropdown-item-button  v-on:click="getAllVisits">Всі </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-1" header="Тип візиту">
              <b-dropdown-item-button v-on:click="getFilterByVisits">Плановий візит</b-dropdown-item-button>
              <b-dropdown-item-button v-on:click="getFilterByVisits2">Позаплановий візит</b-dropdown-item-button>
            </b-dropdown-group>
          </b-dropdown>
        </div>
        <div class="flex-column" style="margin: auto;">
          <b-card-text style="font-size: 23px; color: #17A2B8">{{$t("history")}}</b-card-text>
        </div>
        <div class="flex-column" style="margin: auto;">
          <b-button variant="outline-info"
          v-on:click="move_to_vaccination">{{$t('vaccination')}} >></b-button>
        </div>
    </div>
      <HistoryCard
          v-for="history in filteredStories"
          :key="history._id"
          :patient_data="history"/>
      <div  style="text-align: center; width: 1480px; margin: 0px" v-if="filteredStories.length < 1">{{$t('not-found')}}</div>

    </b-card-group>
  </div>
</template>

<script>
import HistoryCard from "@/components/patient/HistoryCard";
import NavBar from "@/components/navbar/NavbarPatient"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'History',
  data() {
    return {
      stories: [],
      filteredStories: [],
      selectedItem: ""
    }
  },
  components: {
    NavBar,
    HistoryCard
  },
  methods: {
    move_to_vaccination() {
      this.$router.push('/vaccination')
    },
    getFilterByVisits() {
      this.filteredStories = this.stories
          .filter(this.filterByVisits);
    },
    getFilterByVisits2() {
      this.filteredStories = this.stories
          .filter(this.filterByVisits2);
    },
    getAllVisits() {
      this.filteredStories = this.stories
    },
    filterByVisits : function(history) {
      return history.type === "Плановий візит"
    },
    filterByVisits2 : function(history) {
      return history.type === "Позаплановий візит"
    },
    filterByStatusChronic : function (history) {
      return history.status === "chronic"
    },
  },
  mounted() {
    axios
        .get(url + "visit/user/" + localStorage.patientId)
        .then(response => {
          this.stories = response.data.visit
          this.filteredStories = response.data.visit
        })
        .catch(err => {
          if (err.response.status === 404) {

            this.$toast.warning(this.$t('history-not-found'), {
              duration: 7000,
              pauseOnHover: true
            })

          } else if (err.request) {
            alert(this.$t('err-lost-connection'))
          } else {
            alert(this.$t('err-other'))
          }
        })
  },
}
</script>