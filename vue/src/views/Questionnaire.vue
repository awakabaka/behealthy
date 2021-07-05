<template>
  <div>
    <NavbarPatient/>
    <QuestionnaireCard/>
  </div>
</template>

<script>
import NavbarPatient from "@/components/navbar/NavbarPatient";
import QuestionnaireCard from "@/components/patient/QuestionnaireCard";
export default {
name: "Questionnaire",
  components: {
    NavbarPatient,
    QuestionnaireCard
  }
}
</script>

<style scoped>

</style>