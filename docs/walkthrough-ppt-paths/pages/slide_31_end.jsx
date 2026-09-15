<Slide style={{ width: 1280, height: 720, position: 'relative', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#202259' }}>
    <Box style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, background: 'linear-gradient(135deg, #202259 0%, #2A3170 48%, #1B5C78 100%)' }} />
    <Box style={{ position: 'absolute', top: -180, right: -140, width: 560, height: 560, borderRadius: 280, background: 'rgba(42,167,207,0.20)' }} />
    <Box style={{ position: 'absolute', bottom: -220, left: -160, width: 620, height: 620, borderRadius: 310, background: 'rgba(242,135,183,0.14)' }} />

    <Box style={{ position: 'relative', width: '100%', height: '100%', padding: '64px 80px', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* 三个巨型数字 */}
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
            {[
                { n: '3', u: '条路径', d: '访客下单、注册购买、已有账户购买' },
                { n: '2', u: '个落点', d: '账户里的订单列表，和奖金卡片上的数字' },
                { n: '1', u: '个判据', d: '下单那一刻，有没有会员身份' },
            ].map(function (it, i) {
                var color = i === 2 ? '#F287B7' : '#7FD3EC';
                return (
                    <Box key={i} style={{ width: 340, flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                            <Text style={{ fontSize: 96, fontWeight: 'bold', color: color, lineHeight: 1, letterSpacing: -4 }}>{it.n}</Text>
                            <Text style={{ fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' }}>{it.u}</Text>
                        </Box>
                        <Box style={{ width: 76, height: 3, background: i === 2 ? '#F287B7' : '#2AA7CF', marginTop: 14, marginBottom: 14 }} />
                        <Text style={{ fontSize: 18, color: '#B9C6E4', lineHeight: 1.5 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>

        {/* 金句 */}
        <Box style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 46, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, letterSpacing: -0.8 }}>
                讲清实现边界，比讲全功能更重要。
            </Text>
            <Text style={{ fontSize: 20, color: '#B9C6E4', lineHeight: 1.55, marginTop: 16, width: 900 }}>
                三条路径的差别最终只落在一点：这笔单算不算账户资产。把这一点讲透，后面的订单和奖金问题都会顺下去。
            </Text>
        </Box>

        {/* 落款 */}
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Box style={{ width: 10, height: 10, background: '#F287B7', borderRadius: 2 }} />
                <Text style={{ fontSize: 16, color: '#8A9BC0', letterSpacing: 0.4 }}>AQUALIFE · 三条下单路径讲解</Text>
            </Box>
            <Text style={{ fontSize: 16, color: '#8A9BC0', letterSpacing: 0.4 }}>2026-09-14 · 31 / 31</Text>
        </Box>
    </Box>
</Slide>
