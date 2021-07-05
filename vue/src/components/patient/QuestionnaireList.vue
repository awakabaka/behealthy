<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <b-card-text style="color: #248F99; font-size: 25px;  margin-right: auto; margin-left: 700px;">{{$t('questionnaires')}}</b-card-text>
      <b-button variant="info" style="margin-bottom: 10px;  margin-right: auto; margin-right: 45px;" v-on:click="move_to_add_questionnaire">{{$t("add-questionnaire")}}</b-button>
      <QuestionnaireListCard
          v-for="questionnaire in questionnaires"
          :key="questionnaire._id"
          :visit_data="questionnaire"/>
    </b-card-group>
    <div v-if="questionnaires.length < 1">{{$t('not-found')}}</div>

  </div>
</template>

<script>
import QuestionnaireListCard from "@/components/patient/QuestionnaireListCard";
import NavBar from "@/components/navbar/NavbarPatient"

import axios from "axios";


export default {
  name: 'QuestionnareList',
  data() {
    return {
      questionnaires: [],
    }
  },
  components: {
    NavBar,
    QuestionnaireListCard
  },
  methods: {
    move_to_add_questionnaire() {
      this.$router.push('/addquestionnaire')
    }
  },
  mounted() {
    axios
        .get("http://localhost:5000/questionnaire/" + localStorage.patientId)
        .then(response => {
          this.questionnaires = response.data.questionnaire
        })
  },
}
</script>