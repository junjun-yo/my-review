export default {
  data() {
    return {
      menus: [
        {
          id: 0,
          title: "本单位"
        },
        {
          id: 1,
          title: "所有单位"
        }
      ],
      userTypes: [
        {
          id: 0,
          title: "按部门"
        },
        {
          id: 1,
          title: "按角色"
        },
        {
          id: 2,
          title: "按人员组"
        }
      ],
      curMenu: 0,
      curUserType: 0
    };
  },
  methods: {
    menuClick(menu) {
      this.curMenu = menu.id;
      this.curUserType = 0;
      this.resetAndLoadTreeInfo();
    },
    userTypeClick(userType) {
      this.curUserType = userType.id;
      this.resetAndLoadTreeInfo();
    }
  }
};
