<template>
  <div>
    <NavBar/>
    <b-card-group deck style="padding: 2rem">
      <AdminPatentCard
          v-for="parent in parents"
          :key="parent._id"
          :parent_data="parent"/>
    </b-card-group>
  </div>
</template>

<script>
import AdminPatentCard from "@/components/admin/AdminParentsCard";
import NavBar from "@/components/navbar/NavbarAdmin"

import axios from "axios";

const url = "http://localhost:5000/"

export default {
  name: 'AdminParent',
  data() {
    return {
      parents: [],
    }
  },
  components: {
    NavBar,
    AdminPatentCard
  },
  mounted() {
    axios
        .get(url + "account/")
        .then(response => {
          this.parents = response.data.parent
        })
  },
}
</script>