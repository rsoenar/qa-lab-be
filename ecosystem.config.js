module.exports = {
    apps: [{
        name: "QALab",
        script: "./src/server.js",
        //    instances : 2,
        //    exec_mode : "cluster",
        // autorestart: false,
        max_memory_restart: '2G',
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}
