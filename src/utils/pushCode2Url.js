export const code2Url = (value) => {
    switch (Number(value)) {
        case 1:
            return '/seller/Sbuys-1'
            break;
        case 2:
            return '/buyer/Bbuys-1'
            break;
        case 3:
            return '/seller/Sbuys-1'
            break;
        case 4:
            return '/buyer/Bbuys-1'
            break;
        case 5:
            return '/buyer/Bbuys-1'
            break;
        case 21:
            return '/seller/SironOrder'
            break;
        case 22:
            return '/seller/SplanOrder'
            break;
        case 23:
            return '/seller/SspecialOrder'
            break;
        case 24:
            return '/buyer/BironOrder'
            break;
        case 25:
            return '/buyer/BplanOrder'
            break;
        case 26:
            return '/buyer/BspecialOrder'
            break;
        case 27:
            return '/buyer/BironOrder'
            break;
        case 28:
            return '/buyer/BplanOrder'
            break;
        case 29:
            return '/buyer/BspecialOrder'
            break;
        case 32:
            return '/buyer/BocAuthen-1'
            break;
        case 33:
            return '/buyer/BocAuthen-1'
            break;
        case 341:
            return '/buyer/BocManage-1'
            break;
        case 342:
            return '/seller/SocManage-2'
            break;
        case 351:
            return '/buyer/BocManage-1'
            break;
        case 352:
            return '/seller/SocManage-2'
            break;
        case 361:
            return '/buyer/BocManage-1'
            break;
        case 362:
            return '/seller/SocManage-2'
            break;
        default:
            break;
    }
}