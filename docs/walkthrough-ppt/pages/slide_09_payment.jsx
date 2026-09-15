<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>第 4 步：五种支付方式</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            切换支付方式只切换面板，不跳页面；默认选中项由 DOM 顺序决定
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 62:38） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左栏：五种方式列表 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 20, height: 110 }}>
                <Text style={{ fontSize: 88, fontWeight: 'bold', color: '#F287B7', lineHeight: 1, letterSpacing: -4 }}>5</Text>
                <Box style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#202259' }}>种支付方式</Text>
                    <Text style={{ fontSize: 17, color: '#5C646A', lineHeight: 1.45, marginTop: 4, width: 520 }}>
                        单选 name="payMethod"，五种分别是 cod / card / ussd / bank / balance，选哪个就展开哪块面板。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                {[
                    { t: 'Cash on delivery', s: 'Pay when you receive your order', f: '无字段 · 仅说明文案', v: 'cod', hot: false },
                    { t: 'Debit / credit card', s: 'Instant · Visa, MC, Verve', f: '卡号 / 持卡人 / MM/YY / CVV', v: 'card', hot: false },
                    { t: 'USSD', s: 'All Nigerian banks', f: '固定码 *737*50*100000#', v: 'ussd', hot: true },
                    { t: 'Bank transfer', s: 'Manual · 1–2 hrs', f: 'GTBank Plc · 012 345 6789 · Elken Nigeria Ltd', v: 'bank', hot: false },
                    { t: 'Account Balance', s: 'Pay with your Member Ecoin balance', f: '直接扣减 Ecoin，显示扣后余额', v: 'balance', hot: false },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16, padding: '0 18px', background: it.hot ? 'rgba(242,135,183,0.12)' : '#F4F6F8', borderLeft: it.hot ? '4px solid #F287B7' : '4px solid #2AA7CF', borderRadius: 8 }}>
                            <Box style={{ flexDirection: 'column', width: 250 }}>
                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                                <Text style={{ fontSize: 15, color: '#5C646A', marginTop: 3 }}>{it.s}</Text>
                            </Box>
                            <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1 }}>{it.f}</Text>
                            <Text style={{ fontSize: 15, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.v}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右栏：关键提示 */}
        <Box style={{ width: 396, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#2AA7CF', letterSpacing: 2, fontWeight: 'bold' }}>WATCH OUT</Text>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#202259', marginTop: 10, lineHeight: 1.35 }}>
                    讲解时必须说清的两件事
                </Text>

                <Box style={{ flexDirection: 'column', gap: 10, marginTop: 16 }}>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <FAIcon name='exclamation-triangle' style={{ fill: '#B3528A', width: 20, height: 20 }} />
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>USSD 码是写死的 </span>
                            *737*50*100000#，金额不会跟着订单变。讲的时候按"演示用固定码"来说，不要说成动态生成。
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <FAIcon name='check-circle' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>只有余额支付会当场扣款</span>
                            ，并把支付状态写成 Paid；其余四种的初始状态一律是 Unpaid。
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <FAIcon name='lock' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>卡信息有格式校验</span>
                            ：卡号去空格后不少于 13 位、持卡人至少 2 个字符、有效期符合 MM/YY、CVV 至少 3 位，任一不通过按钮不放行。
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                        <FAIcon name='ban' style={{ fill: '#859EB3', width: 20, height: 20 }} />
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                            <span style={{ fontWeight: 'bold', color: '#202259' }}>余额为 0 时该选项直接禁用</span>
                            ，此时默认选中项会自动落到列表里第一个可用方式，而不是固定 COD。
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Box style={{ padding: '13px 16px', background: '#202259', borderRadius: 8, flexDirection: 'column', gap: 4, marginTop: 'auto' }}>
                <Text style={{ fontSize: 16, color: '#7FD3EC', fontWeight: 'bold' }}>卡面板顶部的安全文案</Text>
                <Text style={{ fontSize: 17, color: '#D6E2F5', lineHeight: 1.45 }}>
                    Secured by Paystack · 256-bit encryption · PCI-DSS Level 1
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>09 / 25</Text>
    </Box>
</Slide>
