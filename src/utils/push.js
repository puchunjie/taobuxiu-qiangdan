export default {
    data() {
        return {
            isFocus: true,
            titleInit: document.title,
            stl: '',
            msg: '默认通知',
            isNotice: true
        }
    },
    methods: {
        MathRand() {
            var Num = "";
            for (var i = 0; i < 6; i++) {
                Num += Math.floor(Math.random() * 10);
            }
            this.$ls.set('rand', Num);
            return Num
        },
        initScoket() {
            let _this = this;
            let rand = this.$ls.get('rand') != null ? this.$ls.get('rand') : this.MathRand();
            // 建立WebSocket链接
            let ws = new WebSocket('ws://' + window.location.host + ':8080/websocket/iron?' + this.$store.state.loginId + rand);

            ws.onopen = function(evt) {
                console.log("Connection open ...");
            };

            ws.onmessage = function(evt) {
                console.log("Received Message: " + evt.data);
                _this.isNotice = false;
                _this.msg = evt.data;
                _this.notify(evt.data)
            };

            ws.onclose = function(evt) {
                console.log("Connection closed.");
            };

            if (window.Notification)
                Notification.requestPermission();
        },
        notify(msg) {
            let title = msg.split("/")[0];
            let body = msg.split("/")[1];
            if (window.Notification && Notification.permission == 'granted') {
                let notif = new Notification(title, {
                    body: body //通知的具体内容
                });
                this.isNotice = true;
            } else {
                if (this.isFocus) {
                    this.$Notice.success({
                        title: title,
                        desc: body
                    });
                    this.isNotice = true;
                } else {
                    this.stl = setInterval(function() {
                        let title = document.title;
                        if (/新/.test(title) == false) {
                            document.title = '【你有新消息】';
                        } else {
                            document.title = '【　　　　　】';
                        }
                    }, 500);
                }
            }
        }
    },
    created() {
        document.addEventListener('visibilitychange', () => {
            let isHidden = document.hidden;
            if (isHidden) {
                this.isFocus = false;
            } else {
                this.isFocus = true;
                document.title = this.titleInit;
                window.clearInterval(this.stl);
                if (!this.isNotice) {
                    this.notify(this.msg)
                }

            }
        });
        if (window.location.hostname != 'localhost')
            this.initScoket();
    }
}