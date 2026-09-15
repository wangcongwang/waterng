<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>奖金看板：两个数字怎么算</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            一个来自订单，一个来自台账 —— 这也解释了三条路径的奖金差异从哪来
        </Text>
    </Box>

    {/* ===== B 区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 20 }}>
        {/* 双 KPI */}
        <Box style={{ height: 212, flexDirection: 'row', gap: 20 }}>
            <Box style={{ flex: 1, background: '#202259', borderRadius: 10, padding: '22px 26px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>MEMBER BONUS</Text>
                    <Text style={{ fontSize: 14, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>al.bvCredits + al.orders</Text>
                </Box>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>312</Text>
                    <Text style={{ fontSize: 26, color: '#7FD3EC', fontWeight: 'bold' }}>BV</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#B9C6E4', marginTop: 'auto' }}>
                    Earned 312 from your orders · 0 from referrals
                </Text>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', border: '2px solid #F287B7', borderRadius: 10, padding: '22px 26px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, color: '#B3528A', letterSpacing: 2, fontWeight: 'bold' }}>MEMBER ECOIN</Text>
                    <Text style={{ fontSize: 14, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>al.ecoin</Text>
                </Box>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#F287B7', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>43</Text>
                    <Text style={{ fontSize: 26, color: '#B3528A', fontWeight: 'bold' }}>EC</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#3F4A55', marginTop: 'auto' }}>
                    没有流水时副标题显示 No ecoin yet
                </Text>
            </Box>
        </Box>

        {/* 口径拆解 + 与路径的关联 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>口径拆解</Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    {[
                        { k: '自购 BV', d: '把自己名下所有订单的 BV 累加，卡片上标注为 Your orders。', c: '#202259' },
                        { k: '推荐 BV', d: '从 BV 台账取出记在自己名下的条目累加，标注为 From referrals。', c: '#F287B7' },
                        { k: '合计', d: '两者相加就是卡片上的 Member Bonus 数字，展开 Breakdown 能看到这两行。', c: '#2AA7CF' },
                        { k: 'Ecoin', d: '走另一本独立台账，按充值、转账、扣减逐条累计，与 BV 互不影响。', c: '#859EB3' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: '#FFFFFF', borderRadius: 8, padding: '0 16px', borderLeft: '4px solid ' + it.c }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', width: 84 }}>{it.k}</Text>
                                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.4, flex: 1 }}>{it.d}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ width: 396, background: 'rgba(42,167,207,0.10)', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='link' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                  <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>和三条路径的关系</Text>
                </Box>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                    <Box style={{ background: '#FFFFFF', borderRadius: 8, padding: '11px 13px' }}>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>路径一</span>：访客订单的 BV 全额给分享者 —— 所以访客自己的卡片<span style={{ fontWeight: 'bold' }}>一分不涨</span>。
                        </Text>
                    </Box>
                    <Box style={{ background: '#FFFFFF', borderRadius: 8, padding: '11px 13px' }}>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>路径二 / 三</span>：订单归属人就是自己 —— BV 计入自购 BV，卡片<span style={{ fontWeight: 'bold' }}>会涨</span>。
                        </Text>
                    </Box>
                    <Box style={{ background: '#FFFFFF', borderRadius: 8, padding: '11px 13px' }}>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5 }}>
                            推荐 BV 只会在<span style={{ fontWeight: 'bold' }}>别人通过你的链接下单</span>时增长，和自己下不下单无关。
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>27 / 31</Text>
    </Box>
</Slide>
