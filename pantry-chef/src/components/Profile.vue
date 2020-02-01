<template>
  <div class="chef-profile">
    {{ profile.name }}
  </div>
</template>

<script>
export default {
  name: "ChefProfile",
  props: {
    profile: Object
  }
};
</script>

<style scoped></style>
