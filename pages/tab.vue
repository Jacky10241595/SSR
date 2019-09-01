<template>
    <div style="padding:50px; margin-bottom:20px;">
        <div class="tabs">
            <span
            v-for="(item,index) in ['体育','新闻','娱乐']"
            :key="index"
            @click="handleClick(index)"
            :class="{active:current===index}"
            >{{item}}</span>
        </div>
        <div v-show="current===0">
            <ul>
                <li>体育</li>
                <li>体育</li>
                <li>体育</li>
            </ul>
        </div>
        <div v-show="current===1">
            <ul>
                <li>新闻</li>
                <li>新闻</li>
                <li>新闻</li>
            </ul>
        </div>
        <div v-show="current===2">
            <ul>
                <li>娱乐</li>
                <li>娱乐</li>
                <li>娱乐</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 当前(起始)状态
            current:0
        }
    },
    methods:{
        handleClick(index){
            // 事件点击时修改current
            this.current=index
        }
    }
}
</script>
<style lang="less" scoped>
    .tabs{
        margin-bottom:20px;

        span{
            cursor: pointer;
        }
    }

    .active{
        color:hotpink;
    }
</style>