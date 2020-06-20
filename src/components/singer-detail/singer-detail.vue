<template>
  <transition appear name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { getSingerDetail } from "api/singer";
import { createSong, isValidMusic, processSongsUrl } from "common/js/song";
import { mapGetters } from "vuex";
import MusicList from "components/music-list/music-list";

export default {
  data() {
    return {
      songs: [],
    };
  },

  computed: {
    title() {
      return this.singer.name;
    },

    bgImage() {
      return this.singer.avatar;
    },

    ...mapGetters(["singer"]),
  },

  created() {
    this._getDetail();
  },

  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === 0) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs;
          });
        }
      });
    },

    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let { musicData } = item;
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },

  components: {
    MusicList,
  },
};
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition all .3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%,0,0)
</style>
