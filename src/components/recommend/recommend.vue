<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider class="slider-content">
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              @click="selectItem(item)"
              class="item"
              v-for="item in discList"
              :key="item.dissid"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!discList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import { getDiscList } from "api/recommend";
import { getRecommend } from "api/recommend";
import Slider from "base/slider/slider";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],

  data() {
    return {
      recommends: [],
      discList: [],
    };
  },

  created() {
    this._getRecommend();
    this._getDiscList();
  },

  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : " ";
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },

    _getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.slider;
        console.log(this.recommends)
      });
    },

    _getDiscList() {
      getDiscList().then((res) => {
        this.discList = res.data.list;
      });
    },

    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },

    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`,
      });

      this.setDisc(item);
    },

    ...mapMutations({
      setDisc: "SET_DISC",
    }),
  },

  components: {
    Slider,
    Scroll,
    Loading,
  },
};
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 40%
      overflow: hidden
      .slider-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
