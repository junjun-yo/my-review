<template>
  <div class="app-frame">
    <aside class="aside">
      <div class="manage">
        <div class="manage-photo">
          <img :src="manage" />
        </div>
        <div class="manage-info">
          <p>{{sysUser.userName}}-办公室</p>
        </div>
      </div>
      <div class="inner-aside">
        <div class="aside-nav">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#263238"
            text-color="#fff"
            @select="menuSelect"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <template v-for="(menu,index) in menus">
              <el-submenu :index="`${index}`" v-if="menu.children && menu.children.length>0">
                <template slot="title">
                  <i :class="menu.moduleImage" v-if="menu.moduleImage"></i>
                  <span slot="title">{{menu.moduleName}}</span>
                </template>
                <el-menu-item
                  :index="child.moduleUrl || child.id"
                  v-for="(child,j) in menu.children"
                  :key="j"
                >{{child.moduleName}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="menu.moduleUrl || menu.id" v-else>
                <template v-show="menu.moduleImage">
                  <i :class="menu.moduleImage"></i>
                </template>
                <span slot="title">{{menu.moduleName}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
    </aside>
    <main>
      <header class="clearfix">
        <div class="h-left">
          <i class="el-icon-s-fold header-btn" @click="minNav"></i>
          <nav>
            <ul>
              <li
                v-for="(item,index) in navMenus"
                :class="{active: navActive==index}"
                @click="loadChildMenu(index,item.key)"
              >{{item.title}}</li>
            </ul>
          </nav>
        </div>
        <div class="h-right">
          <div class="right-btn el-icon-plus" title="新建"></div>
          <div class="right-btn el-icon-s-home" title="主页" @click="toHome"></div>
          <div class="right-btn el-icon-message-solid" title="消息提醒"></div>
          <div class="right-btn el-icon-menu" title="门户切换"></div>
          <div class="right-btn el-icon-s-tools" title="系统配置"></div>
          <div class="right-btn el-icon-switch-button" title="注销" @click="logout"></div>
        </div>
      </header>

      <div style="width: 100%; height: 100%; padding-top: 50px;">
        <div class="sys-tabs">
          <el-tabs type="card" v-model="curMenuTab" @tab-click="tabClick" @tab-remove="tabRemove">
            <el-tab-pane
              :closable="item.key != '/'"
              v-for="(item, index) in menuTabs"
              :key="item.key"
              :label="item.title"
              :name="item.key"
            >{{item.content}}</el-tab-pane>
          </el-tabs>
        </div>
        <div style="height:calc(100% - 40px)">
          <router-view></router-view>
        </div>
      </div>
    </main>
    <footer>
      <div>在线人员</div>
    </footer>
  </div>
</template>

<script>
import manage from "images/manage.svg";
import { mapState } from "vuex";
import initAll from "./init_all";

export default {
  created() {
    initAll();
    this.$router.push("/");
  },
  data() {
    return {
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
      let matched = this.menuTabs.filter(item => {
        return item.key == index;
      });
      if (matched && matched.length == 0) {
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
</script>


<style lang="scss">
$skin-blue: #0099e0;
$skin-blue-btn: #0b7fb4;
$black-color: #263238;
.router-link-active {
  text-decoration: none;
}

.el-menu-vertical-demo {
  .el-submenu__title {
    @media screen and (max-width: 1400px) {
      height: 46px;
      line-height: 46px;
    }
    @media screen and (min-width: 1400px) {
      height: 56px;
      line-height: 56px;
    }
    .acitve {
      background-color: $skin-blue;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-menu-item {
    @media screen and (max-width: 1400px) {
      width: 176px;
      min-width: 176px;
    }
    @media screen and (min-width: 1400px) {
      width: 216px;
    }
  }
  .el-menu-item.is-active {
    color: $skin-blue;
  }
  .el-menu--inline {
    li {
      background-color: #1d272c !important;
    }
  }
  li {
    @media screen and (max-width: 1400px) {
      width: 176px;
    }
    @media screen and (min-width: 1400px) {
      width: 216px;
    }
  }
}

.app-frame {
  width: 100%;
  height: 100%;
  aside.aside {
    @media screen and (max-width: 1400px) {
      width: 180px;
    }
    @media screen and (min-width: 1400px) {
      width: 220px;
    }
    height: 100%;
    overflow-y: auto;
    background-color: $black-color;
    float: left;
    position: fixed;
    /* 管理员块 */
    .manage {
      height: 50px;
      background-color: #0b7fb4;
      position: relative;
      .manage-photo {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        img {
          height: 38px;
        }
      }
      .manage-info {
        line-height: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 60px;
        color: #fff;
        p {
          font-weight: bolder;
        }
      }
    }
    .inner-aside {
      @media screen and (max-width: 1400px) {
        width: 176px;
      }
      @media screen and (min-width: 1400px) {
        width: 216px;
      }
    }
  }

  main {
    @media screen and (max-width: 1400px) {
      padding: 0 0 0 180px;
    }
    @media screen and (min-width: 1400px) {
      padding: 0 0 0 220px;
    }

    min-width: 1000px;
    height: 100%;
    header {
      width: 100%;
      height: 50px;
      background-color: $skin-blue;
      color: #fff;
      position: fixed;
      .h-left {
        height: 100%;
        display: inline-flex;
        align-items: center;
        float: left;
        i.header-btn {
          width: 0.6rem;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 28px;
        }
        nav {
          ul li {
            @media screen and (max-width: 1400px) {
              font-size: 12px;
            }
            @media screen and (min-width: 1400px) {
              font-size: 16px;
            }
            width: 1rem;
            height: 50px;
            line-height: 50px;
            text-align: center;
            float: left;
            cursor: pointer;
            &:hover {
              background-color: $skin-blue-btn;
            }
            &.active {
              background-color: $skin-blue-btn;
            }
          }
        }
      }
      .h-right {
        height: 100%;
        display: inline-flex;
        align-items: center;
        float: right;
        margin-right: 2.5rem;
        div {
          width: 0.5rem;
          height: 50px;
          font-size: 0.22rem;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          &:hover {
            background-color: $skin-blue-btn;
          }
        }
      }
    }
  }
}
</style>