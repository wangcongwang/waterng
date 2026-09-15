<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>下单流程 · 讲解时要注意</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            以下五条都来自代码核对，建议在演示前就先说明口径
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 40:60） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左栏 */}
        <Box style={{ width: 402, background: '#202259', borderRadius: 10, padding: '26px 24px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>ALIGN FIRST</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, marginTop: 12 }}>
                为什么要
                <br />
                提前对齐口径
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                界面上出现的英文文案很容易被当成"已经做好的能力"。但代码里有一批文案是写了没接通的，还有两处数字口径本身不一致。今天不澄清，明天就会变成需求误判。
            </Text>

            <Box style={{ flexDirection: 'column', gap: 12, marginTop: 22 }}>
                {[
                    { k: '2 处', v: '数字口径不一致' },
                    { k: '5 个', v: '文案已定义但未接线' },
                    { k: '1 处', v: '文案与位置错配' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'rgba(42,167,207,0.16)', borderRadius: 8 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#7FD3EC' }}>{it.k}</Text>
                            <Text style={{ fontSize: 16, color: '#D6E2F5' }}>{it.v}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.5 }}>
                    建议对外统一说法：当前为演示版本，以下能力待排期。
                </Text>
            </Box>
        </Box>

        {/* 右栏：五条清单 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            {[
                { n: '01', t: '步骤条只用了 3 格，文案却有 6 套', d: '文案表里定义了六步（Delivery & contact 一直到 Review & place），页面只用三格，且第三格复用了 "Review & place" 那一条，与显示的 Shipping / pickup 对不上。', tag: '文案错配' },
                { n: '02', t: '结算摘要里没有运费和税费', d: '摘要只有件数、小计、运费占位、总计，总计等于商品小计。7.5% 税率只在订单详情页和账户订单页事后算出来展示，会出现结算金额与订单金额不一致的观感。', tag: '口径不一' },
                { n: '03', t: 'USSD 码是写死的', d: '页面上固定显示 *737*50*100000#，不随订单金额变化。文案表里其实有一条带金额占位符的模板，但没有被使用。', tag: '未接线' },
                { n: '04', t: '订单只存在本机浏览器里', d: '换设备、换浏览器或清缓存后订单打不开，详情页已经内置了这句说明。"把订单邮件发送"实际只是唤起本地邮件客户端，没有服务端投递。', tag: '架构限制' },
                { n: '05', t: '取消订单、物流追踪、催发货都还没做', d: 'Pay now / Track / Urge shipping / Cancelled 这批文案已经在文案表里，但全站没有任何按钮接线到它们。讲解时不要声称支持这些操作。', tag: '未实现' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: '#F4F6F8', borderRadius: 8, padding: '0 16px', borderLeft: '4px solid ' + (i === 4 ? '#F287B7' : '#2AA7CF') }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace', width: 34 }}>{it.n}</Text>
                        <Box style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                            <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.45, marginTop: 3 }}>{it.d}</Text>
                        </Box>
                        <Box style={{ padding: '3px 10px', background: i === 4 ? 'rgba(242,135,183,0.2)' : '#FFFFFF', borderRadius: 4, border: '1px solid #E3E6E8' }}>
                            <Text style={{ fontSize: 13, color: i === 4 ? '#B3528A' : '#5C646A', fontWeight: 'bold' }}>{it.tag}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>13 / 25</Text>
    </Box>
</Slide>
