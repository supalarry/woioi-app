<template>
<!-- eslint-disable max-len -->
  <div class="py-5 text-center bg-white sm:flex sm:justify-center sm:mx-auto">
    <div>
      <input v-model="searchTerm" type="text" placeholder="song name or artist" class="text-3xl text-gray-800 outline-none">
    </div>
    <div>
      <button v-on:click="search()" class="px-2 py-1 mt-3 font-semibold text-gray-800 border-2 border-gray-800 rounded-md sm:mt-1 sm:ml-4 sm:pl-4 sm:pr-5 focus:outline-none">Go </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchTerm);
    },
  },
};
</script>
