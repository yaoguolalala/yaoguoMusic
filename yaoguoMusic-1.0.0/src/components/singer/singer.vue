<!-- 歌手界面 -->
<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view> 
    <router-view/>   
  </div>
</template>

<script type='text/ecmacscript-6'>
import {getSingerLists} from '../../api/singer.js'
import {ERR_OK} from '../../api/config'
import Singer from '../../common/js/singer.js'
import ListView from '../../base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from '../../common/js/mixin'

const hotName = '热门'
const hotSingerLen = 10
export default {
  mixins:[playlistMixin],
  components:{
    ListView
  },
  data(){
    return{
        singers: [],
    }
  },
  created(){
    this._getSingerList();
  },
  methods:{
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ? "60px": ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer){
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList(){
      getSingerLists().then((res) => {
        if (res.code === ERR_OK){
           this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
        let map = {
          hot: {
            title: hotName,
            items: []
          }
        }
        list.forEach((item,index) => {
          if (index < hotSingerLen){
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]){
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name:  item.Fsinger_name,
          }))
        });
        //为了得到有序列表，我们需要处理map
        console.log(map)
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title === hotName){
            hot.push(val)
          }
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}

</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>