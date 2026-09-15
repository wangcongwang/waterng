<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>奖金看板：两个数字怎么算出来</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            总览页最显眼的两张 KPI 卡，口径分别是这样的
        </Text>
    </Box>

    {/* ===== B 区 内容区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 20 }}>
        {/* 双 KPI */}
        <Box style={{ height: 218, flexDirection: 'row', gap: 20 }}>
            <Box style={{ flex: 1, background: '#202259', borderRadius: 10, padding: '24px 28px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>MEMBER BONUS</Text>
                    <Text style={{ fontSize: 15, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>al.bvCredits + al.orders</Text>
                </Box>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>312</Text>
                    <Text style={{ fontSize: 26, color: '#7FD3EC', fontWeight: 'bold' }}>BV</Text>
                </Box>
                <Text style={{ fontSize: 17, color: '#B9C6E4', marginTop: 'auto' }}>
                    Earned 312 from your orders · 0 from referrals
                </Text>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', border: '2px solid #F287B7', borderRadius: 10, padding: '24px 28px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, color: '#B3528A', letterSpacing: 2, fontWeight: 'bold' }}>MEMBER ECOIN</Text>
                    <Text style={{ fontSize: 15, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>al.ecoin</Text>
                </Box>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#F287B7', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>43</Text>
                    <Text style={{ fontSize: 26, color: '#B3528A', fontWeight: 'bold' }}>EC</Text>
                </Box>
                <Text style={{ fontSize: 17, color: '#3F4A55', marginTop: 'auto' }}>
                    无流水时副标题显示 No ecoin yet
                </Text>
            </Box>
        </Box>

        {/* 口径拆解 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>口径拆解</Text>
                <Box style={{ flexDirection: 'column', gap: 10, flex: 1 }}>
                    {[
                        { k: '自购 BV', d: '把自己名下所有订单的 bv 字段累加，标签是 Your orders。' },
                        { k: '推荐 BV', d: '从 BV 台账里取出记在自己名下的条目累加，标签是 From referrals。' },
                        { k: '合计', d: '两者相加就是卡片上的 Member Bonus 数字，展开 Breakdown 能看到这两行。' },
                        { k: 'Ecoin', d: '走另一本台账，按充值、扣减逐条累计，与 BV 互不影响。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 12, alignItems: 'center', background: '#FFFFFF', borderRadius: 8, padding: '0 14px' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: i === 2 ? '#F287B7' : '#202259', width: 84 }}>{it.k}</Text>
                                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.4, flex: 1 }}>{it.d}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ width: 400, background: 'rgba(42,167,207,0.10)', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <FAIcon name='lightbulb' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>讲解抓手</Text>
                </Box>
                <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.55 }}>
                    讲这两个数字时，只要说清"一个来自订单、一个来自台账"，负责人立刻能理解为什么推荐别人下单也能涨自己的奖金。
                </Text>
                <Box style={{ marginTop: 'auto', padding: '12px 14px', background: '#FFFFFF', borderRadius: 8 }}>
                    <Text style={{ fontSize: 16, color: '#202259', lineHeight: 1.5 }}>
                        两张卡右上角的 View History 会打开各自的流水明细弹窗，逐条可查、带前后余额。
                    </Text>
                </Box>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>20 / 25</Text>
    </Box>
</Slide>
