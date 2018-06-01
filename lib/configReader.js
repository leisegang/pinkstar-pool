var fs = require('fs');

var configFile = (function(){
    for (var i = 0; i < process.argv.length; i++){
        if (process.argv[i].indexOf('-config=') === 0)
            return process.argv[i].split('=')[1];
    }
    return 'config.json';
})();


try {
    global.config = JSON.parse(fs.readFileSync(configFile));
}
catch(e){
    console.error('Failed to read config file ' + configFile + '\n\n' + e);
    return;
}

var donationAddresses = {
    devDonation: {
        PSTAR: 'P6ZDs32zWmAgoXE6Caom2L7nNaKRtNjqvFsv6NQp8XzUZsB47V8XRPCG7dzLf59KPMXhyjLpPbSqyWaYpaDNwV121EFsG4Btr'
    },
    coreDevDonation: {
        PSTAR: 'P6aWWbiLh3rTsQ3DsBFhbgLJzpeypBACBjDBYXjrLJ9DZh2anm7ttFvTCuFELy1EnwRpiiYwk2jXBQxE1Mqu9Vu92RirC4gMq'
    },
    extraFeaturesDevDonation: {
        PSTAR: 'P6YwNCNZEGSdr1mKk2QGW9XB2MCkqFAejVGKAcTUGXJWTs82uEVtNp9E8Nipm9yFLkXpZuvegycNDj1KLx1CBJ5E1VqKbKuRE'
    }
};

global.donations = {};

for(var configOption in donationAddresses) {
    var percent = config.blockUnlocker[configOption];
    var wallet = donationAddresses[configOption][config.symbol];
    if(percent && wallet) {
        global.donations[wallet] = percent;
    }
}

global.version = "v1.2.0";