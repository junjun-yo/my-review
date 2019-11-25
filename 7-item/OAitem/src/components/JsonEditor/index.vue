<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/mode/javascript/javascript";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    lang: String,
    readonly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      jsonEditor: false
    };
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        this.jsonEditor.setValue(this.value);
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      theme: "rubyblue",
      mode: "application/json",
      gutters: ["CodeMirror-lint-markers"],
      lint: false,
      readOnly: this.readonly
    });
    this.jsonEditor.setValue(this.value);
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue();
    }
  }
};
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: 100%;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>