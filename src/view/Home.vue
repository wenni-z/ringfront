<template>
  <div class="main" ref="container" @scroll="handleScroll">
    <div class="tone-video">
      <img class="rule-btn" src="../assets/images/btn-rule.png" @click="GO_Position1" />

      <div style="min-height: 178px; background: rgb(251, 148, 107)">
        <div class="gunDong1">
          <img src="../assets/images/volume.png" alt="" />
          <div class="_gd">
            <div class="_dH">
              恭喜152****2812机主开通成功，恭喜133****8102机主开通成功，恭喜182****3356机主开通成功，恭喜190****7448机主开通成功，恭喜128****1751机主开通成功，恭喜140****3671机主开通成功，恭喜126****4659机主开通成功，恭喜189****408机主开通成功，恭喜186****3480机主开通成功，恭喜162****8471机主开通成功，恭喜175****7175机主开通成功，恭喜162****9815机主开通成功，恭喜188****6129机主开通成功，恭喜186****7240机主开通成功，恭喜141****1801机主开通成功，恭喜163****586机主开通成功，恭喜131****2875机主开通成功，恭喜123****0914机主开通成功，恭喜148****8512机主开通成功，恭喜187****3936机主开通成功，恭喜145****6273机主开通成功
            </div>
          </div>
        </div>
        <div class="l_sticky" style="z-index: 90">
          <div class="l_sticky2">
            <div class="input-wrap">
              <div class="input-box">
                <div class="_shou">
                  <img src="../assets/images/point-down.png" alt="" />
                  <div style="font-size: 12px; color: rgb(112, 16, 255)">
                    第一步：输入手机号
                  </div>
                </div>
                <div>
                  <input
                    placeholder="请输入您的手机号"
                    maxlength="11"
                    type="number"
                    v-model="mobile"
                  />
                </div>
                <div class="codeBox" v-if="showVailCode">
                  <!-- <div class="codeBox"> -->
                  <input
                    type="number"
                    placeholder="请输入验证码"
                    maxlength="6"
                    style="margin-top: 12px"
                    v-model="code"
                  />
                  <span
                    class="get-code-btn"
                    :class="[!btnVailCode ? 'get-code-btn' : 'btn-disabled']"
                    :disabled="btnVailCode"
                    @click="requestCode"
                  >
                    {{ btnVailCode ? timeVailCode + "秒后获取" : "获取验证码" }}
                  </span>
                </div>
              </div>
              <div class="log_btn_box">
                <div>
                  <!-- <div class="get-btn" @click="onBuy"></div> -->
                  <div class="get-btn" @click="verifyCodeAndOrder"></div>
                  <div class="icon-hand floating"></div>
                </div>
              </div>
            </div>
            <div class="charges">
              <div style="display: flex">
                <div>
                  <input class="van-checkbox__icon" type="checkbox" v-model="agree" />
                </div>
                <div style="margin-left: 0.2rem; text-align: left">
                  <span style="color: rgb(243, 148, 64)">
                    我已仔细阅读并同意
                    <i
                      class="protocol"
                      style="color: rgb(243, 55, 55)"
                      @click="showProtocol = true"
                      >《用户隐私协议》</i
                    >
                    ，参与订购“企业视频彩铃内容包（基础版）”，资费：10元/月；话费支付，按自然月续费，可随时取消；为了确保用户享受视频彩铃权益，若用户订购后未设置视频彩铃，系统默认彩铃。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Position0" class="addBottomText" style="line-height: 2">
        <div class="addBottomText1">
          <div class="help_title">业务说明</div>
          <div class="help_txt">
            1、产品资费本产品为连续包月产品，月租费用10元/月(具体以页面、验证码短信中资费为准)；<br />
            2、订购企业视频彩铃内容包（基础版）后，即可定制和更换企业视频彩铃，不限设置次数；如需更换彩铃，可联系客服4006163810进行指定视频彩铃的更换；<br />
            3、可开通用户为移动用户，电信和联通用户暂不支持办理业务，企业视频彩铃功能由运营商提供，如需取消您自己手机回复2到10658831或者拨打10086、12530进行退订。<br />
            4、温馨提示：<br />
            （1）订购和退订均立即生效，如未退订次月自动续订并收费；<br />
            （2）别人给您打电话时视频播放免流量费；<br />
            （3）给您拨打电话的朋友手机需打开VoLTE功能，且使用支持视频彩铃播放的手机终端才能观看到您设置的视频；<br />
            （4）中国联通及中国电信用户拨打移动电话能展示视频；4G和5G终端均可使用；<br />
            （5）客服热线：4006163810<br />
          </div>
        </div>
      </div>

      <div
        class="van-overlay"
        style="z-index: 2005"
        v-if="showProtocol"
        @click="showProtocol = false"
      ></div>
      <div
        class="protocol-popup van-popup van-popup--round van-popup--center"
        style="z-index: 2006"
        v-if="showProtocol"
      >
        <div class="protocol-container">
          <div class="indexAgreementPopBox">
            <p class="netCardAgreementTitle">用户协议</p>
            <div class="netCardAgreementContent">
              <p>
                我们尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，应用平台会按照本隐私权政策的规定使用和披露您的个人信息。但我们将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，应用平台不会将这些信息对外披露或向第三方提供。我们会不时更新本隐私权政策。
                您在同意本产品及应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本产品及应用服务使用协议不可分割的一部分。
              </p>
              <p class="mal netCardAgreementSubtitle">1. 适用范围</p>
              <p class="mal">a) 在您注册应用帐号时，您根据要求提供的个人注册信息；</p>
              <p class="mal">
                b)
                在您使用本产品及应用的网络服务，或访问平台网页时，平台自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
              </p>
              <p class="mal">c) 通过合法途径从商业伙伴处取得的用户个人数据。</p>
              <p class="mal">您了解并同意，以下信息不适用本隐私权政策：</p>
              <p class="mal">a) 您在使用平台提供的搜索服务时输入的关键字信息；</p>
              <p class="mal">
                b)
                收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；
              </p>
              <p class="mal">
                c) 违反法律规定或违反本产品及应用规则行为及其已对您采取的措施。
              </p>
              <p class="mal netCardAgreementSubtitle">2. 信息使用</p>
              <p class="mal">
                a)
                我们不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本产品及应用（含本产品及应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。
              </p>
              <p class="mal">
                b)
                我们亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何平台用户如从事上述活动，一经发现，平台有权立即终止与该用户的服务协议。
              </p>
              <p class="mal">
                c)
                为服务用户的目的，平台及应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与平台合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
              </p>
              <p class="mal netCardAgreementSubtitle">3. 信息披露</p>
              <p class="mal">
                在如下情况下，我们将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
              </p>
              <p class="mal">a) 经您事先同意，向第三方披露；</p>
              <p class="mal">
                b) 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
              </p>
              <p class="mal">
                c)
                根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
              </p>
              <p class="mal">
                d)
                如您出现违反中国有关法律、法规或者本产品及应用的服务协议或相关规则的情况，需要向第三方披露；
              </p>
              <p class="mal">
                e)
                如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
              </p>
              <p class="mal">
                f)
                在平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本平台有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。
              </p>
              <p class="mal">g) 其它本平台根据法律、法规或者网站政策认为合适的披露。</p>
              <p class="mal netCardAgreementSubtitle">4. 信息存储和交换</p>
              <p class="mal">
                本产品收集的有关您的信息和资料将保存在本产品及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本产品收集信息和资料所在地的境外并在境外被访问、存储和展示。
              </p>
              <p class="mal netCardAgreementSubtitle">5. Cookie的使用</p>
              <p class="mal">
                a) 在您未拒绝接受cookies的情况下，本产品会在您的计算机上设定或取用cookies
                ，以便您能登录或使用依赖于cookies的平台服务或功能。本产品及应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。
              </p>
              <p class="mal">
                b)
                您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的网络服务或功能。
              </p>
              <p class="mal">c) 通过产品所设cookies所取得的有关信息，将适用本政策。</p>
              <p class="mal netCardAgreementSubtitle">6. 信息安全</p>
              <p class="mal">
                a)
                本产品帐号均有安全保护功能，请妥善保管您的用户名及密码信息。我们将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
              </p>
              <p class="mal">
                b)
                在使用本产品网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本产品的用户名及密码发生泄露，请您立即联络我们平台的客服，以便我们采取相应措施。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "Home",
  data() {
    return {
      agree: false,
      showVailCode: false,
      btnVailCode: false,
      showProtocol: false,
      timeVailCode: 60,
      timerVailCode: null,
      show: false,
      mobile: "",
      code: "",
      isSticky: false,
      pid: "",
      toneCode: "910100116569",
      orderId: "",
      channelCode: "014X0FL",
      productId:"62500188698",
      token:"",
    };
  },
  computed: {
    cOrderId() {
      let clickid = this.$route.query.clickid;
      let dkey = this.$route.query.dkey;
      let a_oId = this.$route.query.a_oId;
      let qcjParamStr = this.$route.query.qcjParamStr;
      let orderId = "";
      if (clickid) {
        orderId = clickid;
      } else if (dkey) {
        orderId = dkey;
      } else if (a_oId) {
        orderId = a_oId;
      } else if (qcjParamStr) {
        orderId = qcjParamStr;
      } else {
        orderId = "";
      }
      return orderId;
    },
    cChannelid() {
      return this.$route.query.channelid;
    },
    cUnionSite() {
      return this.$route.query.union_site;
    },
  },
  beforeDestroy() {},
  methods: {
    handleScroll() {
      const scrollTop = this.$refs.container.scrollTop;
      // console.log('🚀 ~ file: Home.vue:400 ~ handleScroll ~ scrollTop:', scrollTop)

      this.isSticky = scrollTop > 440;
    },
    autoAgree() {
      this.agree = true;
      this.$store.commit("saveAgree", true);
    },
    GO_Position1() {
      document.getElementById("Position0").scrollIntoView({
        behavior: "smooth",
      });
    },
    //-----------------------------业务
    onClick(toneCode) {
      this.toneCode = toneCode;
      this.show = true;
    },
    // onBuy() {
    //   if (!this.pid) {
    //     console.log(this.pid);
    //     this.set();
    //     return false;
    //   }

    //   if (!this.code) {
    //     this.mToast("请输入验证码");
    //     return false;
    //   }
    //   if (this.code.length > 8) {
    //     this.mToast("您输入的验证码不正确");
    //     return false;
    //   }
    //   let query = {
    //     verifyCode: this.code,
    //     pid: this.pid,
    //     orderFrom: "0",
    //     sig: "test",
    //   };
    //   this.mLoading(true);
    //   this.$http.get("/VerifyCode", { params: query }).then((res) => {
    //     console.log(typeof res); //object
    //     // res = eval("(" + res + ")"); //transform to object
    //     if (res.resultCode === 0) {
    //       this.mAlert("恭喜，操作成功");
    //       this.resetpage();
    //     } else {
    //       clearTimeout(this.timerVailCode);
    //       this.timeVailCode = 60;
    //       this.btnVailCode = false;
    //       this.mToast(res.resultDesc, false);
    //     }
    //     this.mLoading(false);
    //   });
    // },
    verifyCodeAndOrder() {
      if (!this.pid) {
        console.log(this.pid);
        this.requestCode();
        return false;
      }

      //勾选协议
      if (!this.agree) {
        this.mToast("请仔细阅读协议，并同意协议内容");
        return false;
      }

      var verifyTime = new Date().getTime().toString();
      var sig = md5(this.mobile.toString() + 'verify' + verifyTime);
      console.log('sig: ' + sig);
      let query = {
        phone: this.mobile.toString(),
        action: 'verify',
        xtimstamp: verifyTime,
        pid: this.pid,
        verifyCode: this.code,
        sig: sig
      };

      this.$http.get("/LoginSmsService", { params: query }).then((res) => {
        if (res.code === '0') {
          this.token = res.token;
          this.onBuy(this.token);
        } else if (res.code === '10001') {
          this.mToast('验证码错误，请重新输入', false);
        } else {
          this.mToast(res.msg, false);
        }
        this.mLoading(false);
      });
    },

    // 订购
    onBuy(token) {
      if (!token) {
        alert('请先登录');
        return;
      }
      var data = {
        'youCallbackName': 'window.orderBackFun',
        'channelCode': this.channelCode,
        'token': token,
        'productId': this.productId,
        'addDepartment': '1',
        'departmentName': 'chengdushengchuan',
        'adminMsisdn': '13408596461',
      };
      console.log('order:'+JSON.stringify(data));
      companyVrbtOrder_centrality(data);
    },

    // 退订
    exit(token) {
      if (!token) {
        alert('请先登录');
        return;
      }
      var data = {
        'youCallbackName': 'orderBack',
        'channelCode': this.channelCode,
        'token': token,
        'productId': this.productId,
      };
      companyVrbtCancel_centrality(data);
    },

    // 请求验证码
    requestCode() {
      if (!this.mobile) {
        this.mToast("请输入手机号");
        return false;
      }

      var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!reg.test(this.mobile)) {
        this.mToast("您输入手机号格式不正确");
        return false;
      }

      //勾选协议
      if (!this.agree) {
        this.mToast("请仔细阅读协议，并同意协议内容");
        return false;
      }

      var requestTime = new Date().getTime().toString();
      var sig = md5(this.mobile.toString() + 'init' + requestTime);
      console.log('sig: ' + sig);
      let query = {
        phone: this.mobile.toString(),
        action: 'init',
        xtimstamp: requestTime,
        sig: sig
      };
      this.mLoading(true);
      this.btnVailCode = true;
      this.timerVailCode = setTimeout(() => {
        this.mTimerCode();
      }, 1000);

      this.$http.get("/LoginSmsService", { params: query }).then((res) => {
        if (res.code === '0') {
          this.showVailCode = true;
          this.pid = res.pid;
          this.mToast("验证码已发送，请查收", true);
        } else {
          clearTimeout(this.timerVailCode);
          this.timeVailCode = 60;
          this.btnVailCode = false;
          this.mToast(res.msg, false);
        }
        this.mLoading(false);
      });
    },

    // set() {
    //   if (!this.mobile) {
    //     this.mToast("请输入手机号");
    //     return false;
    //   }

    //   var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
    //   if (!reg.test(this.mobile)) {
    //     this.mToast("您输入手机号格式不正确");
    //     return false;
    //   }

    //   //勾选协议
    //   if (!this.agree) {
    //     this.mToast("请仔细阅读协议，并同意协议内容");
    //     return false;
    //   }

    //   let query = {
    //     ipaddress: "1.192.156.201", //固定值
    //     ver: "1.0", //固定值
    //     mobile: this.mobile.toString(),
    //     channel: "2039084001", //移动咪咕渠道号
    //     //"channel": channelid,
    //     imsi: "460030870900577", //固定值
    //     imei: "354779069340660", //固定值
    //     phoneModel: "MI+4LTE", //固定值
    //     apName: "xibuxinchan", //固定值
    //     appName: "doudizhu", //固定值
    //     chargeName: "10beika", //固定值
    //     price: 1000, //测试值，deploy后重置
    //     chargeType: 2, //固定值
    //     timestamp: new Date().getTime().toString(),
    //     orderId: "1689664418380", //来自跳转页面url的参数：a_oId 或 clickid
    //     sig: "test", //固定值
    //   };
    //   this.mLoading(true);
    //   this.btnVailCode = true;
    //   this.timerVailCode = setTimeout(() => {
    //     this.mTimerCode();
    //   }, 1000);

    //   this.$http.get("/HttpAPI", { params: query }).then((res) => {
    //     if (res.resultCode === 0) {
    //       this.showVailCode = true;
    //       this.pid = res.pid;
    //       this.mToast("验证码已发送，请查收", true);
    //     } else {
    //       clearTimeout(this.timerVailCode);
    //       this.timeVailCode = 60;
    //       this.btnVailCode = false;
    //       this.mToast(res.resultDesc, false);
    //     }
    //     this.mLoading(false);
    //   });
    // },
    isMobile(val) {
      var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!reg.test(val)) {
        return false;
      }
      return true;
    },
    mTimerCode() {
      if (this.timeVailCode <= 0) {
        clearTimeout(this.timerVailCode);
        this.timeVailCode = 60;
        this.btnVailCode = false;
      } else {
        this.timeVailCode--;
        this.timerVailCode = setTimeout(() => {
          this.mTimerCode();
        }, 1000);
      }
    },
    resetpage() {
      this.pid = "";
      this.code = "";
      this.show = false;
      clearTimeout(this.timerVailCode);
      this.timeVailCode = 60;
      this.btnVailCode = false;
    },
    fetchData() {
      openMiGuInit_centrality(this.channelCode,'window.initBackFun');
    },
  },

  created() {
    this.agree = this.$store.getters.getAgree;
  },

  mounted() {
    this.fetchData();
    window.initBackFun = function(result) {
      if (result.resultCode !== '0000') {
        alert('初始化错误' + JSON.stringify(result));
        return;
      }
      console.log(JSON.stringify(result));
    };
    window.orderBackFun = function(result) {
      console.log(result.resCode);
      if ('' + result.resCode === '000000') {
        alert("恭喜，订购成功！");
        this.resetpage();
      } else {
        clearTimeout(this.timerVailCode);
        this.timeVailCode = 60;
        this.btnVailCode = false;
        alert('订购失败' + JSON.stringify(result.resMsg));
      }
    };
  },
};
</script>
<style scoped>
@import "./../assets/css/main.css";
</style>
