<template>
    <div class="previewBody">
        <h2>三方购销合作服务协议</h2>
        <P class="p-info">合同编号：{{previewData.contractShowId}}</P>
        <h3>服务方（甲方）：<span class="l">{{previewData.systemAppName}}</span></h3>
        <h3>委托方（乙方）：<span class="l">{{previewData.partAContractName}}</span></h3>
        <h3>供货方（丙方）：<span class="l">{{previewData.partBContractName}}</span></h3>
        <P>依据《中华人民共和国合同法》及中华人民共和国其他相关的法律法规，服务方（甲方）、认证方（乙方）、供货方（丙方）三方经充分协商一致，在平等互利、提高效率、节约资源原则下（以下简称甲方、乙方、丙方），其授权代表就产品买卖达成以下条款共同遵守：</P>
        <h3>一、服务方式及内容</h3>
        <p>甲方通过自有网站、小程序、APP、微信等方式为乙方提供丙方资源，乙方根据自身需求自由选择甲方平台认证供货方并委托甲方代采购。</p>
        <h3>二、服务内容及责任</h3>
        <P>乙方委托甲方采购的订单</P>
        <p>（一）乙方通过甲方自有网站、APP、微信等其他方式直接与丙方（甲方认证供货方）沟通产品规格明细、交货期、价格、免责条款等，丙方以甲方发出的确认备货通知确认订单生效（除合同原件外，合同的传真件、扫描件、电子邮件为合同有效形式之一）。</p>
        <p>（二）丙方对每一订单可预见的状况给予全面且完整的书面风险提示，并根据乙方要求配合甲方工作人员的正常工作（甲方根据乙方要求验货：产品元素、包装等与产品相关的要求）。</p>
        <p>（三）乙方如认为代采购货品不合格，应在提货后<span class="l">{{ previewData.inspectionTime }}</span>日内与丙方进行沟通并提出书面异议，甲方与丙方确认货品不合格系由丙方原因造成，可为乙方提供先行赔付保障。乙方应当以适当的方式保存不合格货品，以防止它们损坏、遭窃或遭受其他损失，直到它们被返还给丙方，否则甲方有权拒绝先行赔付，丙方有权拒绝相关赔偿。</p>
        <p>（四）丙方保证所供产品必须为正品且应符合国家标准。丙方需根据甲乙双方要求提供：产品材质单，质量体系认证，加工厂环评批复等可提供的符合国家标准的证书、证件，带公章复印件。</p>
        <h3>三、货物明细、交货地点、交货期限以及发货凭证：</h3>
        <p>货物明细、费用、交货地点、交货期限等详情见尾部附页，丙方以甲方提货委托函为发货凭证并保留提货人有效证件信息。 </p>
        <h3>四、结算方式、服务流程及发票</h3>
        <p>（一）三方采用以下认可的付款方式<span class="l">{{previewData.payMent}}</span>(1电汇、2支票、3承兑）进行结算。</p>
        <p>（二）乙方确认代采购订单明细后，由甲方或者丙方生成此合同。</p>
        <p>（三）甲方收到乙方支付的代采购定单货款后按照与丙方约定的付款方式及期限支付款项，丙方根据乙方订单要求备货。</p>
        <p>（四）丙方在货物全部安排妥当后通知甲乙双方安排提货时间。</p>
        <p>（五）丙方于每月<span class="l">{{previewData.invoiceDate}}</span>日前为甲方开具全额交易项下增值税专用发票( 17%税率)。甲方于每月月底前为乙方开具全额交易项下增值税专用发票（17%税率）。</p>
        <h3>五、不可抗力及风险承担：</h3>
        <p>丙方因不可抗力不能如期交货时，应积极采取措施防止损失扩大并及时通知甲乙双方。丙方凭有权机关出具的证明，不承担违约责任。丙方没有积极采取措施，或者未及时通知甲乙双方，应当对甲乙双方的损失承担全部赔偿责任（包含律师费）。</p>
        <h3>六、违约责任：</h3>
        <p>（一）乙方无正当理由终止合同造成甲方、丙方的经济损失（包含律师费）均由乙方全部承担。</p>
        <p>（二）丙方未能在约定时间内交货造成乙方损失，均由丙方全部承担。</p>
        <p>（三）丙方提供的产品为假货或质量不合格导致乙方产生的一切损失（包含律师费）均由丙方承担。由丙方直接与乙方沟通定责定损并及时通知甲方，甲方协助双方沟通，责任及赔偿方案明确后由甲方先行赔付，丙方应承担的赔偿由甲方从未结算的货款里扣除，若损失金额超出未结算货款，丙方应于责任明确及赔偿方案落实到位三个工作日之内将赔付款项汇至甲方指定账户，其他赔偿方案以书面说明为准。如逾期，每逾期<span class="l">壹</span>日，应承担<span class="l">百分之一</span>逾期违约金。</p>
        <h3>七、合同争议的解决：</h3>
        <p>三方在履行合同中如发生争议，应先协商解决，协商不成的，向甲方住所地有管辖权的人民法院起诉。</p>
        <h3>八、合同生效：</h3>
        <p>（一）本合同由三方授权代表签字或加盖公司印章后生效。</p>
        <p>（二）三方基于本合同交易的订单、委托函、确认书均具有法律效力。订单、委托函、确认书的传真件、复印件与原件具有同等法律效力。</p>
        <p>（三）本合同一式三份，三方各执一份具有同等法律效力</p>
        <br><br>
        <div class="clearfix">
            <div class="per">
                <P>甲方：{{previewData.systemAppName}}</P>
                <p>代理人：{{previewData.systemAppName}}</p>
                <P>签订日期：{{previewData.systemTime | dateformat('yyyy-MM-dd')}}</P>
                <p>联系电话：{{previewData.systemAppTel}}</p>
            </div>
            <div class="per">
                <P>已方：{{previewData.partAContractName}}</P>
                <p>代理人：{{previewData.partAContractContact}}</p>
                <P>签订日期：{{previewData.systemTime | dateformat('yyyy-MM-dd')}}</P>
                <p>联系电话：{{previewData.partAContractTel}}</p>
            </div>
            <div class="per">
                <P>丙方：{{previewData.partBContractName}}</P>
                <p>代理人：{{previewData.partBContractContact}}</p>
                <P>签订日期：{{previewData.systemTime | dateformat('yyyy-MM-dd')}}</P>
                <p>联系电话：{{previewData.partBContractTel}}</p>
            </div>
        </div>
        <h3>附页：</h3>
        <p style="text-align:center;font-size:14px;font-weight:bold;margin-bottom:20px">无锡淘不锈电子商务有限公司代采购单</p>
        <p style="margin-bottom:30px">
            <table class="tables">
                <tr>
                    <td colspan="4">委托方：{{previewData.partAContractName}}</td>
                    <td colspan="4">供货方：{{previewData.partBContractName}}</td>
                    <td colspan="3">采购单号：{{previewData.contractShowId}}</td>
                </tr>
                <tr>
                    <td colspan="2">联系人：{{previewData.partAContractContact}}</td>
                    <td colspan="2">联系电话：{{previewData.partAContractTel}}</td>
                    <td colspan="2">联系人：{{previewData.partBContractContact}}</td>
                    <td colspan="2">联系电话：{{previewData.partBContractTel}}</td>
                    <td colspan="3">交货仓库：{{ previewData.deliveryHouse }}</td>
                </tr>
            </table>
        </p>
        <p>
            <table class="tables">
                <tr>
                    <td>序号</td>
                    <td>货品名称</td>
                    <td>材质</td>
                    <td>规格及型号</td>
                    <td>公差产地</td>
                    <td>数量</td>
                    <td>重量(吨)</td>
                    <td>计价方式</td>
                    <td>单价(元/每单位)</td>
                    <td>总金额</td>
                    <td>备注</td>
                </tr>
                <tr v-for="(info,index) in previewData.orderIds" :key="info.index">
                    <td>{{index+1}}</td>
                    <td>{{info.ironTypeName}}</td>
                    <td>{{ info.materialName }}/{{ info.surfaceName }}</td>
                    <td>{{ info.specifications ? info.specifications :`${info.height}*${info.width}*${info.length}` }}</td>
                    <td>{{ info.tolerance }}</td>
                    <td><span v-show="info.numbers > 0">{{info.numbers}}</span></td>
                    <td><span v-show="info.weights > 0">{{info.weights}}</span></td>
                    <td>{{ info.priceMode | priceModeStr }}</td>
                    <td>{{info.price}}</td>
                    <td>{{info.orderTotalPrice}}</td>
                    <td>{{info.remark}}</td>
                </tr>
                <tr v-for="(info,index) in previewData.costs" :key="info.index">
                    <td>{{previewData.orderIds.length + index + 1}}</td>
                    <td>{{info.ironTypeName}}</td>
                    <td>{{info.materialName}}</td>
                    <td>{{ info.specifications }}</td>
                    <td>{{ info.tolerance }}</td>
                    <td><span v-show="info.numbers > 0">{{info.numbers}}</span></td>
                    <td><span v-show="info.weights > 0">{{info.weights}}</span></td>
                    <td>{{ info.priceMode | priceModeStr }}</td>
                    <td>{{info.price}}</td>
                    <td>{{info.orderTotalPrice}}</td>
                    <td>{{info.remark}}</td>
                </tr>
                <tr>
                    <td>合计：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span v-show="totleNums.number > 0">{{ totleNums.number }}</span></td>
                    <td><span v-show="totleNums.weight > 0">{{ totleNums.weight }}</span></td>
                    <td></td>
                    <td></td>
                    <td>{{previewData.totlePrice }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>总金额：</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{previewData.totlePrice | numToCny }}</td>
                    <td></td>
                </tr>
            </table>
        </p>
        <P style="margin-top: 20px">交货地点：{{previewData.locationName}}</P>
        <P>交货期限：{{previewData.deliveryTerm | dateformat('yyyy-MM-dd')}}前，特殊情况提前沟通。</P>
        <P>质量标准：产品符合生产厂家出厂标准，以货品相对应的质量证明书为准。</P>
        <P>备 注：{{previewData.remark}}</P>
        <p>以上附页详情由乙方、丙方沟通确认，确认无误请盖章确认。</p>
    </div>
</template>

<script>
    export default {
        props: {
            previewData: Object
        },
        filters: {
            priceModeStr(value) {
                switch (Number(value)) {
                    case 1:
                        return '数量'
                        break;
                    case 2:
                        return '重量'
                        break;
                    default:
                        break;
                }
            }
        },
        computed: {
            totleNums() {
                let numbers = 0,
                    weights = 0;
                this.previewData.orderIds.forEach(el => {
                    numbers += Number(el.numbers);
                    weights += Number(el.weights);
                })
                this.previewData.costs.forEach(el => {
                    numbers += Number(el.numbers);
                    weights += Number(el.weights);
                })
                return {
                    number: numbers,
                    weight: weights
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .previewBody {
        h2 {
            text-align: center;
            font-size: 15px;
            font-weight: bolder
        }
        h3 {
            margin: 10px 0;
            font-weight: bold;
        }
        p {
            text-indent: 2em;
            &.p-info {
                text-align: right;
            }
        }
        .b {
            font-weight: bold;
        }
        .l {
            color: red;
            font-weight: bold;
        }
        .tables {
            width: 100%;
            td {
                border: 1px solid #a1a1a1;
                line-height: 30px;
            }
        }
        .per {
            width: 50%;
            float: left;
            height: 90px;
        }
    }
</style>