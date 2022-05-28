const dropboxV2Api = require('dropbox-v2-api');
const fs = require('fs');

//
const token="sl.BIf3t7gpFCZ1e55eYGJRDrTQmrU-v_U49mIp9QqZxtGI2yY3c2Aod1BOLQ4Z6YElZAosnHtNpO-iGbmRr7IVvLcjXFbZUJDXWYlEV7Oi91HjY8oUcACdvN2tibdAxOtBZQ8I4y4";

// create session ref:
var dropbox = dropboxV2Api.authenticate({
    token: token
});

 module.exports = {
    upload: (file)=>{
        dropbox = dropboxV2Api.authenticate({
            token: token
        })
        console.log("Uploading "+file);
        dropbox({
            resource: 'files/upload',
            parameters: {path: '/dropbox/Apps/'+file},
            readStream: fs.createReadStream('./uploads/'+file)
        }, (err, result, response) => {
            if(err){
                console.log("Uploading error "+JSON.stringify(err));
                console.log("result"+JSON.stringify(result));
                console.log("result"+result);
            }
            console.log("Uploading completed ");
            fs.unlinkSync('./uploads/'+file);
        });
    },
    
    download: (file)=>{
        dropbox({
            resource: 'files/download',
            parameters: {path: '/dropbox/Apps/'+file}
        }, (err, result, response) => {
            if(err){
                console.log("Downloading error "+JSON.stringify(err));
                return false;
            }
        })
        .pipe(fs.createWriteStream('./downloads/'+file));
        return true;
    }
 }