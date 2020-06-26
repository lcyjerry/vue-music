<template>
  <transition appear name="slide">
    <music-list  :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list";
import { mapGetters } from "vuex";

export default {
  // data() {
  //   return {
  //     songs: this.topList.songList
  //   };
  // },

  created(){
    console.log(this.topList)
  },

  components: {
    MusicList,
  },

  computed: {
    title() {
      return this.topList.topTitle;
    },

    bgImage() {
      return this.topList.picUrl;
    },

    ...mapGetters(["topList"]),
  },
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all .3s

.slide-enter, .slide-leave-top
  transform translate3d(100%,0,0)
</style>
