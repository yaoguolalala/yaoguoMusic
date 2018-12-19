<!--搜索结果-->
<template>
  <scroll class="suggest" 
          :data='result' 
          :pullup="pullup"
          @scrollToEnd="searchMore"
          ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore &&!result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type='text/ecmacscript-6'>
import {search} from '../../api/search'
import { ERR_OK } from '../../api/config'
import {createSong,} from '../../common/js/song'
import {getMusic} from '../../api/singer.js'
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'
import Singer from '../../common/js/singer'
import {mapMutations,mapActions} from 'vuex'
import NoResult from '../../base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20
let   VKEY = ''

export default {
  props:{
    query:{
      type: String,
      default: ''
    },
    showSinger:{
      type:Boolean,
      default: true
    }
  },
  data() {
    return {
      pullup: true,
      page: 1,
      result:[],
      hasMore: true,
      vkeySwich: []
    }
  },
  components:{
    Scroll,
    Loading,
    NoResult
  },
  methods:{
    _search(){
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0,0)
      search(this.query,this.page,this.showSinger,perpage).then((res) => {
        if(res.code === ERR_OK ){
          this._genResult(res.data).then((s) => {
            this.result = s
            this.checkMore(res.data) 
          })
        }
      })
    },
    searchMore(){
      if(!this.hasMore){
        return 
      }
      this.page++
        search(this.query,this.page,this.showSinger,perpage).then((res) => {
           if(res.code === ERR_OK ){
            this._genResult(res.data).then((s) => {
            this.result = this.result.concat(s)
            this.checkMore(res.data) 
          })
        }
        })
    },
    selectItem(item){
      if(item.type === TYPE_SINGER){
        const singer = new Singer ({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}` 
        })
        this.setSinger(singer)
      }else{
        //console.log(item)
        this.insertSong(item)
      }
      this.$emit('select')
    },
    refresh(){
      this.$refs.suggest.refresh()
    },
    checkMore(data){
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage)> song.total){
        this.hasMore = false
      }
    },
    getIconCls(item){
      if (item.type === TYPE_SINGER){
        return 'icon-mine'
      }else{
        return 'icon-music'
      }
    },
    getDisplayName(item){
      if(item.type === TYPE_SINGER){
        return item.singername
      }else{
        return `${item.name}-${item.singer}`
      }
    },
    _genResult(data){
      return this.returnDet(data)
    },
    
    detail(data,arr1,arr2){
      arr1 = this._nomallizeSongs(data.list)
      return new Promise(function(resolve) {
        setTimeout(function() {
          arr2 = arr2.concat(arr1);
          resolve(arr2);
        }, 600);
      });
    },
    async returnDet(data){
      let ret = []
      let brige = []
      if(data.zhida && data.zhida.singerid){
        ret.push({...data.zhida,...{type: TYPE_SINGER}})
      }
      if(data.song){
        ret = this.detail(data.song,brige,ret)
        return ret
      }
    },
    _nomallizeSongs(list){
      let ret = []
      list.forEach((musicData) => {
        if(musicData.songid && musicData.albumid){
          let _songVkey = ''
          getMusic(musicData.songmid).then((res) => {
            if(res.code === ERR_OK) {
              const vKeyOther = res.req_0.data.midurlinfo
              const songVkey = vKeyOther[0].vkey
              _songVkey = songVkey
            }
            ret.push(createSong(musicData,_songVkey))
          })
          //console.log('aaaa'+_songVkey)
          //ret.push(createSong(musicData,_songVkey)) 
        }
      })
      return ret 
    },
    sleep(delay) {
      var start = (new Date()).getTime();
      while ((new Date()).getTime() - start < delay) {
      continue;
    }
  },

    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch:{
    query(){
      this._search()
    }
  }

}

</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>