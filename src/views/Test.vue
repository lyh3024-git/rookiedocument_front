<template>
  <div class="editor-container">
    <div id="editorElem" ref="editorForm" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editorcomponment",
  prop: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorContent: "",
      editor: null,
    };
  },
  watch: {
    content() {
      this.editor.txt.html(this.content);
    },
  },
  methods: {
    getContent: function () {
      alert(this.editorContent);
    },
  },
  mounted() {
    this.editor = new E(this.$refs.editorForm);
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html;
      this.$emit("editorContent", html);
    };

    this.editor.customConfig.zIndex = 100;
    this.editor.customConfig.pasteFilterStyle = false;
    this.editor.customConfig.pasteTextHandle = function (content) {
      return (
        "<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以下内容来源于网络,或者复制过来</p>" +
        content +
        "<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以上内容来源于网络,或者复制过来</p>"
      );
    };
    this.editor.customConfig.linkImgCallback = function (url) {
      console.log(url);
    };
    this.editor.customConfig.linkCheck = function (text, link) {
      console.log(text);
      console.log(link);
      return true;
    };
    this.editor.customConfig.colors = [
      "#000000",
      "#eeece0",
      "#1c487f",
      "#4d80bf",
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#ffffff",
    ];
    this.editor.customConfig.fontNames = [
      "宋体",
      "微软雅黑",
      "Arial",
    ];
    this.editor.customConfig.showLinkImg = false;
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.create();
    this.editor.txt.html(this.content);
  },
};
</script>
<style >
/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

ul,
ol {
  margin: 10px 0 10px 20px;
}

.editor-container {
  align-items: center;
  padding: 0px 0 30px 0;

}
</style>
