<Slide style={{ width: 1280, height: 720, position: 'relative', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#0F1034' }}>
    <Image src='resources/images/cover_bg.jpg' style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, objectFit: 'cover' }} />
    <Box style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, background: 'linear-gradient(90deg, rgba(15,16,52,0.95) 0%, rgba(15,16,52,0.87) 40%, rgba(15,16,52,0.46) 70%, rgba(15,16,52,0.72) 100%)' }} />
    <Box style={{ position: 'absolute', bottom: 0, right: 0, width: 520, height: 240, background: 'linear-gradient(315deg, rgba(8,10,32,1) 0%, rgba(8,10,32,0.9) 24%, rgba(8,10,32,0) 64%)' }} />

    <Box style={{ position: 'relative', width: '100%', height: '100%', padding: '68px 80px', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Box style={{ width: 34, height: 3, background: '#2AA7CF' }} />
            <Text style={{ fontSize: 16, color: '#7FD3EC', letterSpacing: 3.2, fontWeight: 'bold' }}>AQUALIFE / ELKEN · 内部功能讲解</Text>
        </Box>

        <Box style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 68, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.15, letterSpacing: -1.5 }}>
                三种下单路径
                <br />
                一个账户落点
            </Text>
            <Text style={{ fontSize: 22, color: '#B9C6E4', lineHeight: 1.5, marginTop: 20, width: 830 }}>
                客户可以不注册直接下单，也可以先注册再购买，还可以用已有账户购买。三种走法，订单归属和奖金去向完全不同。
            </Text>

            <Box style={{ flexDirection: 'row', gap: 14, marginTop: 32 }}>
                {[
                    { t: '路径一 · 没有账号直接下单', c: '#202259' },
                    { t: '路径二 · 注册账户去购买', c: '#2AA7CF' },
                    { t: '路径三 · 已有账户去购买', c: '#F287B7' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: '11px 18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8 }}>
                            <Box style={{ width: 10, height: 10, borderRadius: 5, background: it.c, border: '1px solid rgba(255,255,255,0.5)' }} />
                            <Text style={{ fontSize: 17, color: '#E6EDF8' }}>{it.t}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#8A9BC0', letterSpacing: 0.4 }}>下单流程 · 会员注册 · 账户与奖金后台</Text>
            <Box style={{ padding: '9px 18px', background: 'rgba(8,10,32,0.94)', border: '1px solid rgba(127,211,236,0.32)', borderRadius: 999 }}>
                <Text style={{ fontSize: 15, color: '#CFE9F4', letterSpacing: 0.4 }}>2026-09-14 · 内部讲解会</Text>
            </Box>
        </Box>
    </Box>
</Slide>
