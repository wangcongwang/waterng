<Slide style={{ width: 1280, height: 720, position: 'relative', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#0F1034' }}>
    {/* L1 全幅主视觉 */}
    <Image src='resources/images/cover_bg.jpg' style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, objectFit: 'cover' }} />
    {/* 左侧压暗，保证白字可读 */}
    <Box style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, background: 'linear-gradient(90deg, rgba(15,16,52,0.95) 0%, rgba(15,16,52,0.88) 40%, rgba(15,16,52,0.44) 70%, rgba(15,16,52,0.62) 100%)' }} />
    {/* 右下角压暗，覆盖底图水印 */}
    <Box style={{ position: 'absolute', bottom: 0, right: 0, width: 560, height: 280, background: 'linear-gradient(315deg, rgba(8,10,32,1) 0%, rgba(8,10,32,0.9) 24%, rgba(8,10,32,0) 64%)' }} />

    {/* 内容层 */}
    <Box style={{ position: 'relative', width: '100%', height: '100%', padding: '64px 80px', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* 顶部 eyebrow */}
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Box style={{ width: 40, height: 4, background: '#2AA7CF' }} />
            <Text style={{ fontSize: 17, color: '#7FD3EC', letterSpacing: 2.4, fontWeight: 'bold' }}>
                AQUALIFE / ELKEN · 前端系统功能讲解
            </Text>
        </Box>

        {/* 主标题区 */}
        <Box style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 68, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.15, letterSpacing: -1.5 }}>
                三条链路，一次讲清
            </Text>
            <Text style={{ fontSize: 24, color: '#B9C6E4', lineHeight: 1.5, marginTop: 18 }}>
                下单流程 · 会员注册 · 我的账户与奖金后台
            </Text>
            <Box style={{ flexDirection: 'row', gap: 16, marginTop: 34 }}>
                {[
                    { no: '01', cn: '下单流程', en: 'Order flow', desc: '加购、结算、支付、订单落库' },
                    { no: '02', cn: '会员注册', en: 'Member signup', desc: '七分区表单、ID 规则、推荐关系' },
                    { no: '03', cn: '账户与奖金', en: 'Bonus & account', desc: '双 KPI、九类奖金、资金闭环' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ width: 300, padding: '16px 18px', background: 'rgba(255,255,255,0.07)', borderLeft: '3px solid #2AA7CF', borderRadius: 6, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#7FD3EC', letterSpacing: 1.6, fontWeight: 'bold' }}>{it.no}</Text>
                            <Text style={{ fontSize: 21, color: '#FFFFFF', fontWeight: 'bold', marginTop: 6 }}>{it.cn}</Text>
                            <Text style={{ fontSize: 15, color: '#93A4C9', marginTop: 4, lineHeight: 1.4 }}>{it.desc}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 底部落款（右侧盖住底图水印） */}
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 16, color: '#8A9BC0' }}>
                基于当前代码实现逐条核对 · 全场演示可跟随操作
            </Text>
            <Box style={{ padding: '10px 18px', background: 'rgba(8,10,32,0.92)', border: '1px solid rgba(127,211,236,0.28)', borderRadius: 6, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Box style={{ width: 8, height: 8, background: '#F287B7', borderRadius: 4 }} />
                <Text style={{ fontSize: 16, color: '#D6E2F5' }}>2026-09-14 · 内部讲解会</Text>
            </Box>
        </Box>
    </Box>
</Slide>
