<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">SURVEY-TEST-TASK</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Главня
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Админ Панель</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">Панель пользователя</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Регистрация
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Войти
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Выйти
          </a>
        </li>
      </div>
    </nav>

    <div class="container" v-if="!loading">
      <router-view />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
  },
  async created() {
    this.registerResponse();
    await this.loadData();
  },
  methods: {
    registerResponse() {
      this.$axios.interceptors.response.use(
          undefined,
          (error) => {
            switch (error.response.status) {
              case 404:
                window.location.href = '/404';

                return Promise.reject(error);
              case 401:
              case 403:
                window.location.href = '/403';

                return Promise.reject(error);
              case 422:
                return Promise.reject(error);
              default:
                window.location.href = '/500';

                return Promise.reject(error);
            }
          },
      );
    },
    async loadData() {
      if (!this.currentUser) {
        return;
      }

      if (this.currentUser.roles.includes('ROLE_ADMIN')) {
        await this.$store.dispatch('users/loadUsers', {
          user: this.currentUser
        });
      }

      await this.$store.dispatch('survey/loadSurveys', {
        user: this.currentUser
      });

      await this.$store.dispatch('survey/loadCompleted', {
        user: this.currentUser
      });

      this.loading = false;
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
