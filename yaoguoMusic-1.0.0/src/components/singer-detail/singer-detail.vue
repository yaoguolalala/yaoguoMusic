<!-- 歌手详情页 -->
<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImg" :songs="songs"></music-list>
  </transition>
</template>
<script type='text/ecmacscript-6'>
import {mapGetters} from 'vuex'
import { getSingerDetail , getMusic} from '../../api/singer.js'
import {ERR_OK} from '../../api/config'
import {createSong} from '../../common/js/song.js'
import MusicList from '../music-list/music-list'

export default {
  data () {
    return {
      songs:[]
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title(){
      return this.singer.name
    },
    bgImg(){
      return this.singer.avatar
  }
  },
  components:{
    MusicList
  },
  created(){
    this._getDetail();
  },
  methods:{
    _getDetail(){
      if(!this.singer.id){
        this.$router.back()
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK){
          //console.log(res.data.list)
          this.songs = this._normalizeSong(res.data.list)
        }
      });
    },
    _normalizeSong(list){
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumname){
            getMusic(musicData.songmid).then((res) => {
              if(res.code === ERR_OK) {
                const vKeyOther = res.req_0.data.midurlinfo
                const songVkey = vKeyOther[0].vkey
                ret.push(createSong(musicData,songVkey))
              }
            })
        }
      })
      return ret
    }
  }

}

</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
  @import '../../common/stylus/variable.styl'
  
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>