<template>

  <div class="m-container">
    <Header></Header>

    <div class="block">
      <el-timeline>

        <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4><router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">{{blog.title}}</router-link></h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>
    </div>
  </div>

</template>

<script>
  import Header from "@/components/Header";
  export default {
    name: "Blogs",
    components: {Header},
    data() {
      return {
        hasLogin: false,
        user: {
          username: '请先登录',
          avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        blogs: {},
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      page(currentPage) {
        const _this = this
        this.$axios.get('http://localhost:8081/blogs').then((res) => {
          console.log(res.data.data.records)
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
        })
      }
    },
    mounted () {
      this.page(1);
    }
  }
</script>

<style scoped>
  .m-container {
    width: 960px;
    margin: 0 auto;
  }

  .m-content {
    text-align: center;
  }

  .maction {
    margin: 10px 0;
  }
</style>