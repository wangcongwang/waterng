<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>五种支付方式</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            其中只有一种是真正跟登录态挂钩的 —— 就是第五条
        </Text>
    </Box>

    {/* ===== B 区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：巨型数字 + 五种方式 */}
        <Box style={{ width: 720, flexDirection: 'column', gap: 16 }}>
            <Box style={{ height: 132, background: '#202259', borderRadius: 10, padding: '0 26px', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -4, fontFamily: 'Menlo, ui-monospace, monospace' }}>5</Text>
                <Box style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#7FD3EC' }}>种支付方式</Text>
                    <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.45, marginTop: 6 }}>
                        货到付款是页面默认选中项，但默认逻辑取的是"第一个可用项"，不是写死的 COD。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                {[
                    { n: 'Cash on delivery', s: 'Pay when you receive your order', f: '无字段 · 仅说明文案', hi: false },
                    { n: 'Debit / credit card', s: 'Instant · Visa, MC, Verve', f: '卡号 / 持卡人 / 有效期 / CVV', hi: false },
                    { n: 'USSD', s: 'All Nigerian banks', f: '固定码 *737*50*100000#', hi: true },
                    { n: 'Bank transfer', s: 'Manual · 1–2 hrs', f: 'GTBank Plc · 012 345 6789 · Elken Nigeria Ltd', hi: false },
                    { n: 'Account Balance', s: 'Pay with your Member Ecoin balance', f: '可用余额 / 本单金额 / 支付后余额', hi: true },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16, background: it.hi ? 'rgba(242,135,183,0.12)' : '#F4F6F8', borderRadius: 8, padding: '0 18px', borderLeft: it.hi ? '4px solid #F287B7' : '4px solid transparent' }}>
                            <Box style={{ flexDirection: 'column', width: 232 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259', lineHeight: 1.25 }}>{it.n}</Text>
                                <Text style={{ fontSize: 14, color: '#5C646A', marginTop: 3 }}>{it.s}</Text>
                            </Box>
                            <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.4 }}>{it.f}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右：提示 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 12 }}>
            <Box style={{ background: 'rgba(32,34,89,0.06)', borderRadius: 10, padding: '16px 18px', flexDirection: 'column', flex: 1 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>四个关键提示</Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 11 }}>
                    {[
                        { t: '只有余额支付当场扣款', d: '它会直接把订单标成已支付并扣减 Ecoin 余额；其余四种下单后都是未支付状态。' },
                        { t: '余额为零时该选项禁用', d: '此时默认选中项会自动落到列表里第一个可用方式，而不是固定在货到付款上。' },
                        { t: 'USSD 码是写死的', d: '页面固定显示那串码，不会跟着订单金额变。演示时按固定码说明就好。' },
                        { t: '访客一定用不了余额支付', d: '余额取值依赖会员身份，访客取到 0。这是三条路径里唯一被登录态卡住的支付方式。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 11, alignItems: 'flex-start', background: '#FFFFFF', borderRadius: 8, padding: '10px 12px' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace' }}>{i + 1}</Text>
                                <Box style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                                    <Text style={{ fontSize: 14, color: '#3F4A55', lineHeight: 1.45, marginTop: 3 }}>{it.d}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>22 / 31</Text>
    </Box>
</Slide>
