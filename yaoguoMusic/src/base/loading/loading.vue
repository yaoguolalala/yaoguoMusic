<!-- loading组件 -->
<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <span class="desc">{{title}}</span>
  </div>
</template>

<script type='text/ecmacscript-6'>
export default {

  props:{
    title:{
      type: String,
      default: "正在载入..."
    }
  }
}

</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
@import "../../common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      vertical-align : top
      line-height: 24px
      font-size: $font-size-small
      color: $color-text-l
</style>