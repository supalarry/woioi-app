<template>
  <!-- eslint-disable max-len -->
  <div class="h-screen pt-16 lg:pt-24 main">
    <section class="w-9/12 max-w-sm p-5 mx-auto mt-6 bg-white rounded-md shadow-lg sm:p-10">
        <div class="text-center">
            <h1 class="mb-5 text-xl text-gray-900 /">Welcome back</h1>
        </div>
        <div class="mt-4 text-center">
            <div class="mb-4 text-white bg-red-600 rounded-sm" v-if="errorMessage">{{this.errorMessage}}</div>
            <img class="h-16 mx-auto mb-4" src='@/assets/loading.svg' v-if="loggingIn">
              <form v-on:submit.prevent="login()" v-if="!loggingIn">
                  <input v-model="user.email" type="email" class="w-full px-2 py-1 mb-2 border-2 rounded-md" placeholder="email" required>
                  <input v-model="user.password" type="password" class="w-full px-2 py-1 mb-4 border-2 rounded-md" placeholder="password" required>
                  <button type="submit" class="block mx-auto btn btn-dark-outline btn-xsmall">Log in</button>
              </form>
        </div>
    </section>
  </div>
</template>

<script>

import Joi from '@hapi/joi';
import { useLoginUserMutation } from '@/graphql/auth/UserResolver';
import { setAccessToken } from '@/auth/accessToken';

const userSchema = Joi.object().keys({
  email: Joi.string().regex(/^\S+@\S+\.\S+$/).trim()
    .max(50)
    .required(),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/).trim().min(8)
    .max(100)
    .required(),
});

export default {
  data() {
    return {
      loggingIn: false,
      errorMessage: '',
      user: {
        email: '',
        password: '',
      },
    };
  },
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    async login() {
      this.errorMessage = '';
      if (!this.validUser()) {
        return;
      }
      try {
        const response = await this.$apollo.mutate({
          mutation: useLoginUserMutation,
          variables: { email: this.user.email, password: this.user.password },
        });
        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
          this.$store.dispatch('login', response.data.login.user);
          this.$router.push('/search');
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    validUser() {
      const validation = userSchema.validate(this.user);
      if (validation.error && validation.error.message !== null) {
        this.errorMessage = 'Incorrect username or password';
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url('../../assets/auth/login.jpg');
}
</style>
