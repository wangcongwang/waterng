<Slide style={{ width: 1280, height: 720, position: 'relative', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#202259' }}>
    {/* 极简底纹 */}
    <Box style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, background: 'linear-gradient(135deg, #202259 0%, #2A3170 48%, #1B5C78 100%)' }} />
    <Box style={{ position: 'absolute', top: -180, right: -140, width: 560, height: 560, borderRadius: 280, background: 'rgba(42,167,207,0.20)' }} />
    <Box style={{ position: 'absolute', bottom: -220, left: -160, width: 620, height: 620, borderRadius: 310, background: 'rgba(242,135,183,0.14)' }} />

    <Box style={{ position: 'relative', width: '100%', height: '100%', padding: '64px 80px', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* 巨型数字三连 */}
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
            {[
                { n: '3', u: '条链路', d: '下单、注册、账户奖金，今天全部走了一遍' },
                { n: '6', u: '个存储键', d: '支撑全站数据的 localStorage 键位' },
                { n: '9', u: '类奖金', d: '名称齐全，比例与条件留给线下说明' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ width: 340, flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                            <Text style={{ fontSize: 96, fontWeight: 'bold', color: i === 2 ? '#F287B7' : '#7FD3EC', lineHeight: 1, letterSpacing: -4 }}>{it.n}</Text>
                            <Text style={{ fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' }}>{it.u}</Text>
                        </Box>
                        <Box style={{ width: 76, height: 3, background: i === 2 ? '#F287B7' : '#2AA7CF', marginTop: 14, marginBottom: 14 }} />
                        <Text style={{ fontSize: 18, color: '#B9C6E4', lineHeight: 1.5 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>

        {/* 收束金句 */}
        <Box style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 46, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, letterSpacing: -0.8 }}>
                讲清实现边界，比讲全功能更重要。
            </Text>
            <Text style={{ fontSize: 20, color: '#B9C6E4', lineHeight: 1.55, marginTop: 16, width: 880 }}>
                今天每条结论都能在页面上点出来。哪一条需要变成正式需求，随时拉上技术一起过一遍。
            </Text>
        </Box>

        {/* 落款 */}
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Box style={{ width: 10, height: 10, background: '#F287B7', borderRadius: 2 }} />
                <Text style={{ fontSize: 16, color: '#8A9BC0', letterSpacing: 0.4 }}>AQUALIFE · 前端系统功能讲解</Text>
            </Box>
            <Text style={{ fontSize: 16, color: '#8A9BC0', letterSpacing: 0.4 }}>2026-09-14 · 25 / 25</Text>
        </Box>
    </Box>
</Slide>
