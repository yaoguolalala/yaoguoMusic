<!--排行榜详情页-->
<template>
  <transition name="slide">
    <music-list :songs="songs" :rank="rank" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type='text/ecmacscript-6'>
import MusicList from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from "../../api/rank"
import { ERR_OK } from "../../api/config"
import {createSong} from '../../common/js/song'
import {getMusic} from '../../api/singer.js'

export default {
  components:{
    MusicList
  },
  data () {
    return {
      songs:[],
      rank: true
    };
  },
  created(){
    this._getMusicList()
  },
  computed:{
    title(){
      return this.topList.topTitle
    },
    bgImage(){
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods:{
    _getMusicList(){
      if (!this.topList.id){
        this.$router.push('/rank')
        return 
      }
      getMusicList(this.topList.id).then((res) => {
        console.log(res)
        if(res.code === ERR_OK){
          console.log(res.songlist)
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if(musicData.songid && musicData.albumid){
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