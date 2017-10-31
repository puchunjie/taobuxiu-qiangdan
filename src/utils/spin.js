import { Spin } from 'iview';
export const spinToggle = (show) => {
    if (show) {
        Spin.show({
            render: (h) => {
                return h('div', [
                    h('div', {
                        'class': 'ajax-spin-img',
                    })
                ])
            }
        });
    } else {
        Spin.hide();
    }
}