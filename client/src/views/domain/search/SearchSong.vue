<template>
  <!-- eslint-disable max-len -->
  <div class="h-screen overflow-scroll main">
    <SearchBar v-on:search='search($event)'></SearchBar>
    <section class="mx-auto">
      <div class="flex flex-wrap items-center justify-center">
          <SongCard v-for="(song, i) in songs" v-bind:key="i" v-bind:song="song"></SongCard>
      </div>
    </section>
  </div>
</template>

<script>

import { useSearchSongsQuery } from '@/graphql/domain/SongResolver';
import SongCard from '@/components/domain/search/SongCard.vue';
import SearchBar from '@/components/misc/SearchBar.vue';

export default {
  components: {
    SongCard,
    SearchBar,
  },
  data() {
    return {
      searchTerm: '',
      songs: [],
    };
  },
  methods: {
    async search(eventData) {
      this.searchTerm = eventData;
      const response = await this.$apollo.query({
        query: useSearchSongsQuery,
        variables: {
          searchTerm: this.searchTerm,
        },
      });
      this.songs = response.data.searchSongs.songs;
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url('../../../assets/domain/search.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
