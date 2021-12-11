<template>
  <div class="container">
    <h1>Пройденые отпросы {{ user.username }}</h1>
    <ul>
      <li v-for="(survey, i) in completed" :key="i">
        <router-link :to="{ name: 'survey-completed',  params: { survey: survey.id } }">
          {{ survey.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SurveysCompleted",
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    completed() {
      return this.$store.state.survey.completed;
    }
  },
}
</script>

<style scoped>
.container h1 {
  margin: 30px 0;
}
</style>