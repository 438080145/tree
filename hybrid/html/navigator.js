const mapAppList = [
  { title: "百度地图" },
  { title: "腾讯地图" },
  { title: "高德地图" },
];

function setTimeoutMyFn(data, setData) {
  window.location.href = data;
  // window.setTimeout(() => {
  //   window.location.href = setData;
  // }, 1000);
}

// 弹出系统选择按钮框
function chooseMap() {
  plus.nativeUI.actionSheet(
    { title: "选择地图", cancel: "取消", buttons: mapAppList },
    function (e) {
      console.log(JSON.stringify(e,cacheMarker));
      let app = mapAppList[e.index - 1];
      app && goToMapApp(app.title);
    }
  );
}
const iOSBaidu = (to) => {
  return `baidumap://map/direction?destination=name:${to.name}|latlng:${to.latitude},${to.longitude}&coord_type=gcj02&mode=driving&src=ios.jianghu.jianhao`
}

const andriodGaode = (to) => {
  return `amapuri://route/plan/?sourceApplication=mhc&dlat=${to.latitude}&dlon=${to.longitude}&dname=${to.name}&dev=0&t=0`
}

const iOSGaode = (to) => {
  return `iosamap://path?sourceApplication=applicationNameslat=&slon=&dlat=${to.latitude}&dlon=${to.longitude}&dev=1&t=0`
}

// var cacheMarker = {"id":108,"title":"刯动画",address:"中山市西区天悦城","longitude":113.35213621264474,"latitude":22.521694332340385,origin:{"longitude":113.35213621264474,"latitude":22.521694332340385}};
var cacheMarker = null;
function goToMapApp(name) {
  let destination = cacheMarker.address || cacheMarker.title;
  
  // 根据地图类型使用对应的坐标系
  let baiduLatitude = cacheMarker.baiduLatitude || cacheMarker.latitude;
  let baiduLongitude = cacheMarker.baiduLongitude || cacheMarker.longitude;
  let gcj02Latitude = cacheMarker.gcj02Latitude || cacheMarker.latitude;
  let gcj02Longitude = cacheMarker.gcj02Longitude || cacheMarker.longitude;
  
  console.log('导航坐标选择:');
  console.log('百度坐标 (BD09):', baiduLongitude, baiduLatitude);
  console.log('高德坐标 (GCJ02):', gcj02Longitude, gcj02Latitude);
  
  let android = {
    bd:`baidumap://map/marker?location=${baiduLatitude},${baiduLongitude}&title=${encodeURIComponent(destination)}&content=${encodeURIComponent(destination)}&src=悦商云APP`,
    tx:`qqmap://map/marker?marker=coord:${gcj02Latitude},${gcj02Longitude};title:${destination};addr:${destination}&referer=悦商云APP`,
    gd:`amapuri://route/plan/?sourceApplication=mhc&dlat=${gcj02Latitude}&dlon=${gcj02Longitude}&dname=${cacheMarker.title}&dev=0&t=0`,
  }
  let ios = {
    bd:`baidumap://map/marker?location=${baiduLatitude},${baiduLongitude}&title=${encodeURIComponent(destination)}&content=${encodeURIComponent(destination)}&src=悦商云APP`,
    tx:`qqmap://map/marker?marker=coord:${gcj02Latitude},${gcj02Longitude};title:${destination};addr:${destination}&referer=悦商云APP`,
    gd:`iosamap://path?sourceApplication=applicationNameslat=&slon=&dlat=${gcj02Latitude}&dlon=${gcj02Longitude}&dev=0&t=0`,
    ap:`http://maps.apple.com/?q=${cacheMarker.address}&sll=${gcj02Latitude},${gcj02Longitude}&z=10&t=s`,
  }
  let map = IsAndroid() ? android : ios;
  switch (name) {
    case "百度地图":
        window.location.href = map.bd;
      break;
    case "腾讯地图":
      window.location.href = map.tx;
      break;
    case "高德地图":
      window.location.href = map.gd;
      break;
    case "苹果地图":
      window.location.href = map.ap;
      break;
    default:
      break;
  }
  name !== '苹果地图' && openAlert(`${ IsAndroid()?'':'如无响应，'}请先下载${name}`)
}
function IsAndroid() {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    return true;
  }
}
!IsAndroid() && mapAppList.push({ title:'苹果地图' })
function openAlert(msg){
	setTimeout(()=>{
		document.getElementById('msg').innerText = msg
		document.querySelector('.alert-mask').style.display = 'block'
	},600)
}
function closeAlert(){
	document.querySelector('.alert-mask').style.display = 'none'
}