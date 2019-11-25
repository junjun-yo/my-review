import manage from "images/manage.svg";
import { mapState } from "vuex";
import initAll from "../init_all";

export default {
  created() {
    initAll();
    this.$router.push("/");
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.refresh = false;
        this.$nextTick(() => {
          this.refresh = true;
        });
      }
    }
  },
  data() {
    return {
      refresh: true,
      navActive: 0,
      manage,
      // 放大缩小左侧导航
      isCollapse: false,
      siderWidth: 200,
      siderCollapsed: false,
      siderFlag: false,
      curRootMenuIndex: 0,
      curKey: null,
      menuTabs: [
        {
          title: "首页",
          key: "/"
        }
      ],
      curMenuTab: "/",
      menuMap: {},
      curNavKey: undefined
    };
  },
  computed: {
    ...mapState({
      sysUser: state => state.account.sysUser
    }),
    navMenus() {
      let result = [];
      let allMenus = this.$store.state.account.moduleList;

      if (allMenus && allMenus.length > 0) {
        result = allMenus.map(menu => {
          return {
            title: menu.moduleName,
            key: menu.id
          };
        });
        let menuMap = {};
        allMenus.forEach(menu => {
          menuMap[menu.id] = menu.children;
        });
        this.menuMap = menuMap;
      }

      if (result.length > 0) {
        this.loadChildMenu(0, result[0].key);
      }
      return result;
    },
    menus() {
      let menus = this.menuMap[this.curNavKey];
      if (menus && menus.length) {
        return menus;
      } else {
        return [];
      }
    },
    defaultActive() {
      let menu = {};
      let reduceMenus = (nodes, path) => {
        nodes.forEach(element => {
          if (element.children && element.children.length > 0) {
            reduceMenus(element.children, path);
          } else {
            if (element.key == path) {
              menu = element;
            }
          }
          return menu;
        });
      };
      reduceMenus(this.menus, this.$route.fullPath);
      return menu.key;
    }
  },
  methods: {
    loadChildMenu(index, key) {
      this.navActive = index;
      this.curNavKey = key;
    },
    // 左侧导航栏切换
    menuSelect(index, indexPath, node) {
      console.log(arguments);
      let matched = this.menuTabs.filter(item => {
        return item.key == index;
      });
      if (matched && matched.length == 0) {
        console.log(matched);
        this.menuTabs.push({ title: node.$el.innerText, key: index });
      }
      this.$router.push(index);
      this.curMenuTab = index;
    },
    // 缩小左侧导航
    minNav() {
      this.isCollapse = !this.isCollapse;
    },
    toHome() {
      this.$router.push("/");
    },
    // tab切换
    tabClick(node) {
      let menu = this.menuTabs[node.index];
      console.log(menu);
      if (this.$route.fullPath != node.name) {
        this.$router.push(node.name);
      }
    },
    // tab关闭
    tabRemove(name) {
      let tabs = this.menuTabs;
      if (name === this.curMenuTab) {
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].key === name) {
            let nextTab = tabs[i + 1] || tabs[i - 1];
            this.curMenuTab = nextTab.key;
            this.$router.push(this.curMenuTab);
          }
        }
      }

      this.menuTabs = tabs.filter(item => item.key != name);
    },
    logout() {
      this.$confirm("是否注销当前用户?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("account/logout").then(
            () => {
              this.$message({
                type: "success",
                message: "注销成功!"
              });
              this.$router.push("/login");
            },
            err => {}
          );
        })
        .catch(() => {});
    }
  }
};
