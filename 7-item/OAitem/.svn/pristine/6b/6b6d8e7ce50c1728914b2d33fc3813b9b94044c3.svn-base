import FileUpload from "@/components/FileUpload";
export default {
  methods: {
    $upload({ limit, props, limitType, confirm, limitSize, click }) {
      this.$open({
        title: "文件上传",
        width: "700px",
        props: {
          limit: limit,
          props: props,
          limitType: limitType,
          limitSize: limitSize,
          click: click
        },
        component: FileUpload,
        confirm: data => {
          confirm && confirm(data);
        }
      });
    }
  }
};
