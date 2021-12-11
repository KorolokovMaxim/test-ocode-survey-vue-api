<template>
  <div class="users">
    <h2>Все пользователи</h2>
    <ul>
      <li v-for="(user,i) in users" :key="i">
        <router-link :to="{name: 'admin-user', params: { id: user.id }}">
          {{ user.username }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Users",
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    users() {
      return this.$store.state.users.users;
    }
  }
}
</script>

<style scoped>

</style>