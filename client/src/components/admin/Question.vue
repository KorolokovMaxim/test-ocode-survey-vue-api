<template>
  <div v-if="!loading" class="container question">
    <h2>
      {{ question.name }}
    </h2>
    <Form @submit.stop.prevent="submitForm">
      <div class="form-group">
        <label for="answer-name">Ответы: </label>
        <input id="answer-name" type="text" class="form-control" v-model="answerName"/>
        <input class="ok-button" type="submit" value="OK">
      </div>
    </Form>
      <ul class="list-group">
        <li v-for="(answer, i) in answers" :key="i" class="list-group-item">
          {{ answer.name }}
          <div class="delete-button" @click="onDelete(answer)">Удалить</div>
        </li>
      </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
export default {
  name: "Question",
  data(){
    return {
      answerName: "",
      loading: true
    }
  },
  computed:{
    user() {
      return this.$store.state.auth.user;
    },
    survey() {
      return this.$store.state.survey.surveys.filter((survey) => {
        return survey.id === Number(this.$route.params.survey);
      })[0];
    },
    question() {
      return this.survey.questions.filter((question) => {
        return question.id === Number(this.$route.params.id);
      })[0];
    },
    answers() {
      return this.$store.state.answers.answers;
    }
  },
  async mounted() {
    await this.$store.dispatch('answers/loadAnswers', {
      question: this.question,
      user: this.user
    })

    this.loading = false;
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch('answers/createAnswer', {
        name: this.answerName,
        question: this.question,
        user: this.user
      });

      this.answerName = "";
    },
    async onDelete(answer) {
      await this.$store.dispatch('answers/deleteAnswer', {
        answer: answer,
        user: this.user
      });
    }
  }
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