<template>
  <div>
    <NavBar/>
    <AddChildForm/>
  </div>
</template>

<script>
import AddChildForm from "@/components/forms/AddChildForm";
import NavBar from "@/components/navbar/Navbar"
export default {
  name: 'AddChild',
  components: {
    NavBar,
    AddChildForm
  }
}
</script>