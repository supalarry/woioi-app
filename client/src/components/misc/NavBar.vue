<template>
<!-- eslint-disable max-len -->
    <nav class="m-auto bg-black sm:flex sm:justify-between sm:items-center sm:py-5 sm:px-10">
        <div class="flex items-center justify-between px-5 py-3 sm:p-0">
            <div id="logo">
                <router-link to="/" class="text-3xl">
                    <h1 class="font-mono font-bold text-white">woioi</h1>
                </router-link>
            </div>
            <div id="burger" class="sm:hidden">
                <!-- for flex's items-center to work on button, make button block -->
                <button type="button" class="block text-gray-800 focus:outline-none" v-on:click="isOpen = !isOpen">
                    <svg class="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                        <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                        <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div id="links" v-on:click="isOpen = !isOpen" v-bind:class="isOpen ? 'block' : 'hidden'" class="px-2 pb-5 text-center sm:p-0 sm:block sm:flex sm:items-center">
            <router-link v-if="!loggedIn" to="/login" class="block px-2 py-2 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:px-5">Log In</router-link>
            <router-link v-if="loggedIn" v-on:click.native="logout()" to="/" class="block px-2 py-2 font-semibold text-white rounded-md hover:text-gray-900 hover:bg-gray-100 sm:px-5">Log Out</router-link>
            <router-link v-if="loggedIn" to="/search" class="block px-2 py-2 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:px-5">Search</router-link>
            <router-link v-if="loggedIn" to="/add" class="block px-2 py-2 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:px-5">Add</router-link>
            <router-link v-if="!loggedIn" to="/register" class="block px-2 py-2 mt-1 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:px-5">Get Started</router-link>
            <router-link v-if="!loggedIn" to="/" class="block px-2 py-2 mt-1 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:px-5">About</router-link>
            <router-link v-if="!loggedIn" to="/" class="block px-2 py-2 mt-1 font-semibold text-white rounded-md hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:px-5">Contact</router-link>
        </div>
    </nav>
</template>

<script>
import { logout } from '@/graphql/auth/UserResolver';
import { setAccessToken } from '@/auth/accessToken';

/* eslint-disable indent */
export default {
  name: 'Navigation',
  data() {
      return {
          isOpen: false,
      };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getLoggedInUser;
    },
  },
  methods: {
    async logout() {
        this.$store.dispatch('logout');
        localStorage.clear();
        await this.$apollo.mutate({
            mutation: logout,
        });
        setAccessToken('');
    },
  },
};
</script>
