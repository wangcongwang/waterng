<Slide style={{ width: 1280, height: 720, position: 'relative', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#0F1034' }}>
    <Image src='resources/images/section_flow.jpg' style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, objectFit: 'cover' }} />
    <Box style={{ position: 'absolute', top: 0, left: 0, width: 1280, height: 720, background: 'linear-gradient(90deg, rgba(15,16,52,0.95) 0%, rgba(15,16,52,0.85) 46%, rgba(15,16,52,0.36) 76%, rgba(15,16,52,0.74) 100%)' }} />
    <Box style={{ position: 'absolute', bottom: 0, right: 0, width: 520, height: 240, background: 'linear-gradient(315deg, rgba(8,10,32,1) 0%, rgba(8,10,32,0.9) 24%, rgba(8,10,32,0) 64%)' }} />

    <Box style={{ position: 'relative', width: '100%', height: '100%', padding: '72px 80px', flexDirection: 'column', justifyContent: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Text style={{ fontSize: 96, fontWeight: 'bold', color: 'rgba(42,167,207,0.55)', lineHeight: 1, letterSpacing: -3 }}>01</Text>
            <Box style={{ width: 56, height: 4, background: '#2AA7CF' }} />
            <Text style={{ fontSize: 17, color: '#7FD3EC', letterSpacing: 3, fontWeight: 'bold' }}>CHAPTER ONE</Text>
        </Box>

        <Text style={{ fontSize: 62, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.1, letterSpacing: -1, marginTop: 24 }}>
            没有账号直接下单
        </Text>
        <Text style={{ fontSize: 23, color: '#B9C6E4', lineHeight: 1.5, marginTop: 18, width: 830 }}>
            客户不注册也能把单下完。但下单之后，这笔订单去了哪、奖金给了谁，需要说清楚。
        </Text>

        <Box style={{ flexDirection: 'row', gap: 14, marginTop: 38 }}>
            {['访客能走多远', '哪些功能被隐藏', '订单归属字段', '下单后的三个真相'].map(function (t, i) {
                return (
                    <Box key={i} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(127,211,236,0.3)', borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                        <Box style={{ width: 6, height: 6, borderRadius: 3, background: '#2AA7CF' }} />
                        <Text style={{ fontSize: 16, color: '#D6E2F5' }}>{t}</Text>
                    </Box>
                );
            })}
        </Box>
    </Box>
</Slide>
