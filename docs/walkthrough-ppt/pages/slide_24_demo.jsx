<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>现场演示动线</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            按这个顺序点一遍，三个章节的内容都能自然串起来
        </Text>
    </Box>

    {/* ===== B 区 内容区（左标题栏 + 右内容） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 22 }}>
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
                    { n: '1', t: '先清空一次浏览器数据', d: '演示账号与示例订单只在本地数据为空时自动注入。不清就直接打开账户页，看到的可能是上一轮演示留下的旧数据。' },
                    { n: '2', t: '统一会员姓名口径', d: '同一个演示会员 ID 在不同页面里显示过不同姓名，这是演示数据不统一造成的。讲解时以账户页首屏显示的为准。' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                            <Box style={{ width: 26, height: 26, borderRadius: 13, background: '#F287B7', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                            </Box>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{it.t}</Text>
                                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.5, marginTop: 4 }}>{it.d}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.5 }}>
                    两处提醒：USSD 固定码直接照读即可；点 Place order 之前记得先把两项同意勾上。
                </Text>
            </Box>
        </Box>

        {/* 右栏：时间轴 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>
                建议点击顺序
            </Text>
            <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                {[
                    { s: '01', t: '注册页：亮出 Member ID 是自动生成的', d: 'signup.html · 填必填项 → Save → 自动登录 → 三秒跳账户页' },
                    { s: '02', t: '账户页首屏：奖金与 Ecoin 两张卡', d: 'account.html · 展开 Breakdown 与 View History 流水' },
                    { s: '03', t: '加购到下单：走完整条链', d: '商品页加购 → 购物车改数量 → 结算选配送与自提点 → 切支付方式 → Place order' },
                    { s: '04', t: '落地页与订单详情', d: 'shipping.html 显示订单号与 BV 归属 → 点进 order.html 看字段与自动复制链接' },
                    { s: '05', t: '订单分桶：个人单与代下单', d: '账户页 Orders · 切 My orders 与 Member orders 两段' },
                    { s: '06', t: '奖金弹窗四件套', d: 'Trading Record → Previous Bonus 周期表 → 周期明细 → 历史累计' },
                    { s: '07', t: '充值与转账', d: 'Recharge and Transfer · 展示两本账之间的搬钱路径' },
                    { s: '08', t: '五条业务线与推荐网络', d: '复购 / 自动维护（验 90 BV 门槛）/ 升级 / 团队查询 / Sponsor Network 树' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: i % 2 === 0 ? '#F4F6F8' : '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 8, padding: '0 16px' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace', width: 30 }}>{it.s}</Text>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                                <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.35, marginTop: 2 }}>{it.d}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>24 / 25</Text>
    </Box>
</Slide>
