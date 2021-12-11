<template>
  <div class="survey">
    <h2>{{ survey.name }}</h2>
    <Form @submit.stop.prevent="submitForm">
      <div class="form-group">
        <label for="survey-name">Вопросы: </label>
        <input id="survey-name" type="text" class="form-control" v-model="questionName"/>
        <input class="ok-button" type="submit" value="OK">
      </div>
    </Form>
    <ul class="list-group">
      <li v-for="question in questions" :key="question.id" class="list-group-item">
        <router-link :to="{ name: 'admin-question', params: { survey: survey.id, id: question.id  }}">
          {{ question.name }}
        </router-link>
        <div class="delete-button" @click="onDelete(question)">Удалить</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Survey",
  data() {
    return {
      questionName: ""
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    survey() {
      return this.$store.state.survey.surveys.filter((survey) => {
        return survey.id === Number(this.$route.params.id);
      })[0];
    },
    questions() {
      return this.survey.questions;
    }
  },
  methods:{
    async submitForm(){
      await this.$store.dispatch('survey/createQuestion', {
        name: this.questionName,
        surveyId: this.survey.id,
        user: this.user
      });

      this.questionName = "";
    },
    async onDelete(question) {
      await this.$store.dispatch('survey/deleteQuestion', {
        question: question,
        user: this.user
      });
    }
  },
}
</script>

<style scoped>
.container .list-group .list-group-item {
  position: relative;
}
.container .list-group .list-group-item .delete-button {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: red;
}
</style>