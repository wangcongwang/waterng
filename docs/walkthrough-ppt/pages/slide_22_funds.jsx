<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>资金闭环：充值 · 转账 · Ecoin</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            奖金与 Ecoin 是两本账，转账就是在两本账之间搬钱
        </Text>
    </Box>

    {/* ===== B 区 内容区（上大图 + 下方卡片） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 16 }}>
        {/* 流转图 */}
        <Box style={{ height: 240, background: '#F4F6F8', borderRadius: 10, padding: 14, justifyContent: 'center' }}>
            <svg width={1132} height={212} viewBox='0 0 1132 212'>
                {/* 上排：充值 -> Bonus -> Ecoin -> 订单支付 */}
                <rect x='0' y='26' width='190' height='64' rx='8' fill='#FFFFFF' stroke='#202259' strokeWidth='2' />
                <text x='95' y='52' fill='#202259' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>Recharge 充值</text>
                <text x='95' y='74' fill='#5C646A' fontSize='14' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>现金充值入口</text>

                <line x1='190' y1='58' x2='242' y2='58' stroke='#2AA7CF' strokeWidth='3' />
                <polygon points='242,50 256,58 242,66' fill='#2AA7CF' />

                <rect x='256' y='26' width='200' height='64' rx='8' fill='#202259' />
                <text x='356' y='52' fill='#FFFFFF' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>Member Bonus</text>
                <text x='356' y='74' fill='#7FD3EC' fontSize='14' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>BV 台账</text>

                <line x1='456' y1='58' x2='508' y2='58' stroke='#2AA7CF' strokeWidth='3' />
                <polygon points='508,50 522,58 508,66' fill='#2AA7CF' />
                <text x='466' y='46' fill='#B3528A' fontSize='13' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>Bonus To Ecoin</text>

                <rect x='522' y='26' width='200' height='64' rx='8' fill='#202259' />
                <text x='622' y='52' fill='#FFFFFF' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>Member Ecoin</text>
                <text x='622' y='74' fill='#7FD3EC' fontSize='14' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>EC 台账</text>

                <line x1='722' y1='58' x2='774' y2='58' stroke='#2AA7CF' strokeWidth='3' />
                <polygon points='774,50 788,58 774,66' fill='#2AA7CF' />

                <rect x='788' y='26' width='200' height='64' rx='8' fill='#FFFFFF' stroke='#202259' strokeWidth='2' />
                <text x='888' y='52' fill='#202259' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>结算页余额支付</text>
                <text x='888' y='74' fill='#5C646A' fontSize='14' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>当场扣减并置为 Paid</text>

                {/* 下排：Ecoin -> 其他会员 */}
                <rect x='522' y='140' width='200' height='60' rx='8' fill='#FFFFFF' stroke='#F287B7' strokeWidth='2' />
                <text x='622' y='165' fill='#B3528A' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>其他会员的 Ecoin</text>
                <text x='622' y='186' fill='#5C646A' fontSize='14' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>按会员编码定向转出</text>

                <line x1='622' y1='90' x2='622' y2='140' stroke='#F287B7' strokeWidth='3' />
                <polygon points='614,140 622,154 630,140' fill='#F287B7' />
                <text x='636' y='118' fill='#B3528A' fontSize='13' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>Ecoin To Ecoin</text>

                {/* 流水说明 */}
                <text x='0' y='166' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>每一次充值、转账都会在两本台账各自留下一条带时间、金额与备注的流水，</text>
                <text x='0' y='188' fill='#5C646A' fontSize='14' fontFamily='Inter, PingFang SC, sans-serif'>账户页的 View History 就是把这些流水按时间正序渲染成表格。</text>
            </svg>
        </Box>

        {/* 三张说明卡 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                { icon: 'wallet', t: '充值 Recharge', d: '表单四项：充值金额（带加减步进，最小 1）、类型（目前只有 Cash）、支付日期、备注。记录列表展示创建时间、金额、状态、类型、银行、支付参考号与充值凭证，状态有 Pending 与 Approved 两种。提交后金额会同时写进 Bonus 流水。' },
                { icon: 'exchange-alt', t: '转账 Transfer', d: '两种类型：Bonus To Ecoin 与 Ecoin To Ecoin。表单要填会员编码（须符合 NG 加 8 位规则）、金额与备注，界面上只读显示当前可用 Bonus 与可用 Ecoin。列表按转出账户、转入账户、收款人、金额、时间与备注展示。' },
                { icon: 'balance-scale', t: '余额怎么取', d: 'Bonus To Ecoin 的可用 Bonus 取 BV 台账最后一条记录的期末余额；Ecoin To Ecoin 的可用 Ecoin 取 Ecoin 台账累计值。提交成功后同时写扣减方与增加方的流水，余额不足则拦住提交。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <FAIcon name={it.icon} style={{ fill: '#2AA7CF', width: 22, height: 22 }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55 }}>{it.d}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>22 / 25</Text>
    </Box>
</Slide>
