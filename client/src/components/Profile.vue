<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Профиль <strong>{{currentUser.username}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role, i) in currentUser.roles" :key="i">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>