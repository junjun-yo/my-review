<template>
  <div class="addressBook">
    <el-card class="box-card">
      <div class="txl_btn">
        <!-- 当点击不同属性的按钮时，获取不同属性的数据，赋值给addressBook_data -->
        <el-button type="primary" plain size="medium" icon="el-icon-notebook-1">单位通讯录</el-button>
        <el-button type="primary" plain size="medium" icon="el-icon-notebook-2">个人通讯录</el-button>
        <el-button type="primary" plain size="medium" icon="el-icon-user">公共通讯录</el-button>
        <!-- 点击通讯录管理的时候弹出修改通讯录的弹框 -->
        <el-button icon="el-icon-sort" @click="showTableOrCard">切换视图</el-button>
      </div>
      <el-row :gutter="20">
        <!-- 按钮区域 -->
        <el-col :span="14" class="btn_area">
          <el-button type="primary" @click="add_DialogVisible=true">新建</el-button>
          <el-button type="primary">修改</el-button>
          <el-button type="primary">内部邮件</el-button>
          <el-button type="primary">电子邮件</el-button>
          <el-button type="primary">手机短信</el-button>
          <el-button type="primary">导出</el-button>
        </el-col>
        <!-- 查询模块 -->
        <el-col :span="6">
          <el-input placeholder="请输入姓名或电话" clearable></el-input>
        </el-col>
        <!-- 点击按钮时，根据输入框的值，传到后台获取数据 -->
        <el-col :span="3">
          <el-button type="primary" @click="getAddressBook_data">查询</el-button>
        </el-col>
      </el-row>
      <!-- 根据字母索引 -->
      <ul class="letter">
        <li
          v-for="(item,index) in letter"
          :key="index"
          @click="choose_letter(item,index)"
          :class="{active:index==isActive}"
        >{{item}}</li>
      </ul>
      <!-- 通讯录数据渲染模块 -->
      <el-table :data="addressBook_data" style="width: 100%" ref="multipleTable" v-show="showTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="130" sortable></el-table-column>
        <el-table-column prop="telephone" label="手机" width="210"></el-table-column>
        <el-table-column prop="phonecall" label="电话" width="210"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="210"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <!-- 通讯录操作模块，进行修改和删除数据，可以根据角色来显示是否展示 -->
        <!-- 表格展示 -->
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="setting_DialogVisible=true"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 卡片视图展示 -->
      <el-card
        class="box-card show_card"
        v-for="(item,index) in addressBook_data"
        :key="index"
        style="width:350px"
        v-show="showCard"
      >
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
        </div>
        <div>手机号：{{item.telephone}}</div>
        <div>电话：{{item.phonecall}}</div>
        <div>邮箱：{{item.email}}</div>
        <div>部门：{{item.department}}</div>
      </el-card>
    </el-card>
    <!-- 通讯录修改的弹框 -->
    <el-dialog title="通讯录修改" :visible.sync="setting_DialogVisible">
      <el-form>
        <el-form-item label="姓名" label-width="80px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setting_DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setting_DialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建录入信息的弹框 -->
    <el-dialog
      title="录入信息"
      :visible.sync="add_DialogVisible"
      width="50%"
      :before-close="handleClose"
      class="add_Dialog" 
    >
      <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px" class="add_Dialog_form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="vo.name" autocomplete="off" maxlength="30" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="称呼" prop="salutation">
          <el-input v-model="vo.salutation" autocomplete="off" maxlength="30" placeholder="请输入称呼"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="untiName">
          <el-input v-model="vo.untiName" autocomplete="off" maxlength="100" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="vo.deptName" autocomplete="off" maxlength="30" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="个人手机电话" prop="personPhone">
          <el-input
            v-model="vo.personPhone"
            autocomplete="off"
            maxlength="11"
            placeholder="请输入个人手机电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="vo.phone" autocomplete="off" maxlength="11" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" prop="telephone">
          <el-input v-model="vo.telephone" autocomplete="off" maxlength="11" placeholder="请输入办公电话"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱" prop="personMail">
          <el-input v-model="vo.personMail" autocomplete="off" maxlength="20" placeholder="请输入个人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="商务邮件" prop="businessMail">
          <el-input
            v-model="vo.businessMail"
            autocomplete="off"
            maxlength="20"
            placeholder="请输入商务邮件"
          ></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="vo.fax" autocomplete="off" maxlength="20" placeholder="请输入传真"></el-input>
        </el-form-item>
        <el-form-item label="其它电话" prop="otherPhone">
          <el-input v-model="vo.otherPhone" autocomplete="off" maxlength="11" placeholder="请输入其它电话"></el-input>
        </el-form-item>
        <el-form-item label="其他邮件" prop="otherMail">
          <el-input v-model="vo.otherMail" autocomplete="off" maxlength="20" placeholder="请输入其他邮件"></el-input>
        </el-form-item>
        <el-form-item label="商务地址" prop="businessAddress">
          <el-input
            v-model="vo.businessAddress"
            autocomplete="off"
            maxlength="50"
            placeholder="请输入商务地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="商务邮编" prop="businessPostcode">
          <el-input
            v-model="vo.businessPostcode"
            autocomplete="off"
            maxlength="10"
            placeholder="请输入商务邮编"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人邮编" prop="personPostcode">
          <el-input
            v-model="vo.personPostcode"
            autocomplete="off"
            maxlength="10"
            placeholder="请输入个人邮编"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人地址" prop="personAddress">
          <el-input
            v-model="vo.personAddress"
            autocomplete="off"
            maxlength="40"
            placeholder="请输入个人地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司网站" prop="companyWeb">
          <el-input v-model="vo.companyWeb" autocomplete="off" maxlength="20" placeholder="请输入公司网站"></el-input>
        </el-form-item>
        <el-form-item label="个人网站" prop="personWeb">
          <el-input v-model="vo.personWeb" autocomplete="off" maxlength="20" placeholder="请输入个人网站"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <oa-date v-model="vo.birthday"/>
        </el-form-item>
        <el-form-item label="创建人" prop="creatorId">
          <el-input v-model="vo.creatorId" autocomplete="off" maxlength="32" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <el-form-item label="首字母拼音" prop="firstLetter">
          <el-input
            v-model="vo.firstLetter"
            autocomplete="off"
            maxlength="2"
            placeholder="请输入首字母拼音"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="vo.note" autocomplete="off" maxlength="100" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="区分公共和个人" prop="addressType">
          <oa-select
            v-model="vo.addressType"
            placeholder="请选择区分公共和个人"
            :options="optAddressType"
            code="address"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="margin-right:280px">
        <el-button type="primary" @click="add_DialogVisible = false">保 存</el-button>
        <el-button @click="add_DialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      addressBook_data: [
        {
          id: 1,
          name: "张三",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 2,
          name: "李四",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 3,
          name: "王五",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 4,
          name: "赵六",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 5,
          name: "张三",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 6,
          name: "李四",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 7,
          name: "王五",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        },
        {
          id: 8,
          name: "赵六",
          telephone: "15926244573",
          phonecall: "027-888800000",
          email: "12345@163.com",
          department: "研发部"
        }
      ],
      setting_DialogVisible: false,
      add_DialogVisible: false,
      letter: [
        "全部",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      isActive: 0,
      showTable: true,
      showCard: false,
      vo: {},
      loading: false,
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 30, message: "长度请小于30", trigger: "blur" }
        ],
        salutation: [{ max: 30, message: "长度请小于30", trigger: "blur" }],
        untiName: [{ max: 100, message: "长度请小于100", trigger: "blur" }],
        deptName: [{ max: 30, message: "长度请小于30", trigger: "blur" }],
        personPhone: [{ max: 11, message: "长度请小于11", trigger: "blur" }],
        phone: [{ max: 11, message: "长度请小于11", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入办公电话", trigger: "blur" },
          { max: 11, message: "长度请小于11", trigger: "blur" }
        ],
        personMail: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        businessMail: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        fax: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        otherPhone: [{ max: 11, message: "长度请小于11", trigger: "blur" }],
        otherMail: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        businessAddress: [
          { max: 50, message: "长度请小于50", trigger: "blur" }
        ],
        businessPostcode: [
          { max: 10, message: "长度请小于10", trigger: "blur" }
        ],
        personPostcode: [{ max: 10, message: "长度请小于10", trigger: "blur" }],
        personAddress: [{ max: 40, message: "长度请小于40", trigger: "blur" }],
        companyWeb: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        personWeb: [{ max: 20, message: "长度请小于20", trigger: "blur" }],
        birthday: [],
        creatorId: [{ max: 32, message: "长度请小于32", trigger: "blur" }],
        firstLetter: [{ max: 2, message: "长度请小于2", trigger: "blur" }],
        note: [{ max: 100, message: "长度请小于100", trigger: "blur" }],
        addressType: [
          { required: true, message: "请输入区分公共和个人", trigger: "blur" }
        ]
      },
      optAddressType: []
    };
  },
  methods: {
    choose_letter(params, index) {
      // alert(params,index);
      this.isActive = index;
    },
    showTableOrCard() {
      this.showTable = !this.showTable;
      this.showCard = !this.showCard;
    },
    confirm(done, fail) {
      this.$refs.voForm.validate(valid => {
        if (valid) {
          Ajax.put("/addressBook/save", this.vo, "json").then(
            res => {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              done();
            },
            err => {
              fail();
            }
          );
        } else {
          fail();
        }
      });
    },
    initForm() {
      if (this.id) {
        this.loading = true;
        Ajax.get("/addressBook/get", {
          id: this.id
        }).then(res => {
          this.vo = res.data;
          this.loading = false;
        });
      }
    }
  },
  created() {
    this.initForm();
  }
};
</script>

<style lang="scss" scoped>
.addressBook {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  .txl_btn {
    margin: 5px 0 20px 0px;
  }
  .btn_area {
    .el-button {
      height: 30px;
      font-size: 14px;
    }
  }
  .letter {
    li {
      float: left;
      margin: 15px 20px 10px 0;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
  }
  .active {
    font-weight: 700;
  }
  .show_card {
    float: left;
    margin: 10px 20px 20px 0;
    div {
      color: #666;
      margin-bottom: 5px;
    }
  }
  .add_Dialog {
    .add_Dialog_form {
      overflow: hidden;
      .el-form-item {
        float: left;
        width: 320px; 
        
      }
    }
  }

}
</style>
