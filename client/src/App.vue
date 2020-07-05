<template>
  <div id="app" class="antialiased text-gray-900">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>

import NavBar from '@/components/misc/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
</style>
