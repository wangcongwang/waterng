<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>演示动线：三条路径各走一遍</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            建议按"访客 → 注册 → 已有账户"的顺序演示，差异对比最明显
        </Text>
    </Box>

    {/* ===== B 区（左标题 + 右内容） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左栏：演示前准备 */}
        <Box style={{ width: 380, background: '#202259', borderRadius: 10, padding: '24px 22px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>BEFORE YOU START</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, marginTop: 12 }}>
                演示前
                <br />
                必做两步
            </Text>

            <Box style={{ flexDirection: 'column', gap: 14, marginTop: 20 }}>
                {[
                    { n: '1', t: '先清一次浏览器数据', d: '演示账号与示例订单只在本地数据为空时自动注入。不清就直接打开，看到的可能是上一轮留下的数据。' },
                    { n: '2', t: '要演示访客，先点退出登录', d: '全新浏览器默认就是登录态。注意：退出只清登录态，个人资料和地址仍残留，下单表单会被预填。' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                            <Box style={{ width: 26, height: 26, borderRadius: 13, background: '#F287B7', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                            </Box>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' }}>{it.t}</Text>
                                <Text style={{ fontSize: 15, color: '#B9C6E4', lineHeight: 1.5, marginTop: 4 }}>{it.d}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 15, color: '#CFE9F4', lineHeight: 1.5 }}>
                    两个现场提醒：USSD 固定码直接照读；点 Place order 之前记得先把两项同意勾上。
                </Text>
            </Box>
        </Box>

        {/* 右栏：三段动线 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            {[
                {
                    c: '#202259',
                    t: 'A · 路径一：访客下单',
                    steps: [
                        '登出，确认顶栏从会员头像变回一个登录图标',
                        '商品页加购 → 购物车 → 结算页。重点看三处：摘要没有 BV 行、地址选择器整块消失、余额支付置灰',
                        'Place order → 落地页展示订单号',
                        '说明：这笔单在账户里看不到，而且会被清理',
                    ],
                },
                {
                    c: '#2AA7CF',
                    t: 'B · 路径二：注册后购买',
                    steps: [
                        '打开注册页，亮出 Member ID 是自动生成且不可修改的',
                        '勾商品、填必填项，点 Save → 观察自动登录与三秒倒计时',
                        '账户页订单列表里出现这笔单，标签为 My order',
                        '点开看地址列与付款状态的显示差异',
                    ],
                },
                {
                    c: '#F287B7',
                    t: 'C · 路径三：已有账户购买',
                    steps: [
                        '登录（演示账号已预填在登录页）',
                        '商品页出现 BV 标识 → 结算页出现 BV rewards 行',
                        '任选一种支付方式下单 → 账户页看订单落进 My orders',
                        '打开奖金卡片的 View History，看逐条流水',
                    ],
                },
            ].map(function (blk, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '11px 16px', flexDirection: 'column', borderLeft: '5px solid ' + blk.c }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: blk.c }}>{blk.t}</Text>
                        </Box>
                        <Box style={{ flex: 1, flexDirection: 'column', gap: 3 }}>
                            {blk.steps.map(function (s, j) {
                                return (
                                    <Box key={j} style={{ flexDirection: 'row', gap: 9, alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 13, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace', marginTop: 1 }}>{j + 1}</Text>
                                        <Text style={{ fontSize: 14, color: '#3F4A55', lineHeight: 1.35, flex: 1 }}>{s}</Text>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                );
            })}

            <Box style={{ background: '#202259', borderRadius: 8, padding: '11px 16px' }}>
                <Text style={{ fontSize: 14, color: '#CFE9F4', lineHeight: 1.4 }}>
                    收尾可选：打开往期奖金与历史累计两个弹窗，说明九类奖金是展示字段。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>29 / 31</Text>
    </Box>
</Slide>
