<template>
  <!-- eslint-disable max-len -->
  <div class="h-screen overflow-scroll main">
    <input v-model="song.name" type="text" class="w-full px-2 pt-16 pb-2 text-3xl text-center focus:outline-none" placeholder="name" required>
    <input v-model="song.artist" type="text" class="w-full px-2 py-2 text-3xl text-center focus:outline-none" placeholder="artist" required>
    <textarea v-model="song.lyrics" type="text" class="w-full px-2 py-2 text-3xl text-center align-top focus:outline-none" placeholder="lyrics" required></textarea>
    <div class="pt-2 pb-4 bg-white">
      <button v-on:click="addSong()" type="submit" class="block mx-auto mt-0 btn btn-dark-outline btn-xsmall">Add</button>
    </div>
  </div>
</template>

<script>

/* eslint-disable no-unreachable */

import { useAddSongMutation } from '@/graphql/domain/SongResolver';

import franc from 'franc';

export default {
  data() {
    return {
      song: {
        artist: '',
        name: '',
        lyrics: '',
        to: '',
      },
      response: {
        nameDeconstructed: '',
        lyricsDeconstructed: '',
      },
    };
  },
  methods: {
    async addSong() {
      try {
        const languageCode = franc(this.song.lyrics);
        const languageCodeTwoLetters = languageCode.substring(0, 2);
        const response = await this.$apollo.mutate({
          mutation: useAddSongMutation,
          variables: {
            artist: this.song.artist,
            name: this.song.name,
            lyrics: this.song.lyrics,
            to: this.$store.getters.getLoggedInUser.mainLang,
            ownerId: this.$store.getters.getLoggedInUser.id,
            language: languageCodeTwoLetters,
          },
        });
        if (response && response.data) {
          const { id } = response.data.addSong.song;
          this.$router.push(`/learn/${id}`);
        }
      } catch (error) {
        console.log(error);
        // this.errorMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url('../../../assets/domain/search.jpg');
}
</style>
