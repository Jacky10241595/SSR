<template>
  <!-- 机票搜索表单组件 -->
  <div class="search-form">
    <!-- 头部tab栏切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(item,index)"
        :class="{active:index===currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions:获取搜索建议,且显示在输入框的下拉框中;  select:点击选中建议项时触发-->
        <!-- v-model:双向绑定数据到form -->
        <el-autocomplete
          placeholder="请搜索出发城市"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          class="el-autocomplete"
          @blur="handleDepartBlur"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          placeholder="请搜索到达城市"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          class="el-autocomplete"
          @blur="handleDestBlur"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change:用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width:100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      // 新增变量存储表单数据(5个参数)
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期
      },
      departData: [], // 存储后台返回的出发城市数组
      destData: [] // 存储后台返回的到达城市数组
    };
  },
  methods: {
    //tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("暂不支持往返", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框失去焦点时触发
    handleDepartBlur() {
      this.form.departCity = this.departData[0] ? this.departData[0].value : "";
      this.form.departCode = this.departData[0] ? this.departData[0].sort : "";
    },
    // 到达城市输入框失去焦点时触发
    handleDestBlur() {
      this.form.destCity = this.destData[0] ? this.destData[0].value : "";
      this.form.destCode = this.destData[0] ? this.destData[0].sort : "";
    },

    // 出发城市输入框获得焦点时触发
    // value:选中的值; cb:回调函数,接收要展示的列表
    async queryDepartSearch(value, cb) {
      const arr = await this.querySearchAsync(value);
      if (arr.length > 0) {
        // 把转换后的数组赋值给data
        this.departData = arr;
      }
      cb(arr);
    },

    // 到达城市输入框获得焦点时触发
    async queryDestSearch(value, cb) {
      const arr = await this.querySearchAsync(value);
      if (arr.length > 0) {
        // 把转换后的数组赋值给data
        this.destData = arr;
      }
      cb(arr);
    },

    // 查询城市接口的方法,返回promise; queryString是查询关键字
    querySearchAsync(queryString) {
      return new Promise((resolve, reject) => {
        // 如果关键字为空,直接返回
        if (!queryString) {
          return resolve([]);
        }
        // 根据用户的输入请求建议城市
        this.$axios({
          url: `/airs/city`,
          params: {
            name: queryString
          }
        }).then(res => {
          const { data } = res.data;
          //下拉提示列表必须有value字段
          const arr = data.map(v => {
            return {
              ...v,
              value: v.name.replace("市", "")
            };
          });
          resolve(arr);
        });
      });
    },

    // 针对城市下拉框选项选中的事件处理，我们应该把选中的选项当做是当前的数据
    // 出发城市下拉选择时触发
    // item代表当前选中项
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 到达城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format(`YYYY-MM-DD`);
    },

    // 出发与目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      // 交叉赋值
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单时触发
    handleSubmit() {
      // 表单验证数据
      const rules = {
        depart: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        dest: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发时间"
        }
      };
      let valid = true; // 表单验证结果
      Object.keys(rules).forEach(v => {
        // 只要有一个结果不通过,就停止循环
        if (!valid) return;
        const item = rules[v];

        //数据字段为空
        if (!item.value) {
          valid = false;
          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });

      //不通过验证,终止执行
      if (!valid) return;

      // 添加到本地存储
      const airs = JSON.parse(localStorage.getItem("airs") || `[]`);
      airs.push(this.form);
      localStorage.setItem("airs", JSON.stringify(airs));

      // 跳转到机票首页
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>