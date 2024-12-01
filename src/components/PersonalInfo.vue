<template>
  <div>
    <h1>Personal Info</h1>
    <p>Email: {{ email }}</p>
    <!-- Add more content here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: this.$route.params.email
    };
  },
  watch: {
    '$route.params.email': function(newEmail) {
      this.email = newEmail;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
