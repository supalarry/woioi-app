<template>
  <!-- eslint-disable max-len -->
  <div class="h-screen pt-4 lg:pt-16 main">
    <section class="w-9/12 max-w-sm p-5 mx-auto mt-6 bg-white rounded-md shadow-lg sm:p-10">
        <div class="text-center">
            <h1 class="mb-5 text-xl text-gray-900">Learn the language while having fun</h1>
        </div>
        <div class="text-center">
          <img class="h-16 mx-auto mb-2" src='@/assets/loading.svg' v-if="signingUp">
          <form v-on:submit.prevent="register()" v-if="!signingUp">
              <div class="py-2 mb-2 text-white bg-red-600 rounded-sm" v-if="errorMessage">{{this.errorMessage}}</div>
              <div class="py-2 mb-2 text-white bg-green-600 rounded-sm" v-if="successSignUp">{{this.successMessage}}</div>
              <input v-model="user.username" type="text" class="w-full px-2 py-1 mb-2 border-2 rounded-md" placeholder="username" required>
              <input v-model="user.email" type="email" class="w-full px-2 py-1 mb-2 border-2 rounded-md" placeholder="email" required>
              <input v-model="user.password" type="password" class="w-full px-2 py-1 mb-2 border-2 rounded-md" placeholder="password" required>
              <input v-model="user.confirmPassword" type="password" class="w-full px-2 py-1 mb-4 border-2 rounded-md" placeholder="confirm password" required>
              <button type="submit" class="block mx-auto btn btn-dark-outline btn-xsmall">Register</button>
          </form>
        </div>
    </section>
  </div>
</template>

<script>
import Joi from '@hapi/joi';
import { useRegisterUserMutation } from '@/graphql/auth/UserResolver';
import { setAccessToken } from '@/auth/accessToken';

const userSchema = Joi.object().keys({
  username: Joi.string().regex(/^[a-zA-Z0-9_]+$/).trim().min(1)
    .max(30)
    .required(),
  email: Joi.string().regex(/^\S+@\S+\.\S+$/).trim()
    .max(50)
    .required(),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/).trim().min(8)
    .max(100)
    .required(),
  confirmPassword: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/).trim().min(8)
    .max(100)
    .required(),
});

export default {
  data() {
    return {
      signingUp: false,
      successMessage: 'Successfully signed up',
      successSignUp: false,
      errorMessage: '',
      user: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
    async register() {
      this.errorMessage = '';
      if (!this.validUser()) {
        return;
      }
      try {
        this.signingUp = true;
        const response = await this.$apollo.mutate({
          mutation: useRegisterUserMutation,
          variables: {
            email: this.user.email,
            username: this.user.username,
            password: this.user.password,
            mainLang: 'en',
          },
        });
        this.successSignUp = true;
        this.signingUp = false;
        if (response && response.data) {
          setAccessToken(response.data.register.accessToken);
          this.$store.dispatch('login', response.data.register.user);
          this.$router.push('/search');
        }
      } catch (error) {
        console.log(error);
        this.signingUp = false;
        // this.errorMessage = error.response.data.message;
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'passwords must match 🙈';
        return false;
      }
      const validation = userSchema.validate(this.user);
      if (validation.error && validation.error.message !== null) {
        if (validation.error.message.includes('username')) {
          this.errorMessage = 'invalid username 😭';
        } else if (validation.error.message.includes('email')) {
          this.errorMessage = 'invalid email 😬';
        } else if (validation.error.message.includes('password')) {
          this.errorMessage = 'invalid password 😐';
        }
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url('../../assets/auth/register.jpg');
}
</style>
