<template>
  <div class="User">
  <h2>{{ current.username }}</h2>
  <h1>Пройденные опросы пользователя</h1>
    <ul>
      <li v-for="userSurvey in getSurveys" :key="userSurvey.id">
        <router-link :to="{name:'completed-user-survey', params:{userId: current.id, surveyId: userSurvey.id}} ">
          {{userSurvey.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    users() {
      return this.$store.state.users.users;
    },
    current() {
      return this.users.filter((user) => {
        return user.id === Number(this.$route.params.id);
      })[0];
    },
    getSurveys() {
      return this.current.surveyUser;
    }
  },
}
</script>

<style scoped>

</style>