<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>订单在账户里怎么展示</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            分桶只看两个字段：权益归属人和实际操作人
        </Text>
    </Box>

    {/* ===== B 区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：订单卡结构 */}
        <Box style={{ width: 720, background: '#F4F6F8', borderRadius: 10, padding: 16, justifyContent: 'center' }}>
            <svg width={688} height={500} viewBox='0 0 688 500'>
                {/* 卡头 */}
                <rect x='0' y='0' width='688' height='140' rx='10' fill='#FFFFFF' stroke='#E3E6E8' strokeWidth='1.5' />
                <text x='22' y='40' fill='#2AA7CF' fontSize={19} fontWeight='bold' fontFamily='Menlo, ui-monospace, monospace'>AQ-7K2MNP</text>
                <line x1='22' y1='52' x2='160' y2='52' stroke='#2AA7CF' strokeWidth='2' />
                <text x='14' y='44' fill='#2AA7CF' fontSize={19} fontWeight='bold' fontFamily='Menlo, ui-monospace, monospace'> </text>
                <rect x='22' y='62' width='86' height='26' rx='13' fill='rgba(32,34,89,0.08)' />
                <text x='65' y='80' fill='#202259' fontSize={14} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>My order</text>
                <rect x='118' y='62' width='76' height='26' rx='13' fill='rgba(31,107,63,0.12)' />
                <text x='156' y='80' fill='#1F6B3F' fontSize={14} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>Paid</text>
                <rect x='592' y='60' width='76' height='30' rx='6' fill='#202259' />
                <text x='630' y='80' fill='#FFFFFF' fontSize={14} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>Download</text>
                <text x='22' y='116' fill='#5C646A' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>日期 · 付款方式 · 订单类型 —— 卡头一行看全</text>

                {/* 表格 */}
                <rect x='0' y='156' width='688' height='264' rx='10' fill='#FFFFFF' stroke='#E3E6E8' strokeWidth='1.5' />
                <rect x='14' y='170' width='660' height='34' rx='6' fill='rgba(32,34,89,0.06)' />
                {['商品编码', '商品', '数量', '单价', '总价', '总 BV'].map(function (h, i) {
                    var xs = [26, 116, 330, 396, 500, 620];
                    return (
                        <text key={i} x={xs[i]} y={193} fill='#202259' fontSize={14} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>{h}</text>
                    );
                })}
                {[
                    { c: 'ELK-CAL01', n: 'Calmag', q: '2', p: '₦38,000', t: '₦76,000', b: '70 BV' },
                    { c: 'ELK-AAR02', n: 'Advanced Age Recovery', q: '1', p: '₦68,000', t: '₦68,000', b: '62 BV' },
                ].map(function (r, i) {
                    var y = 224 + i * 52;
                    return (
                        <g key={i}>
                            <rect x='14' y={y} width='660' height='44' rx='6' fill={i % 2 === 0 ? '#FFFFFF' : '#F8F9FA'} />
                            <text x='26' y={y + 28} fill='#5C646A' fontSize={13} fontFamily='Menlo, ui-monospace, monospace'>{r.c}</text>
                            <text x='116' y={y + 28} fill='#202259' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>{r.n}</text>
                            <text x='336' y={y + 28} fill='#3F4A55' fontSize={15} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{r.q}</text>
                            <text x='396' y={y + 28} fill='#3F4A55' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>{r.p}</text>
                            <text x='500' y={y + 28} fill='#3F4A55' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>{r.t}</text>
                            <text x='620' y={y + 28} fill='#2AA7CF' fontSize={15} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>{r.b}</text>
                        </g>
                    );
                })}
                <line x1='14' y1='340' x2='674' y2='340' stroke='#E3E6E8' strokeWidth='1.5' />
                <text x='440' y='366' fill='#5C646A' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>Subtotal</text>
                <text x='620' y='366' fill='#3F4A55' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>₦144,000</text>
                <text x='392' y='396' fill='#202259' fontSize={15} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>Total (incl. tax)</text>
                <text x='620' y='396' fill='#202259' fontSize={15} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>₦154,800</text>

                {/* 说明 */}
                <text x='0' y='452' fill='#5C646A' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>表格含税率与税额两列，表尾有商品小计和含税总计两行。</text>
                <text x='0' y='478' fill='#5C646A' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>税率按 7.5% 计算，这一项只在订单展示环节出现，结算页并不计算。</text>
            </svg>
        </Box>

        {/* 右：分桶依据 + 注意 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 1.8, fontWeight: 'bold' }}>BUCKETS</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.35, marginTop: 8 }}>
                    两段列表怎么分出来的
                </Text>
                <Box style={{ flexDirection: 'column', gap: 9, marginTop: 14 }}>
                    {[
                        '先筛出「归属人是我 或 操作人是我」的订单',
                        '其中归属人是我的 → My orders',
                        '归属人不是我、但操作人是我 → Member orders',
                    ].map(function (t, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', gap: 10 }}>
                                <Text style={{ fontSize: 15, color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace' }}>{i + 1}</Text>
                                <Text style={{ fontSize: 16, color: '#D6E2F5', lineHeight: 1.45, flex: 1 }}>{t}</Text>
                            </Box>
                        );
                    })}
                </Box>
                <Text style={{ fontSize: 14, color: '#859EB3', marginTop: 12 }}>
                    会员订单只来自代客下单流程，和三条下单路径都无关。
                </Text>
            </Box>

            <Box style={{ flex: 1, background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '14px 16px', flexDirection: 'column', gap: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#7A2F5C' }}>三处要提前说清</Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.5 }}>
                    一、访客订单两个字段都为空 —— 两段列表都进不去，而且会在进入账户页时被清理掉。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.5 }}>
                    二、注册路径的订单，地址列会显示"未提供地址"，因为字段是平铺存的。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.5 }}>
                    三、支付状态标签有四种取值，注册单会落到默认的未支付标签上。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>26 / 31</Text>
    </Box>
</Slide>
