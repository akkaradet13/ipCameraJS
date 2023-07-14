const app = require("express")();
const Strem = require("node-rtsp-stream")

const streams = {};

const stream_configs = [{
    key: 'clb',
    port: 554,
    url: 'rtsp://somprasong:tum12345@192.168.41.19',
}]

const startStream = (name,stremUrl,wsPort) => {
    const stream = new Strem({
        name,
        stremUrl,
        wsPort,
        ffmpegOptions: {
            "-stars": "",
            "-r": 30,
        },
    });

    streams[wsPort] = stream;
}

app.get('start-strem', (req,res) => {
    const {url, port, key = "stream" } = req.query;
    if(!url && !port){
        return res.json({
            message: "Bad input",
        })
    }
    if (strem[port]){
        return res.json({
            message: "Port is in use",
        })
    }
    startStream(key, url, port)

    res.json({
        message: "Started Stream",
    });
});
app.listen(800, () =>{
    console.log('sssss');
    stream_configs.forEach((config) => {
        startStream(config.key,config.url,config.port)
    })
    // rtsp://somprasong:tum12345@192.168.41.19:554/cam/realmonitor?channel=1&subtype=0
})