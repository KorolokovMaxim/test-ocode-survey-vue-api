<template>
  <div class="container">
    <div class="user-answers-container">
      <router-link :to="{ name: 'surveys-completed' }">
        Ответы на вопросы
      </router-link>
    </div>
    <ul>
      <li v-for="(survey, i) in surveys" :key="i" class="list-group-item">
        <router-link :to="{ name: 'user-survey', params: { id: survey.id }}">
          {{ survey.name }}
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
    surveys() {
      return this.$store.state.survey.surveys;
    }
  },
  data() {
    return {
      loading: true,
    };
  }
};
</script>
<style scoped>
.container .user-answers-container {
  margin: 30px 0;
}
.container ul {
  margin-top: 30px;
}
</style>
