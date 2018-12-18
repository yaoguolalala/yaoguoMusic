<!--歌单详情页 -->
<template>
<transition name="slide">    
  <music-list  :songs="songs" :title='title' :bg-image="bgImage"></music-list>
</transition>
</template>

<script type='text/ecmacscript-6'>
import MusicList from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js' 
import {createSong,get} from '../../common/js/song.js'
import {getMusic} from '../../api/singer.js'


export default {
  computed:{
    title(){
      return this.disc.dissname
    },
    bgImage(){
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data () {
    return {
      songs:[]
    };
  },
  created(){
    this._getSongList()
  },
  methods:{
    _getSongList(){
      if(!this.disc.dissid){
        this.$router.push('/recommend')
        return 
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._nomallizeSongs(res.cdlist[0].songlist)
        }
        
      })
    },
    _nomallizeSongs(list){
      let ret = []
      list.forEach((musicData) => {
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
  },
  components:{
    MusicList
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