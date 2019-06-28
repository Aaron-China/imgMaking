(function (win) {
  var obj = {
    a: 1,
    oldX: "",
    oldY: "",
    ratio: 1,
    ratioBig: 0,
    jsonUrl: 'https://xxxxxxx/api/xxxx',
    radioSmall: 0,
    num: 1,
    setWidth: 432,	//图片需要压缩到的尺寸   216,135
    theDataBase: "",
    yaSuoBase64: "",
    hcBase64: "",
    image: new Image(),	//放到画布的img
    bookCode: 12221212,
    flag: true,
    bodyWidth: '',
    bodyHeight: '',
    ifImgUpload: false,
    base64Zong: "",
    imgNewName: "",
//首页的js。横竖屏、微信分享、滑动跳转
    page1Init: function () {
      var w = this;
      if ($(win).width() >= $(win).height()) {
        w.bodyWidth = parseInt($(window).height()) + 64;
        w.bodyHeight = $(window).width();
        $('body,html').width(w.bodyWidth);
        $('body,html').height(w.bodyHeight);
      } else {
        w.bodyWidth = $(window).width();
        w.bodyHeight = $(window).height();
        $('body,html').width(w.bodyWidth);
        $('body,html').height(w.bodyHeight);
      }

      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        if (window.orientation === 180 || window.orientation === 0) {
          $('body,html').width(bodyWidth);
          $('body,html').height(bodyHeight);
        }
        if (window.orientation === 90 || window.orientation === -90) {
          $('body,html').width(bodyWidth);
          $('body,html').height(bodyHeight);
        }
      }, false);

      // 初始化微信分享的
      // w.wxConfig();
      // w.wxReady();

      var oldX = 0, oldY = 0;
      $("body").on("touchstart", imgTouchStart);
      $("body").on("touchmove", imgTouchMove);

      //手指按下时，捕捉事件，取坐标值，设置参数
      function imgTouchStart(e) {
        //阻止事件冒泡的
        e.stopImmediatePropagation();
        oldX = e.originalEvent.touches[0].clientX;
        oldY = e.originalEvent.touches[0].clientY;
      }

      function imgTouchMove(e) {
        e.stopImmediatePropagation();
        var x = e.originalEvent.touches[0].clientX - oldX;
        var y = e.originalEvent.touches[0].clientY - oldY;
        if (y < -150) {
          window.location.href = 'getBooks.html?';
        }
      }
    },

//上传照片页的js。横竖屏、微信分享、上传照片
    page2Init: function () {
      var w = this;
      if ($(win).width() >= $(win).height()) {
        w.bodyWidth = parseInt($(window).height()) + 64;
        w.bodyHeight = $(window).width();
        $('body,html').width(w.bodyWidth);
        $('body,html').height(w.bodyHeight);
      } else {
        w.bodyWidth = $(window).width();
        w.bodyHeight = $(window).height();
        $('body,html').width(w.bodyWidth);
        $('body,html').height(w.bodyHeight);
      }

      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        if (window.orientation === 180 || window.orientation === 0) {
          $('body,html').width(bodyWidth);
          $('body,html').height(bodyHeight);
        }
        if (window.orientation === 90 || window.orientation === -90) {
          $('body,html').width(bodyWidth);
          $('body,html').height(bodyHeight);
        }
      }, false);

      // w.wxConfig();
      // w.wxReady3();

      //上传图片进行处理
      w.uploadImg();

      if (localStorage.getItem("imgFlag") == "true") {
        $(".f-scInLock").hide();
      }

      //选好照片，准备制作
      $('.m-loadBtn').on("tap", function () {
        $('.m-loadBtn').css({"color": "#C64100"});
        setTimeout(function () {
          $('.m-loadBtn').css({"color": "white"});
        }, 300);
        if (w.ifImgUpload == true) {
          $('.g-wrap2').hide();
          $('.g-wrap3').show();
          $("#m-loadImg").attr("src", w.yaSuoBase64);
        } else {
          $('.j-pop p').text("还没有选择喜欢照片吆!");
          $('.j-pop').show();
          setTimeout(function () {
            $('.j-pop').hide();
          }, 1500);
        }
      });

      $(".m-step1 .f-scIn1").on("tap", function () {
        $(".m-sucaiOut").show();
        $(".m-sucaiOut").css({"width": "70px", "opacity": "1"});
        $(".m-imgBox .f-sucai").attr("src", "img/sucai1.png");
      });
      $(".m-step1 .f-scIn2").on("tap", function () {
        $(".m-sucaiOut").show();
        $(".m-sucaiOut").css({"width": "70px", "opacity": "1"});
        $(".m-imgBox .f-sucai").attr("src", "img/sucai2.png");
      });
      $(".m-step1 .f-scIn3").on("tap", function () {
        var sucai3 = localStorage.getItem("imgFlag");
        if (sucai3 == "true") {
          $(".m-sucaiOut").show();
          $(".m-sucaiOut").css({"width": "70px", "opacity": "1"});
          $(".m-imgBox .f-sucai").attr("src", "img/sucai3.png");
        } else {
          $('.j-pop p').text("分享后可解锁吆!");
          $('.j-pop').show();
          setTimeout(function () {
            $('.j-pop').hide();
          }, 1500);
        }
      })
      $(".f-sucaiDelete").on("tap", function () {
        $(".m-sucaiOut").css({"width": "1px", "opacity": "0", "top": "4px", "left": "100px"});
        $(".m-imgBox .f-sucai").attr("src", "img/wu.png");
      });


      $(".m-step2 .f-scIn1").on("tap", function () {
        $(".imgKuang .imgK").attr("src", "img/sucai4.png");
      });
      $(".m-step2 .f-scIn2").on("tap", function () {
        $(".imgKuang .imgK").attr("src", "img/sucai5.png");
      });


      $(".m-makeBtn").on("tap", function () {
        $("#loadingSection").show();
        setTimeout(function () {
          $("#loadingSection").hide();
        }, 1800);

        w.imageMake();
      });

      $(".m-getBtn").on("tap", function () {
        $(".m-login").show();
        $(".m-mengBan").show();
      });
      $(".m-closeLogin").on("tap", function () {
        $(".m-login").hide();
        $(".m-mengBan").hide();
      });

      $(".wx-share").on("tap", function () {
        $(".wx-share").hide();
        $(".m-mengBan").hide();
      });

      $(".m-oldManBtn").on("tap", function () {
        $(".wx-share").show();
        $(".m-mengBan").show();
        w.sendImgSouce();
        w.wxReady2();
      });

      w.initEvent();
    },


    resize: function () {},

    wxConfig: function () {
      var w = this;
      var jsapi_ticket, nonceStr, signature, timestamp, getCode;
      var url = 'http://xxxxxxx/'; //正式库
      //获取config配置
      var Url = window.location.href;
      $.ajax({
        type: 'get',
        url: 'http:/xxxxxxx',
        data: {
          weixinurl: Url
        },
        timeout: 10000, //10秒超时
        callbackParameter: 'callback',
        async: false,
        jsonp: "jsonpcallback",
        success: function (o) {
          jsapi_ticket = o.jsapi_ticket;
          nonceStr = o.nonceStr;
          signature = o.signature;
          timestamp = o.timestamp;
        }
      });
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'xxxxxxxxx', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'onVoicePlayEnd',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },
    wxReady: function () {
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxxxxxx/index.html', // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxxxx/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
          },
          cancel: function (res) {
          }
        });
        //alert('已注册获取“发送给朋友圈”状态事件');
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxxxx/index.html', // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxxxx/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
          },
          cancel: function (res) {
          }
        });
      });
    },
    wxReady3: function () {
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxxx/index.html', // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxxxxxx/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
            $(".f-scInLock").hide();
            $(".f-scInLock").css({"width": "0px", "height": "0px", "display": "none"});
          },
          cancel: function (res) {
          }
        });
        //alert('已注册获取“发送给朋友圈”状态事件');
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxxxx/index.html', // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxxxx/img/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
            $(".f-scInLock").hide();
            $(".f-scInLock").css({"width": "0px", "height": "0px", "display": "none"});
          },
          cancel: function (res) {
          }
        });
      });
    },
    wxReady2: function () {
      var w = this;
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxxxx/sharePage.html?imgName=' + w.imgNewName, // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxx/img/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
            $(".wx-share").hide();
            $(".m-mengBan").hide();
            $(".f-scInLock").hide();
            $(".f-scInLock").css({"width": "0px", "height": "0px", "display": "none"});
          },
          cancel: function (res) {
          }
        });
        //alert('已注册获取“发送给朋友圈”状态事件');
        wx.onMenuShareAppMessage({
          title: '嘿，我愿意做你的圣诞老人！', // 分享标题
          link: 'http://xxxxx/sharePage.html?imgName=' + w.imgNewName, // 分享链接
          desc: '叮叮当，叮叮当，今年你愿意做我的圣诞老人吗……',
          imgUrl: 'http://xxxxxx/img/wxbanner.png', // 分享图标
          trigger: function (res) {
          },
          success: function (res) {
            localStorage.setItem("imgFlag", "true");
            $(".wx-share").hide();
            $(".m-mengBan").hide();
            $(".f-scInLock").hide();
            $(".f-scInLock").css({"width": "0px", "height": "0px", "display": "none"});
          },
          cancel: function (res) {
          }
        });
      });
    },


    //照片上传函数
    uploadImg: function () {
      var w = this;
      var loadFile = document.getElementById("file");
      loadFile.addEventListener("change", function () {
        $(".m-thewen33").hide();
        $(".m-thewen").show();

        $(".f-theImg").css({"width": "100%"});
        w.ifImgUpload = true;

        $("#loadingSection").show();
        setTimeout(function () {
          $("#loadingSection").hide();
        }, 2700);

        var oFile = loadFile.files[0];
        console.log(oFile);
        if (!new RegExp("(jpg|jpeg|png)+", "gi").test(oFile.type)) {
          alert("照片上传：文件类型必须是JPG、JPEG、PNG");
          return;
        }
        //新建一个文件对象
        var reader = new FileReader();
        //读出这个文件的 base64 的数据流，这个函数是专门转base64的，不加他，下面没法用base64
        reader.readAsDataURL(oFile);

        //因为  iOS 不支持 FileReader 的onload回调,所以,这里只能加延迟处理了
        setTimeout(function () {
          //先取照片的拍摄方向角
          EXIF.getData(oFile, function () {
            EXIF.getAllTags(this);
            var zzz = EXIF.getTag(this, 'Orientation');
            var spanData = document.getElementsByClassName("tspanme");
            if (zzz == 1 || zzz == undefined) {
              spanData[0].innerText = 0;
//					    	alert("0度");
//							console.log("0度");
            } else if (zzz == 6) {
              spanData[0].innerText = 90;
//					    	alert("90度");
//					    	console.log("90度");
            } else if (zzz == 8) {
              spanData[0].innerText = 270;
//					    	alert("270度");
//					    	console.log("270度");
            } else if (zzz == 3) {
              spanData[0].innerText = 180;
//					    	alert("180度");
//					    	console.log("180度");
            }
          });


          var img = new Image();
          img.src = reader.result;
          //根据拍摄角度不同，把图片旋转适当角度，纠正图片
          //除了修改方向，不做其他任何修改
          setTimeout(function () {
            var spanData = document.getElementsByClassName("tspanme");
            var theText = spanData[0].innerText;

            // console.log("这个保存的角度" + theText);
            var canvas = document.createElement("canvas");
            var cantent = canvas.getContext("2d");
            var width = img.naturalWidth,
              height = img.naturalHeight;

            if (theText == 0) { //0
              canvas.width = width;
              canvas.height = height;
              cantent.drawImage(img, 0, 0, width, height, 0, 0, width, height);
              console.log("0");
            } else if (theText == 90) {
              canvas.width = height;
              canvas.height = width;
              cantent.save();
              cantent.rotate(90 * Math.PI / 180);
              cantent.drawImage(img, 0, -height);
              cantent.restore();
              console.log("90");
            } else if (theText == 180) {
              canvas.width = width;
              canvas.height = height;
              cantent.save();
              cantent.rotate(180 * Math.PI / 180);
              cantent.drawImage(img, -width, -height);
              cantent.restore();
              console.log("180");
            } else if (theText == 270) {
              canvas.width = height;
              canvas.height = width;
              cantent.save();
              cantent.rotate(270 * Math.PI / 180);
              cantent.drawImage(img, -width, 0);
              cantent.restore();
              console.log("270");
            }
            w.theDataBase = canvas.toDataURL();
            setTimeout(function () {
              w.yaSuoImg();
            }, 200);
          }, 300);
        }, 400);
      })
    },


    //处理图片的函数
    imageMake: function () {
      var w = this,
        theAngle = 0,
        imgHat = document.getElementsByClassName("f-sucai")[0];

      theAngle = getEletAngle();
      console.log("当前素材的角度:" + theAngle);

      var canvasHat = document.createElement("canvas"),
        cantentHat = canvasHat.getContext("2d"),
        widthHat = imgHat.naturalWidth,
        heightHat = imgHat.naturalWidth;

      // console.log(widthHat);
      // console.log(heightHat);
      // console.log(theAngle);
      canvasHat.width = widthHat;
      canvasHat.height = heightHat;
      cantentHat.save();
      cantentHat.translate(widthHat / 2, heightHat / 2);
      cantentHat.rotate(theAngle * Math.PI / 180);
      cantentHat.translate(-widthHat / 2, -heightHat / 2);
      cantentHat.drawImage(imgHat, 0, 0);
      cantentHat.restore();

      imgHat.src = canvasHat.toDataURL();

      setTimeout(function () {
        var img1 = document.getElementById("m-loadImg"),
          width = img1.naturalWidth,
          height = img1.naturalHeight,
          canvas = document.createElement("canvas"),
          cantent = canvas.getContext("2d"),
          oldTop = $("#m-loadImg")[0].offsetTop,
          oldLeft = $("#m-loadImg")[0].offsetLeft,
          imgK = document.getElementsByClassName("imgK")[0],
          imgKuangOut = document.getElementsByClassName("imgKuang")[0],
          imgSuCai = document.getElementsByClassName("f-sucai")[0],
          imgSuCaiOut = document.getElementsByClassName("m-sucaiOut")[0],

          //缩放之后图片的宽度
          scWidth = imgSuCai.width,
          scHeight = imgSuCai.height,

          scOffsetTop = imgSuCaiOut.offsetTop,
          scOffsetLeft = imgSuCaiOut.offsetLeft;

        // console.log("------------------------");
        // console.log(imgSuCai);
        // console.log(imgSuCaiOut);
        // console.log(scWidth);
        // console.log(scHeight);
        // console.log(scOffsetTop);
        // console.log(scOffsetLeft);

        canvas.width = 270;
        canvas.height = 194;

        // console.log("原大小:");
        // console.log(img1.naturalWidth);
        // console.log(img1.naturalHeight);
        // console.log(imgK.naturalWidth);
        // console.log(imgK.naturalHeight);


        // console.log("相框的上定位" + imgK.offsetTop);
        // console.log("相框的下定位" + imgK.offsetLeft);
        //
        // console.log("插入素材的数据:");
        // console.log(scWidth);
        // console.log(scHeight);
        // console.log(scOffsetTop);
        // console.log(scOffsetLeft);


        var yasuobi = width / 270;
        // console.log("压缩之后的宽度" + width);
        // console.log("position的上定位" + oldTop);
        // console.log("position的左定位" + oldLeft);

//				alert(-oldLeft*yasuobi+"水平位移");
//				alert(-oldTop*yasuobi+"垂直位移");


        setTimeout(function () {
          //画上照片
          cantent.drawImage(img1, 0, 0, width, height, oldLeft, oldTop, 270, height / yasuobi);
          //画上素材
          cantent.drawImage(imgSuCai, 0, 0, imgSuCai.naturalWidth, imgSuCai.naturalHeight, scOffsetLeft, scOffsetTop, scWidth, scHeight);
          //画上相框
          cantent.drawImage(imgK, 0, 0, imgK.naturalWidth, imgK.naturalHeight, imgKuangOut.offsetLeft, imgKuangOut.offsetTop, imgK.width, imgK.height);
          w.hcBase64 = canvas.toDataURL();


          //做最终的合成
          var imgZong = new Image();
          imgZong.src = w.hcBase64;

          setTimeout(function () {
            var canvas111 = document.createElement("canvas"),
              cantent111 = canvas111.getContext("2d"),
              imgKuangTrue = document.getElementById("g-kuangTrue"),
              theEWM = document.getElementById("g-ewm");

            canvas.width = 326.5;
            canvas.height = 335;

            cantent.drawImage(imgKuangTrue, 0, 0, imgKuangTrue.naturalWidth, imgKuangTrue.naturalHeight, 0, 0, 326.5, 335);
            cantent.drawImage(imgZong, 0, 0, imgZong.naturalWidth, imgZong.naturalHeight, 28, 47, 270, 194);
            cantent.drawImage(theEWM, 0, 0, theEWM.naturalWidth, theEWM.naturalHeight, 236, 249, 64, 64);
            w.base64Zong = canvas.toDataURL();
            setTimeout(function () {
              $(".g-wrap3").hide();
              $(".g-wrap4").show();
              $(".f-shuchu").attr("src", w.base64Zong);
            }, 400)
          }, 500)
          // console.log("合成的图片");
          //console.log(w.theDataBase.length/1024+"KB");
        }, 400)

      }, 700)
    },


    //压缩函数
    yaSuoImg: function () {
      var w = this;
      yaWidth = w.setWidth / 2,	//  yaWidth  这个是实际照片一半的大小，通过设置它实现压缩
        canvas = document.createElement("canvas"),
        cantent = canvas.getContext("2d"),
        img = new Image();
      img.src = w.theDataBase;
      //这个iOS是支持的，iOS不支持的是file对象的onload函数
      img.onload = function () {
        var width = img.naturalWidth,
          height = img.naturalHeight,
          //图片的压缩比
          theRadio = img.naturalWidth / yaWidth;
        //如果图片尺寸小于设定画布的尺寸，不压缩,输出原图
        if (theRadio <= 1) {
          theRadio = 1;
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          canvas.style.width = img.naturalWidth / 2 + "px";
          canvas.style.height = img.naturalHeight / 2 + "px";
          cantent.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        } else {
          //为了避免失真，canvas实际大小设置为显示大小的2倍
          canvas.width = yaWidth * 2;
          canvas.height = (height / theRadio) * 2;
          canvas.style.width = yaWidth + "px";
          canvas.style.height = height / theRadio + "px";
          //注意，图片要取实际大小裁剪，但是显示大小选择和canvas同样的大小，这样显示的不失真、小，但实际的大。不失真
          cantent.drawImage(img, 0, 0, width, height, 0, 0, yaWidth * 2, height / theRadio * 2);
          console.log("压缩之后的图片大小，宽：  " + yaWidth * 2 + "高：  " + height / theRadio * 2);
        }

        // console.log("************************");
        // console.log(theRadio);
        // console.log(width);
        // console.log(height);
        // console.log(yaWidth * 2);
        // console.log((height / theRadio) * 2);
        w.yaSuoBase64 = canvas.toDataURL();
        setTimeout(function () {
          $(".g-wrap2 .f-theImg").attr("src", w.yaSuoBase64);
          // console.log("压缩之后大小");
          // console.log(w.yaSuoBase64.length / 1024 + "KB");
//					alert("压缩之后大小:"+w.yaSuoBase64.length/1024+"KB");
        }, 200)
      };
    },


    initEvent: function () {
      var w = this;
      $('.getCode').on('tap', function () {
        $('.m-phone').blur();
        $('.m-code').blur();
        var phoneNum = $('.m-phone').val();
        if (phoneNum == '') {
          $('.j-pop').fadeIn();
          $('.j-pop p').text('手机号不能为空');
          setTimeout(function () {
            $('.j-pop').fadeOut();
          }, 2000);
          return false;
        } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phoneNum)) {
          $('.j-pop').fadeIn();
          $('.j-pop p').text('手机号格式不正确');
          setTimeout(function () {
            $('.j-pop').fadeOut();
          }, 2000);
          return false;
        }
        if (w.flag == true) {
          w.codeAjax();
          var time = 60;
          $('.getCode').attr("disabled", "disabled");
          w.flag = false;
          var t = setInterval(function () {
            time--;
            $('.getCode').text(time + "s后再发送");
            $('.getCode').css("background", '#EFEFEF');
            $('.getCode').css("color", 'gray');
            if (time == 0) {
              $('.getCode').removeAttr('disabled');
              clearInterval(t);
              $('.getCode').text("获取验证码");
              w.flag = true;
              $('.getCode').css("color", '#CB402F');
            }
          }, 1000);
        }
      });
      $('.m-getBook').on('tap', function () {
        var codeTxt = $('.m-code').val();
        var phoneNum = $('.m-phone').val();
        if (phoneNum == '') {
          $('.j-pop').fadeIn();
          $('.j-pop p').text('手机号不能为空');
          setTimeout(function () {
            $('.j-pop').fadeOut();
          }, 2000);
        } else if (codeTxt == '') {
          $('.j-pop').fadeIn();
          $('.j-pop p').text('验证码不能为空');
          setTimeout(function () {
            $('.j-pop').fadeOut();
          }, 2000);
          return false;
        } else if (/^1[3|4|5|7|8][0-9]{9}$/.test(phoneNum) && codeTxt != "") {
          $.ajax({
            type: 'post',
            url: w.jsonUrl,
            data: "method=xxxx" + "&content=" + JSON.stringify({
              customerName: phoneNum,
              sendBookActivityCode: w.bookCode,
              checkCode: codeTxt
            }),
            callbackParameter: 'callback',
            async: true,
            jsonp: "jsonpcallback",
            success: function (o) {
              if (o.status == 1) {
                $('.j-pop').fadeIn();
                $('.j-pop p').text('领取成功！');
                setTimeout(function () {
                  $('.j-pop').fadeOut();
                  window.location.href = "http://xxxxx";
                }, 800);
              } else if (o.status == 2) {
                $('.j-pop').fadeIn();
                $('.j-pop p').text("您已领取过该书籍");
                setTimeout(function () {
                  $('.j-pop').fadeOut();
                  window.location.href = "http://xxxx";
                }, 2000);
              }
            }
          });

        } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phoneNum)) {
          $('.j-pop').fadeIn();
          $('.j-pop p').text('手机号错误');
          setTimeout(function () {
            $('.j-pop').fadeOut();
          }, 2000);
        }
      });
    },

    codeAjax: function () {
      var w = this;
      var phoneNum = $('.m-phone').val();
      if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(phoneNum)) {
        $.ajax({
          type: 'post',
          url: w.jsonUrl,
          timeout: 2000, //10秒超时
          data: "method=xxxx" + "&content=" + JSON.stringify({
            mobileNum: phoneNum,
            type: 'LOGIN_CHECK'
          }),
          callbackParameter: 'callback',
          async: false,
          jsonp: "jsonpcallback",
          success: function (o) {
            if (o.status == 1) {
              $('.j-pop').fadeIn();
              $('.j-pop p').text('短信发送成功');
              setTimeout(function () {
                $('.j-pop').fadeOut();
              }, 2000);
            } else if (o.status == 0) {
              if (o.code == "10002006") {
                $('.j-pop').fadeIn();
                $('.j-pop p').text('请求过于频繁，一分钟只能请求一次');
                setTimeout(function () {
                  $('.j-pop').fadeOut();
                }, 2000);
              } else if (o.code == "10002003") {
                $('.j-pop').fadeIn();
                $('.j-pop p').text('短信发送失败');
                setTimeout(function () {
                  $('.j-pop').fadeOut();
                }, 2000);
              }
            }
          }
        });
      } else {
        $('.j-pop').fadeIn();
        $('.j-pop p').text('手机号格式不正确');
        setTimeout(function () {
          $('.j-pop').fadeOut();
        }, 2000);
      }
    },

    //上传做好的图片,并获取后台生成的图片路径
    sendImgSouce: function () {
      var w = this;
      console.log("开始上传");
      $.ajax({
        type: 'post',
        url: 'http://xxxxxxx/upload/activityBase64',
        data: {
          pictureStream: w.hcBase64,
          activityId: "1508342400"
        },
        timeout: 10000, //10秒超时
        callbackParameter: 'callback',
        async: false,
        jsonp: "jsonpcallback",
        success: function (o) {
          console.log("回调");
          console.log(o);
          var b = o.data.split("?");
          var c = b[0].split("event/");
          w.imgNewName = c[1];
          console.log(w.imgNewName);
        }
      });
      console.log("上传成功");
    }

  }
  win.page = obj;
})(window)