/* BEGIN: Model for our App Item */
/* If you have seprate files that use this model then your model in a separate AppItem.js file */
/* BEGIN: Model for our App Item */
/* If you have seprate files that use this model then your model in a separate AppItem.js file */
var AppItem = function (appname,
                        appid,
                        iphoneid,
                        androidid,
                        deviceid,
                        subscriberid,
                        simcardsn,
                        ipaddress,
                        ipaddress2,
                        macaddress,
                        devicename,
                        appversion,
                        sdk,
                        name,
                        ph,
                        email,
                        city,
                        state,
                        ctry,
                        pc,
                        lat,
                        lng,
                        fr,
                        authorized,
                        id) {
    this.appname = appname || "SC01";
    this.appid = appid || "00000000-0000-0000-0000-000000000000";
    this.iphoneid = iphoneid || "IPHONE ID";
    this.androidid = androidid || "ANDROID ID";
    this.deviceid = deviceid || "DEVICE ID";
    this.subscriberid = subscriberid || "SUBSCRIBER ID";
    this.simcardsn = simcardsn || "SIM CARD SERIAL NUMBER";
    this.ipaddress = ipaddress || "IPADDRESS";
    this.ipaddress2 = ipaddress2 || "IPADDRESS2";
    this.macaddress = macaddress || "MAC ADDRESS";
    this.devicename = devicename || "DEVICE NAME";
    this.appversion = appversion || "2|2.0.0";
    this.sdk = sdk || "SDK";
    this.name = name || "Bill SerGio";
    this.ph = ph || "000-000-0000";
    this.email = email || "tvmogul1@gmail.com";
    this.city = city || "Groom Lake";
    this.state = state || "NV";
    this.ctry = ctry || "USA";
    this.pc = pc || "89044";
    this.lat = lat || 37.312018;
    this.lng = lng || -114.594955;
};

// var appItem = new AppItem(_appid, _appname, _appversion, _sdk, _dn, _ph, _email, _city, _state, _ctry, _pc, _lat, _lng, _fr);

AppItem.prototype.toString = function () {
    return "AppId = " + this.appid + ", " +
		   "AppName = " + this.appname + ", " +
		   "AppVersion = " + this.appversion + ", " +
		   "SDK = " + this.sdk + ", " +
		   "DeviceName = " + this.dn + ", " +
		   "Phone = " + this.ph + ", " +
		   "Email = " + this.email + ", " +
		   "City = " + this.city + ", " +
		   "State = " + this.state + ", " +
           "Country = " + this.ctry + ", " +
		   "PostalCode = " + this.pc + ", " +
		   "Latitude = " + this.latitude + ", " +
		   "Longitude = " + this.longitude + ", ";
};
/* END: Model for our Url Item */



