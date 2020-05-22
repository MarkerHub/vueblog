<template>
  <div class="m-container">
    <Header></Header>

    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">

        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="editForm.content"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
  import Header from "@/components/Header";
  export default {
    name: "BlogEdit",
    components: {Header},
    data() {
      return {
        editForm: {
          id: null,
          title: '测试标题',
          description: '测试内容',
          content: '> [更多引入方式点击这里...](/mavonEditor/doc/cn/use.html)\n' +
            '\n' +
            '> [如何获取并设置markdown-it对象...](/mavonEditor/doc/cn/markdown.html)'
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入摘要', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      const _this = this
      if(blogId) {
        this.$axios.get('http://localhost:8081/blog/' + blogId).then((res) => {
          const blog = res.data.data
          _this.editForm.id = blog.id
          _this.editForm.title = blog.title
          _this.editForm.description = blog.description
          _this.editForm.content = blog.content

        });
      }
    },
    methods: {
      submitForm() {

        const _this = this
        this.$refs.editForm.validate((valid) => {
          if (valid) {

            this.$axios.post('http://localhost:8081/blog/edit', this.editForm, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            }).then((res) => {
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/blogs")
                }
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
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
    margin-bottom: 20px;
  }

</style>