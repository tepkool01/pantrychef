<template>
  <div class="login">
    <h1>Choose/Create a Profile</h1>
    <h2>Create a Profile</h2>
    <profile-create></profile-create>

    <h2>Select an existing profile</h2>
    <div v-for="p in profiles" v-bind:key="p.name">
      <profile :profile="p"></profile>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from "@/components/Profile.vue";
import ProfileCreate from "../components/ProfileCreate";
import { mapGetters } from "vuex";

export default {
  name: "Profiles",
  computed: {
    ...mapGetters(["profiles"])
  },
  components: {
    Profile,
    ProfileCreate
  }
};
</script>
