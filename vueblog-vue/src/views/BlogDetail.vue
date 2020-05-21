<template>
  <div class="m-container">
    <Header></Header>

    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-divider></el-divider>
      <div class="content markdown-body" v-html="blog.content"></div>
    </div>


  </div>
</template>

<script>

  import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
  import Header from "@/components/Header";

  export default {
    name: "BlogDetail",
    components: {
      Header
    },
    data() {
      return {
        user: {
          username: null,
          avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        },
        blog: {
          title: "这是标题",
          description: "这是再要",
          content: "这是内容呀"

        }
      }
    },
    methods: {
      getBlog() {
        const blogId = this.$route.params.blogId
        const _this = this
        this.$axios.get('http://localhost:8081/blog/' + blogId).then((res) => {
          console.log(res)
          console.log(res.data.data)
          _this.blog = res.data.data

          var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
          var result = md.render(_this.blog.content);
          _this.blog.content = result

        });
      }
    },
    created() {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

      this.getBlog()
    }
  }
</script>

<style scoped>
  .m-container {
    max-width: 960px;
    margin: 0 auto;
  }

  .m-content {
    text-align: center;
    margin-bottom: 10px;
  }

  .mblog {
    width: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px 15px;
    min-height: 700px;
  }
</style>