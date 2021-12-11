<template>
  <div v-if="!loading">
    <h1>{{ current.username }}</h1>
    <p>{{ survey.name }}</p>
    <ul>
      <li v-for="(survey, i) in completedSurvey" :key="i">
        {{survey.question.name}}
        <ul>
          <li v-for="(answers, j) in survey.answers" :key="j">
            {{answers.name}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
export default {
  name: "CompletedUserSurvey",
  data() {
    return {
      loading: true
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    users() {
      return this.$store.state.users.users;
    },
    current() {
      return this.users.filter((user) => {
        return user.id === Number(this.$route.params.userId);
      })[0];
    },
    survey() {
      return this.current.surveyUser.filter((survey) => {
        return survey.id === Number(this.$route.params.surveyId);
      })[0]
    },
    completedSurvey() {
      return this.$store.state.users.completedSurvey;
    }
  },
  async mounted() {
    await this.$store.dispatch('users/loadCompletedSurvey', {
      current: this.current,
      survey: this.survey,
      user: this.user,
    });

    this.loading = false;
  },

}
</script>

<style scoped>

</style>