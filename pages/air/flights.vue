<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- data是不会被修改的列表数据 -->
        <!-- setDataList用于修改过滤后的数组列表 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change:切换条数时触发 -->
            <!-- current-change:选择页数时触发 -->
            <!-- current-page:当前页数 -->
            <!-- page-size:当前条数 -->
            <!-- total:总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5,10,15,20]"
              :page-size="pageSize"
              layout="total,sizes,prev,pager,next,jumper"
              :total="flightsData.total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        // 航班总数据
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [],
      pageIndex: 1, //当前页数
      pageSize: 5 //显示条数
    };
  },
  components: {
    FlightsListHead,
    FlightsFilters,
    FlightsItem,
    FlightsAside
  },
  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;

        // 缓存一份新的列表数据数据，这个列表不会被修改
        // 而flightsData会被修改
        this.cacheFlightsData = { ...res.data };
        this.setDataList();
      });
    },

    // 设置dataList数据
    // arr是展示的新数据，该方法将会传递给过滤组件使用
    setDataList(arr) {
      // 如果有新数据从第一页开始显示
      if (arr) {
        this.pageIndex = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }

      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  mounted() {
    this.getData();
  },

  // 监听路由的变化
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>