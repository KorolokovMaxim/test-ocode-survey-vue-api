<template>
  <div class="container">
    <router-link :to="{name:'admin-all-user'}">
      Все пользователи
    </router-link>
    <Form @submit.stop.prevent="submitForm">
      <div class="form-group">
        <label for="survey-name">Опрос</label>
        <input id="survey-name" name="surveyName" type="text" class="form-control" v-model="surveyName"/>
        <input class="ok-button" type="submit" value="OK">
      </div>
    </Form>
    <h4>Все опросы</h4>
    <ul class="list-group">
      <li v-for="(survey, i) in surveys" :key="i" class="list-group-item">
        <router-link :to="{ name: 'admin-survey', params: { id: survey.id }}">
          {{ survey.name }}
        </router-link>
        <div class="delete-button" @click="onDelete(survey)">Удалить</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Admin",
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
      surveyName: ""
    };
  },
  methods:{
    async submitForm(){
      await this.$store.dispatch('survey/createSurvey', {
        name: this.surveyName,
        user: this.user
      });

      this.surveyName = "";
    },
    async onDelete(survey) {
      await this.$store.dispatch('survey/deleteSurvey', {
        survey: survey,
        user: this.user
      });
    }
  }

};
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

