<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>访客订单归谁</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            这是整场讲解里最需要说清的一页：订单不归下单人，奖金也不归下单人
        </Text>
    </Box>

    {/* ===== B 区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 20 }}>
        {/* 巨型双数字 */}
        <Box style={{ height: 232, flexDirection: 'row', gap: 20 }}>
            <Box style={{ flex: 1, background: '#202259', borderRadius: 10, padding: '22px 26px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>ORDER OWNERSHIP</Text>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 16, marginTop: 10 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>null</Text>
                    <Text style={{ fontSize: 20, color: '#7FD3EC', fontWeight: 'bold' }}>两个归属字段</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.55, marginTop: 'auto' }}>
                    构造订单时，权益归属人和实际操作人这两个字段都取不到登录用户，最终写进去的就是空值。订单里的姓名倒是有的，但它存的是收货人姓名，不是账户名。
                </Text>
            </Box>

            <Box style={{ width: 356, background: 'rgba(242,135,183,0.14)', border: '2px solid #F287B7', borderRadius: 10, padding: '22px 24px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#B3528A', letterSpacing: 2, fontWeight: 'bold' }}>BV FLOW</Text>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#F287B7', lineHeight: 1, letterSpacing: -4 }}>100%</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.55, marginTop: 'auto' }}>
                    这笔单产生的 BV 全额记到分享链接的持有者名下。下单访客自己留下 <span style={{ fontWeight: 'bold', color: '#B3528A' }}>0 BV</span>。
                </Text>
            </Box>
        </Box>

        {/* 判断逻辑 + 缺陷 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>
                    记账要同时满足三条
                </Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    {[
                        { n: '1', d: '存在推荐关系 —— 必须曾经点过带推荐参数的链接，全站只记第一次捕获到的那个人。' },
                        { n: '2', d: '推荐人不等于下单人的会员 ID —— 访客场景下这一项恒成立。' },
                        { n: '3', d: '订单产生了 BV —— 金额每满 1,000 奈拉记 1 BV，向下取整。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 12, alignItems: 'center', background: '#FFFFFF', borderRadius: 8, padding: '0 14px' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace', width: 16 }}>{it.n}</Text>
                                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.4, flex: 1 }}>{it.d}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ width: 396, background: '#FFFFFF', border: '1px solid #E3E6E8', borderLeft: '4px solid #F287B7', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='bug' style={{ fill: '#B3528A', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>一个已知缺陷</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55, flex: 1 }}>
                    订单上的推荐人字段是在写库**之后**才赋值的，所以落库的订单里没有这个字段。后果是：下单落地页那行"BV credited to …"不会显示出来。
                </Text>
                <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.5, marginTop: 8 }}>
                    奖金台账本身是对的 —— 只是订单上少了这条溯源信息。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>08 / 31</Text>
    </Box>
</Slide>
