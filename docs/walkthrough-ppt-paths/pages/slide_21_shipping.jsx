<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>配送方式与自提点</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            两种方式走不同的表单分支，自提只需选一个网点
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左栏 */}
        <Box style={{ width: 404, background: '#202259', borderRadius: 10, padding: '24px 22px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>DELIVERY</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.22, marginTop: 12 }}>
                送货上门
                <br />
                还是自提
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                这个开关决定下半页显示哪一块表单：送货显示完整地址表单，自提显示三个网点供选择。
            </Text>

            <Box style={{ flexDirection: 'column', gap: 12, marginTop: 22 }}>
                <Box style={{ background: 'rgba(42,167,207,0.16)', borderRadius: 8, padding: '12px 14px' }}>
                    <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.5 }}>
                        默认选中送货上门。未登录时，"保存地址"整块选择器是隐藏的。
                    </Text>
                </Box>
                <Box style={{ background: 'rgba(242,135,183,0.16)', borderRadius: 8, padding: '12px 14px' }}>
                    <Text style={{ fontSize: 16, color: '#FBE0EE', lineHeight: 1.5 }}>
                        自提网点默认选中 Lagos HQ，网点名与地址在不同页面各写了一份，改文案要同步。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <FAIcon name='map-marker-alt' style={{ fill: '#7FD3EC', width: 18, height: 18 }} />
                <Text style={{ fontSize: 15, color: '#B9C6E4' }}>选自提时，地址分区整块收起</Text>
            </Box>
        </Box>

        {/* 右栏 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 16 }}>
            {/* 两种方式 */}
            <Box style={{ flexDirection: 'row', gap: 16, height: 186 }}>
                {[
                    { t: 'Door delivery', sub: 'We deliver to your address', on: true, rows: ['收货地址表单生效', '可选已保存地址或新增', '需填姓名 / 电话 / 城市 / 州'] },
                    { t: 'Self-pickup', sub: 'Pick up at our office', on: false, rows: ['地址表单整块隐藏', '改为选择自提网点', '下单后到网点自取'] },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, background: it.on ? 'rgba(42,167,207,0.10)' : '#F4F6F8', border: it.on ? '2px solid #2AA7CF' : '1px solid #E3E6E8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Box style={{ width: 18, height: 18, borderRadius: 9, border: it.on ? '5px solid #2AA7CF' : '2px solid #859EB3', background: '#FFFFFF' }} />
                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                                {it.on ? (
                                    <Box style={{ marginLeft: 'auto', padding: '3px 10px', background: '#202259', borderRadius: 999 }}>
                                        <Text style={{ fontSize: 13, color: '#FFFFFF' }}>默认</Text>
                                    </Box>
                                ) : null}
                            </Box>
                            <Text style={{ fontSize: 14, color: '#5C646A', marginTop: 5 }}>{it.sub}</Text>
                            <Box style={{ flexDirection: 'column', gap: 6, marginTop: 12 }}>
                                {it.rows.map(function (r, j) {
                                    return (
                                        <Box key={j} style={{ flexDirection: 'row', gap: 8 }}>
                                            <Text style={{ fontSize: 15, color: '#2AA7CF' }}>·</Text>
                                            <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.35, flex: 1 }}>{r}</Text>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            {/* 自提点 */}
            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>三个自提点</Text>
                    <Text style={{ fontSize: 14, color: '#5C646A' }}>单选 · 选中后显示 Selected</Text>
                </Box>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    {[
                        { n: 'Lagos HQ', tag: 'HQ', a: '12B Admiralty Way, Lekki Phase 1', h: 'Mon–Sat · 8:00 – 18:00', on: true },
                        { n: 'Abuja branch', tag: '', a: 'Plot 24, Wuse Zone 5', h: 'Mon–Fri · 9:00 – 17:00', on: false },
                        { n: 'Port Harcourt branch', tag: '', a: '5 Aba Road, GRA Phase 2', h: 'Mon–Fri · 9:00 – 17:00', on: false },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, background: '#FFFFFF', borderRadius: 8, padding: '0 16px', borderLeft: it.on ? '4px solid #F287B7' : '4px solid #E3E6E8' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', width: 196 }}>{it.n}</Text>
                                {it.tag ? (
                                    <Box style={{ padding: '2px 9px', background: '#F287B7', borderRadius: 4 }}>
                                        <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' }}>{it.tag}</Text>
                                    </Box>
                                ) : null}
                                <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1 }}>{it.a}</Text>
                                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                    <FAIcon name='clock' style={{ fill: '#859EB3', width: 15, height: 15 }} />
                                    <Text style={{ fontSize: 15, color: '#5C646A' }}>{it.h}</Text>
                                </Box>
                            </Box>
                        );
                    })}
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>21 / 31</Text>
    </Box>
</Slide>
