<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <b-card-text style="color: #248F99; font-size: 25px;  margin-right: auto; margin-left: 700px;">{{$t('visits')}}</b-card-text>
      <div v-if="schedules.length < 1">{{$t('not-found')}}</div>
      <DoctorScheduleListCard
          v-for="schedule in schedules"
          :key="schedule._id"
          :schedule_data="schedule"/>
    </b-card-group>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavbarDoctor"
import DoctorScheduleListCard from "@/components/doctor/DoctorScheduleListCard";
import axios from "axios";


export default {
  name: 'DoctorScheduleCard',
  data() {
    return {
      schedules: [],
    }
  },
  components: {
    NavBar,
    DoctorScheduleListCard
  },
  mounted() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrowDate = now.getFullYear()+'-'+
    (now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0'+(now.getMonth() + 1))+'-'+
    (today.getDate() > 9 ? today.getDate() : '0'+today.getDate())
    console.log(tomorrowDate)
    axios
        .post("http://localhost:5000/schedule/doctor/" + localStorage.doctorId, {
        date: tomorrowDate})
        .then(response => {
          this.schedules = response.data
        })
  },
}
</script>