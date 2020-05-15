<template>

  <div class="m-container">
    <div class="m-content">

      <h3>欢迎来到MarkerHub的博客</h3>
      <div class="block">
        <el-avatar :size="50" :src="user.avatar"></el-avatar>
        <div>{{ user.username }}</div>
      </div>
    </div>

    <div class="block">
      <el-timeline>

        <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>{{blog.title}}</h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Blogs",
    data() {
      return {
        user: {
          username: null,
          avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        blogs: {},
        currentPage: 1,
        total: 0
      }
    },
    mounted() {

    },
    methods: {
      page (currentPage) {
        const _this = this
        this.$axios.get('http://localhost:8081/blogs', {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then((res)=>{
          console.log(res.data.data.records)
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
        })
      }
    },
    created() {
      this.page(1);

      // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

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
</style>