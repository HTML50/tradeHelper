//-------------基本设置--------------------

//对敲价格随机范围： priceHigh最高价，priceLow最低价
var priceHigh = '0.0000004394'
var priceLow = '0.000000423'

//交易数量随机范围
var theLevel = [2900,80000];
//交易数量小数点位数
var thePoint = 3;

//交易间隔时间范围 (秒)
var randomSecond = [10, 30];

//交易总量
var totalAmount = 1100000
var actualAmount =0;

//-------------高级变量（无需更改）--------------------

var buyPirceDOM = document.getElementById('buy-price');
var buyAmountDOM = document.getElementById('buy-number')

var sellPirceDOM = document.getElementById('sell-price');
var sellAmountDOM = document.getElementById('sell-number')


;(function(global){"use strict";var DP=20,RM=1,MAX_DP=1e6,MAX_POWER=1e6,E_NEG=-7,E_POS=21,P={},isValid=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Big;function bigFactory(){function Big(n){var x=this;if(!(x instanceof Big)){return n===void 0?bigFactory():new Big(n)}if(n instanceof Big){x.s=n.s;x.e=n.e;x.c=n.c.slice()}else{parse(x,n)}x.constructor=Big}Big.prototype=P;Big.DP=DP;Big.RM=RM;Big.E_NEG=E_NEG;Big.E_POS=E_POS;return Big}function format(x,dp,toE){var Big=x.constructor,i=dp-(x=new Big(x)).e,c=x.c;if(c.length>++dp){rnd(x,i,Big.RM)}if(!c[0]){++i}else if(toE){i=dp}else{c=x.c;i=x.e+i+1}for(;c.length<i;c.push(0)){}i=x.e;return toE===1||toE&&(dp<=i||i<=Big.E_NEG)?(x.s<0&&c[0]?"-":"")+(c.length>1?c[0]+"."+c.join("").slice(1):c[0])+(i<0?"e":"e+")+i:x.toString()}function parse(x,n){var e,i,nL;if(n===0&&1/n<0){n="-0"}else if(!isValid.test(n+="")){throwErr(NaN)}x.s=n.charAt(0)=="-"?(n=n.slice(1),-1):1;if((e=n.indexOf("."))>-1){n=n.replace(".","")}if((i=n.search(/e/i))>0){if(e<0){e=i}e+=+n.slice(i+1);n=n.substring(0,i)}else if(e<0){e=n.length}for(i=0;n.charAt(i)=="0";i++){}if(i==(nL=n.length)){x.c=[x.e=0]}else{for(;n.charAt(--nL)=="0";){}x.e=e-i-1;x.c=[];for(e=0;i<=nL;x.c[e++]=+n.charAt(i++)){}}return x}function rnd(x,dp,rm,more){var u,xc=x.c,i=x.e+dp+1;if(rm===1){more=xc[i]>=5}else if(rm===2){more=xc[i]>5||xc[i]==5&&(more||i<0||xc[i+1]!==u||xc[i-1]&1)}else if(rm===3){more=more||xc[i]!==u||i<0}else{more=false;if(rm!==0){throwErr("!Big.RM!")}}if(i<1||!xc[0]){if(more){x.e=-dp;x.c=[1]}else{x.c=[x.e=0]}}else{xc.length=i--;if(more){for(;++xc[i]>9;){xc[i]=0;if(!i--){++x.e;xc.unshift(1)}}}for(i=xc.length;!xc[--i];xc.pop()){}}return x}function throwErr(message){var err=new Error(message);err.name="BigError";throw err}P.abs=function(){var x=new this.constructor(this);x.s=1;return x};P.cmp=function(y){var xNeg,x=this,xc=x.c,yc=(y=new x.constructor(y)).c,i=x.s,j=y.s,k=x.e,l=y.e;if(!xc[0]||!yc[0]){return!xc[0]?!yc[0]?0:-j:i}if(i!=j){return i}xNeg=i<0;if(k!=l){return k>l^xNeg?1:-1}i=-1;j=(k=xc.length)<(l=yc.length)?k:l;for(;++i<j;){if(xc[i]!=yc[i]){return xc[i]>yc[i]^xNeg?1:-1}}return k==l?0:k>l^xNeg?1:-1};P.div=function(y){var x=this,Big=x.constructor,dvd=x.c,dvs=(y=new Big(y)).c,s=x.s==y.s?1:-1,dp=Big.DP;if(dp!==~~dp||dp<0||dp>MAX_DP){throwErr("!Big.DP!")}if(!dvd[0]||!dvs[0]){if(dvd[0]==dvs[0]){throwErr(NaN)}if(!dvs[0]){throwErr(s/0)}return new Big(s*0)}var dvsL,dvsT,next,cmp,remI,u,dvsZ=dvs.slice(),dvdI=dvsL=dvs.length,dvdL=dvd.length,rem=dvd.slice(0,dvsL),remL=rem.length,q=y,qc=q.c=[],qi=0,digits=dp+(q.e=x.e-y.e)+1;q.s=s;s=digits<0?0:digits;dvsZ.unshift(0);for(;remL++<dvsL;rem.push(0)){}do{for(next=0;next<10;next++){if(dvsL!=(remL=rem.length)){cmp=dvsL>remL?1:-1}else{for(remI=-1,cmp=0;++remI<dvsL;){if(dvs[remI]!=rem[remI]){cmp=dvs[remI]>rem[remI]?1:-1;break}}}if(cmp<0){for(dvsT=remL==dvsL?dvs:dvsZ;remL;){if(rem[--remL]<dvsT[remL]){remI=remL;for(;remI&&!rem[--remI];rem[remI]=9){}--rem[remI];rem[remL]+=10}rem[remL]-=dvsT[remL]}for(;!rem[0];rem.shift()){}}else{break}}qc[qi++]=cmp?next:++next;if(rem[0]&&cmp){rem[remL]=dvd[dvdI]||0}else{rem=[dvd[dvdI]]}}while((dvdI++<dvdL||rem[0]!==u)&&s--);if(!qc[0]&&qi!=1){qc.shift();q.e--}if(qi>digits){rnd(q,dp,Big.RM,rem[0]!==u)}return q};P.eq=function(y){return!this.cmp(y)};P.gt=function(y){return this.cmp(y)>0};P.gte=function(y){return this.cmp(y)>-1};P.lt=function(y){return this.cmp(y)<0};P.lte=function(y){return this.cmp(y)<1};P.sub=P.minus=function(y){var i,j,t,xLTy,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(a!=b){y.s=-b;return x.plus(y)}var xc=x.c.slice(),xe=x.e,yc=y.c,ye=y.e;if(!xc[0]||!yc[0]){return yc[0]?(y.s=-b,y):new Big(xc[0]?x:0)}if(a=xe-ye){if(xLTy=a<0){a=-a;t=xc}else{ye=xe;t=yc}t.reverse();for(b=a;b--;t.push(0)){}t.reverse()}else{j=((xLTy=xc.length<yc.length)?xc:yc).length;for(a=b=0;b<j;b++){if(xc[b]!=yc[b]){xLTy=xc[b]<yc[b];break}}}if(xLTy){t=xc;xc=yc;yc=t;y.s=-y.s}if((b=(j=yc.length)-(i=xc.length))>0){for(;b--;xc[i++]=0){}}for(b=i;j>a;){if(xc[--j]<yc[j]){for(i=j;i&&!xc[--i];xc[i]=9){}--xc[i];xc[j]+=10}xc[j]-=yc[j]}for(;xc[--b]===0;xc.pop()){}for(;xc[0]===0;){xc.shift();--ye}if(!xc[0]){y.s=1;xc=[ye=0]}y.c=xc;y.e=ye;return y};P.mod=function(y){var yGTx,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(!y.c[0]){throwErr(NaN)}x.s=y.s=1;yGTx=y.cmp(x)==1;x.s=a;y.s=b;if(yGTx){return new Big(x)}a=Big.DP;b=Big.RM;Big.DP=Big.RM=0;x=x.div(y);Big.DP=a;Big.RM=b;return this.minus(x.times(y))};P.add=P.plus=function(y){var t,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(a!=b){y.s=-b;return x.minus(y)}var xe=x.e,xc=x.c,ye=y.e,yc=y.c;if(!xc[0]||!yc[0]){return yc[0]?y:new Big(xc[0]?x:a*0)}xc=xc.slice();if(a=xe-ye){if(a>0){ye=xe;t=yc}else{a=-a;t=xc}t.reverse();for(;a--;t.push(0)){}t.reverse()}if(xc.length-yc.length<0){t=yc;yc=xc;xc=t}a=yc.length;for(b=0;a;){b=(xc[--a]=xc[a]+yc[a]+b)/10|0;xc[a]%=10}if(b){xc.unshift(b);++ye}for(a=xc.length;xc[--a]===0;xc.pop()){}y.c=xc;y.e=ye;return y};P.pow=function(n){var x=this,one=new x.constructor(1),y=one,isNeg=n<0;if(n!==~~n||n<-MAX_POWER||n>MAX_POWER){throwErr("!pow!")}n=isNeg?-n:n;for(;;){if(n&1){y=y.times(x)}n>>=1;if(!n){break}x=x.times(x)}return isNeg?one.div(y):y};P.round=function(dp,rm){var x=this,Big=x.constructor;if(dp==null){dp=0}else if(dp!==~~dp||dp<0||dp>MAX_DP){throwErr("!round!")}rnd(x=new Big(x),dp,rm==null?Big.RM:rm);return x};P.sqrt=function(){var estimate,r,approx,x=this,Big=x.constructor,xc=x.c,i=x.s,e=x.e,half=new Big("0.5");if(!xc[0]){return new Big(x)}if(i<0){throwErr(NaN)}i=Math.sqrt(x.toString());if(i===0||i===1/0){estimate=xc.join("");if(!(estimate.length+e&1)){estimate+="0"}r=new Big(Math.sqrt(estimate).toString());r.e=((e+1)/2|0)-(e<0||e&1)}else{r=new Big(i.toString())}i=r.e+(Big.DP+=4);do{approx=r;r=half.times(approx.plus(x.div(approx)))}while(approx.c.slice(0,i).join("")!==r.c.slice(0,i).join(""));rnd(r,Big.DP-=4,Big.RM);return r};P.mul=P.times=function(y){var c,x=this,Big=x.constructor,xc=x.c,yc=(y=new Big(y)).c,a=xc.length,b=yc.length,i=x.e,j=y.e;y.s=x.s==y.s?1:-1;if(!xc[0]||!yc[0]){return new Big(y.s*0)}y.e=i+j;if(a<b){c=xc;xc=yc;yc=c;j=a;a=b;b=j}for(c=new Array(j=a+b);j--;c[j]=0){}for(i=b;i--;){b=0;for(j=a+i;j>i;){b=c[j]+yc[i]*xc[j-i-1]+b;c[j--]=b%10;b=b/10|0}c[j]=(c[j]+b)%10}if(b){++y.e}if(!c[0]){c.shift()}for(i=c.length;!c[--i];c.pop()){}y.c=c;return y};P.toString=P.valueOf=P.toJSON=function(){var x=this,Big=x.constructor,e=x.e,str=x.c.join(""),strL=str.length;if(e<=Big.E_NEG||e>=Big.E_POS){str=str.charAt(0)+(strL>1?"."+str.slice(1):"")+(e<0?"e":"e+")+e}else if(e<0){for(;++e;str="0"+str){}str="0."+str}else if(e>0){if(++e>strL){for(e-=strL;e--;str+="0"){}}else if(e<strL){str=str.slice(0,e)+"."+str.slice(e)}}else if(strL>1){str=str.charAt(0)+"."+str.slice(1)}return x.s<0&&x.c[0]?"-"+str:str};P.toExponential=function(dp){if(dp==null){dp=this.c.length-1}else if(dp!==~~dp||dp<0||dp>MAX_DP){throwErr("!toExp!")}return format(this,dp,1)};P.toFixed=function(dp){var str,x=this,Big=x.constructor,neg=Big.E_NEG,pos=Big.E_POS;Big.E_NEG=-(Big.E_POS=1/0);if(dp==null){str=x.toString()}else if(dp===~~dp&&dp>=0&&dp<=MAX_DP){str=format(x,x.e+dp);if(x.s<0&&x.c[0]&&str.indexOf("-")<0){str="-"+str}}Big.E_NEG=neg;Big.E_POS=pos;if(!str){throwErr("!toFix!")}return str};P.toPrecision=function(sd){if(sd==null){return this.toString()}else if(sd!==~~sd||sd<1||sd>MAX_DP){throwErr("!toPre!")}return format(this,sd-1,2)};Big=bigFactory();if(typeof define==="function"&&define.amd){define(function(){return Big})}else if(typeof module!=="undefined"&&module.exports){module.exports=Big}else{global.Big=Big}})(this);


//查询交易价格响应速度
var safeRequestTime = 400;
//交易价格
var thePrice;

//随机时间
var randomTime;
var xhr = new XMLHttpRequest();

//初始买一价格
var initBuy;
//初始卖一价格
var initSell;

//交易数量 str
var theAmount;
//交易进程ID
var autoTradeProcess;

//是否开始自动交易，防止重复开始
var running = false;
//屏蔽弹窗 
var alertBackup = window.alert
alert = console.log

//声音路径

//错误
var ele = document.createElement('audio')
ele.src = 'http://pic.ibaotu.com/00/56/52/64u888piCVyA.mp3'
ele.id = 'wrongAudio'
document.body.appendChild(ele)


//任务完成
ele = document.createElement('audio')
ele.src = 'http://pic.ibaotu.com/00/29/07/78w888piCFPd.mp3'
ele.id = 'finishAudio'
document.body.appendChild(ele)

//函数--------------------------------------------------

//提示消息字体设置
var msg = function(msg) {
    console.log("%c" + msg, "font-size:20px");
}
var error = function(msg) {
    console.log("%c" + msg, "color:red;font-size:20px");
}
var info = function(msg) {
    console.log("%c" + msg, "color:#999;font-size:16px");
}

var vital = function(msg) {
    console.log("%c" + msg, "color:blue;font-size:20px");
}




var updateRandomTime = function() {
    var second = randomSecond[0] + Math.round(Math.random() * (randomSecond[1] - randomSecond[0]))
    randomTime = second * 1000
}

var getValue = function(dom) {
    return dom.value;
}

var getInnerHTML = function(dom) {
    return dom.innerHTML;
}

var fillInput = function(dom, str) {
    dom.value = str;
}


var fillForm = function() {
    fillInput(buyPirceDOM, thePrice)
    fillInput(sellPirceDOM, thePrice)
    fillInput(buyAmountDOM, theAmount)
    fillInput(sellAmountDOM, theAmount)
}

var randomAmount = function(){


    theAmount = (theLevel[0] + Math.random() * (theLevel[1] - theLevel[0])).toFixed(thePoint);
}


//自动交易
var autoTradeNow = function() {
    
    thePrice = randomPrice(priceHigh, priceLow);
    randomAmount();
    fillForm(thePrice, theAmount)
    trade()
}


var safeDataCheck = function(sell, buy) {

    //这个判断没什么意义，若人为的更改自动产生的数值才会出错。
    //对于资金不足，买入或卖出的数量高于可用资金，也无法作出正确判断。
    // getValue(buyPirceDOM) === getValue(sellPirceDOM) && getValue(sellAmountDOM) === getValue(buyAmountDOM) && getValue(buyPirceDOM) === thePrice && theAmount === getValue(buyAmountDOM)

    return buy < Number(thePrice) && sell > Number(thePrice) && buy === Number(initBuy) && sell === Number(initSell);
}


var taskFinished = function(){

    vital('任务完成，已经完成放量: '+actualAmount)
    finishAudio.play()
    stopAutoTrade();
}

var stopAutoTrade = function() {
    clearTimeout(autoTradeProcess);
    running = false;
    vital('交易停止')
    document.title = '交易停止';
}

var startAutoTrade = function() {
    if (!running) {
        //初始买一价格
        initBuy = document.querySelector('#orderbook-buy > li:nth-child(1)').dataset.price
        //初始卖一价格
        initSell = document.querySelector('#orderbook-sell > li:nth-child(7)').dataset.price
        running = true;
        console.clear();
        vital('交易开始')
        msg('初始价格：\n卖一:' + initSell + ' \n买一:' + initBuy)
        autoTradeNow();
    }
}



var trade = function() {

    var safeRequest = true;
    var connected = true;


    var waitingProcess = setTimeout(function() {
        safeRequest = false;
    }, safeRequestTime)


    var connectProcess = setTimeout(function() {
        connected = false;
        error('网络错误，请检查VPN设置')
        stopAutoTrade()
    }, 5000)


    xhr.open('GET', 'https://api.coinegg.im/api/v1/ticker?coin=oc', true);
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {

            clearTimeout(connectProcess)

            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText)
                if (data.last && safeRequest) {
                    //关键判断,保证交易价格在卖一买一之间
                    if (safeDataCheck(Number(data.sell), Number(data.buy))) {


                        var randomBuyTime = Number((Math.random() * 100).toFixed(0)) + 100
                        var randomSellTime = Number((Math.random() * 150).toFixed(0))

                        //卖出 
                        setTimeout(function() {
                            tradeadd('sell')
                        }, randomSellTime)

                        //买入
                        setTimeout(function() {
                            tradeadd('buy')
                        }, randomBuyTime)

                        msg('交易成功')
                        msg('价格： ' + thePrice)
                        msg('数量 ： ' + theAmount)

                        totalAmount -= Number(theAmount);
                        actualAmount += Number(theAmount);

                        if(totalAmount <=0 ){
                            taskFinished();
                            return;
                        }
                    } else {

                        //这里失败是因为盘面买卖价格出现了变化，可以考虑复杂的处理机制，比如等待若干时间后再操作；判断盘面活跃度；
                        error('交易失败')
                        error('卖一价格:' + data.sell)
                        vital('初始卖一:' + initSell)
                        info('\n')
                        error('买一价格:' + data.buy)                      
                        vital('初始买一:' + initBuy)
                        error('对敲价格:' + thePrice)

                        //if(mode === 'MAX')
                        //最大化模式，自动抓取买一卖一价格，修改随机范围。
                        wrongAudio.play();

                    }

                    //执行下一次随机买卖
                    updateRandomTime();
                    setTitleTime()
                    info(new Date().toLocaleString())
                    vital('----------------------------')
                    autoTradeProcess = setTimeout(autoTradeNow, randomTime);

                } else {
                    info('超过安全响应速度，有交易风险')
                    info('1秒后重试')
                    autoTradeProcess = setTimeout(trade, 1000);
                }
            } else {
                error('交易请求被拒绝，请重新刷新网页')
                stopAutoTrade();
                wrongAudio.play();
            }
        }
    }

    xhr.send();
}




//设定title为下一次交易倒计时
var setTitleTime = function() {
    var time = Math.round(randomTime / 1000);

    setInterval(function() {
        if (time < 0) {
            clearInterval(this.callee)
        } else {
            document.title = time;
            time--;
        }
    }, 1000)
}


function randomPrice(priceHigh, priceLow) {
    //高低价相减
    var bigNumHigh = new Big(priceHigh)
    var bigNumLow = new Big(priceLow)
    var precisionHigh = getPrecision(priceHigh)
    var precisionLow = getPrecision(priceLow)
    var precision = precisionHigh > precisionLow ? precisionHigh : precisionLow;
    var num = bigNumHigh.sub(bigNumLow);
    //最小步长
    var step = getStep(num)
    //变化范围 整数
    var range = num.times(Math.pow(10, precision))
    var random = Math.round(range * Math.random())
    var randomPrice = bigNumLow.add(step.times(random));
    return scientificToString(randomPrice)

    function scientificToString(bigNum) {
        return bigNum.e > -7 ? bigNum.toString() : bigNum.toFixed(-bigNum.e + bigNum.c.length - 1)
    }

    function getStep(bigNum) {
        var str = scientificToString(bigNum),
            point;
        try {
            point = str.split(".")[1].length
        } catch (e) {
            point = 0;
        }

        if (point) {
            return Big(Math.pow(10, -precision))
        } else {
            return Big(1)
        }
    }

    function getPrecision(strNum) {
        var point;
        try {
            point = strNum.split(".")[1].length
        } catch (e) {
            point = 0;
        }

        return point;
    }
}

startAutoTrade()