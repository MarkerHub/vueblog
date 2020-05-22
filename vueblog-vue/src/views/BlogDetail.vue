<template>
  <div class="m-container">
    <Header></Header>

    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog"><router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link></el-link>
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
        blog: {
          userId: null,
          title: "",
          description: "",
          content: ""
        },
        ownBlog: false
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

          _this.ownBlog =  true
        });
      }
    },
    created() {
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
  .m-button {
    /*float: right;*/
  }

</style>