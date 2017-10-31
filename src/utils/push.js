import * as types from '@/store/types'
import { MathRand } from '@/utils/tools.js'
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
        initScoket() {
            let _this = this;
            let rand = this.$ls.get('rand');
            if (rand == null) {
                rand = MathRand();
                this.$ls.set('rand', rand);
            }
            // 建立WebSocket链接
            let ws = new WebSocket(this.$api.ws + '/iron?' + this.$store.state.loginId + rand);

            ws.onopen = function(evt) {
                console.log("消息推送链接成功");
            };

            ws.onmessage = function(evt) {
                let data = JSON.parse(evt.data);
                _this.isNotice = false;
                _this.msg = data;
                _this.notify(data);
                _this.$store.commit(types.UPDATE_PUSH_MSG, data);
            };

            ws.onclose = function(evt) {
                console.log("Connection closed.");
            };

            if (window.Notification)
                Notification.requestPermission();
        },
        notify(msg) {
            let title = msg.title;
            let body = msg.body;
            let icon = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com/2017/10/24/jdb_' + msg.code + '.png';
            if (window.Notification && Notification.permission == 'granted') {
                let notif = new Notification(title, {
                    body: body, //通知的具体内容
                    icon: icon,
                    requireInteraction: true
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
                            document.title = '【你有新消息】' + document.title;
                        } else {
                            document.title = '【　　　　　】';
                        }
                    }, 500);
                }
            }
        }
    }
}