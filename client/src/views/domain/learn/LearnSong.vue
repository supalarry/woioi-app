<template>
  <!-- eslint-disable max-len -->
  <div class="text-center">
    <SongInfo v-bind:song="song"></SongInfo>
    <div v-for="(line, lineIndex) in song.lyricsDeconstructed" v-bind:key="line.lineIndex" class="mb-8">
      <WordCard
      v-if="expandedWord.display && lineIndex == expandedWord.lineIndex"
      v-bind:word="expandedWord">
      </WordCard>
      <Words
      v-bind:line="line"
      v-bind:lineIndex="lineIndex"
      v-bind:expandedWord="expandedWord"
      v-on:expand="expand">
      </Words>
    </div>
  </div>
</template>

<script>

/* eslint-disable no-unreachable */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable global-require */

import { useGetSongQuery } from '@/graphql/domain/SongResolver';
import SongInfo from '@/components/domain/learn/SongInfo.vue';
import WordCard from '@/components/domain/learn/WordCard.vue';
import Words from '@/components/domain/learn/Words.vue';

export default {
  components: {
    WordCard,
    SongInfo,
    Words,
  },
  data() {
    return {
      song: {
        artist: '',
        name: '',
        nameTranslation: '',
        lyricsDeconstructed: '',
        language: '',
        albumCoverUrl: '',
      },
      expandedWord: {
        original: '',
        translated: '',
        imageUrl: '',
        display: false,
        lineIndex: -1,
        wordIndex: -1,
      },
      msg: new SpeechSynthesisUtterance(),
    };
  },
  async beforeMount() {
    try {
      const response = await this.$apollo.query({
        query: useGetSongQuery,
        variables: {
          id: parseInt(this.$route.params.id, 10),
        },
      });
      this.song.name = response.data.getSong.song.name;
      this.song.nameTranslation = response.data.getSong.song.nameTranslation;
      this.song.lyricsDeconstructed = JSON.parse(response.data.getSong.song.lyricsDeconstructed);
      this.song.artist = response.data.getSong.song.artist;
      this.song.language = response.data.getSong.song.language;
      this.song.albumCoverUrl = response.data.getSong.song.albumCoverUrl;
      this.expand(0, 0);
      // if (response && response.data) {
      //   const { id } = response.data.addSong.song;
      //   this.$router.push(`/browse/${id}`);
      // }
    } catch (error) {
      console.log(error);
      // this.errorMessage = error.response.data.message;
    }
  },
  methods: {
    expand(...args) {
      const [lineIndex, wordIndex] = args;
      this.expandedWord.display = true;
      this.expandedWord.lineIndex = lineIndex;
      this.expandedWord.wordIndex = wordIndex;
      this.expandedWord.original = this.song.lyricsDeconstructed[lineIndex]['translatedWords'][wordIndex]['original'];
      this.expandedWord.translation = this.song.lyricsDeconstructed[lineIndex]['translatedWords'][wordIndex]['translation'];
      this.expandedWord.imageUrl = this.song.lyricsDeconstructed[lineIndex]['translatedWords'][wordIndex]['imageUrl'];
      if (!this.expandedWord.imageUrl) {
        this.expandedWord.imageUrl = require('@/assets/unknownWord.png');
        this.expandedWord.translation = '??????';
      }
      this.speakExpandedWord();
    },
    speakExpandedWord() {
      this.msg.text = this.expandedWord.original;
      this.msg.lang = this.song.language;
      this.msg.rate = 0.7;
      window.speechSynthesis.speak(this.msg);
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url("https://get.wallhere.com/photo/1680x1050-px-album-covers-cover-art-Innerspeaker-Tame-Impala-1281723.jpg");
  background-position: center;
}
</style>
