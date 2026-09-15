<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>订单摘要与下单按钮</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            摘要区一共只有五行，按钮放行要同时满足四类条件
        </Text>
    </Box>

    {/* ===== B 区（左标题 + 右内容） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左标题栏 */}
        <Box style={{ width: 340, background: '#202259', borderRadius: 10, padding: '24px 22px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>SUMMARY & GATE</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, marginTop: 12 }}>
                摘要看得懂
                <br />
                按钮才点得动
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                摘要区是客户下单前最后一眼看到的东西。它的行数很少，但每一行都有明确来源。
            </Text>

            <Box style={{ background: 'rgba(242,135,183,0.18)', borderRadius: 8, padding: '12px 14px', marginTop: 20 }}>
                <Text style={{ fontSize: 16, color: '#FBE0EE', lineHeight: 1.5 }}>
                    演示时先勾上两项同意，否则按钮一直是灰的、点了没反应。
                </Text>
            </Box>

            <Text style={{ fontSize: 15, color: '#859EB3', lineHeight: 1.5, marginTop: 'auto', paddingTop: 16 }}>
                注意：摘要里没有运费和税费，总计等于商品小计。
            </Text>
        </Box>

        {/* 右：摘要 + 条件 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 16 }}>
            <Box style={{ height: 272, flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>摘要区逐行拆解</Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 7 }}>
                    {[
                        { k: '商品行', d: '商品图、名称、单价、数量。购物车模式下显示静态数量。', tag: '每件一行' },
                        { k: 'Edit quantities in cart', d: '结算商品多于一件时出现，点击回购物车改数量。', tag: '条件显示' },
                        { k: 'BV rewards', d: '仅登录用户可见。价格每满 ₦1,000 记 1 BV，向下取整后乘数量。', tag: '登录才显示' },
                        { k: 'Method', d: '随所选支付方式实时更新。', tag: '实时联动' },
                        { k: 'Total 与 Place order', d: '总计等于商品小计，下方是支付品牌标与条款说明。', tag: '底部锚定' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: i === 2 ? 'rgba(42,167,207,0.10)' : '#F4F6F8', borderRadius: 8, padding: '0 16px' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', width: 196 }}>{it.k}</Text>
                                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.4, flex: 1 }}>{it.d}</Text>
                                <Box style={{ padding: '3px 10px', background: '#FFFFFF', borderRadius: 4, border: '1px solid #E3E6E8' }}>
                                    <Text style={{ fontSize: 13, color: '#5C646A' }}>{it.tag}</Text>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>按钮放行的四类条件</Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    {[
                        { t: '两类同意勾选', d: '确认电话与邮箱正确，以及已阅读服务条款与退款政策。' },
                        { t: '配送信息完整', d: '配送模式要填完地址与联系人；自提模式免填地址但必须选中网点。' },
                        { t: '邮箱格式合法', d: '不合法时邮箱下方直接给出提示，因为要用它发订单链接。' },
                        { t: '支付方式自身校验', d: '银行卡走格式校验；余额支付要求余额充足。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 12, alignItems: 'center', background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 8, padding: '0 14px' }}>
                                <Box style={{ width: 24, height: 24, borderRadius: 12, background: '#2AA7CF', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>{i + 1}</Text>
                                </Box>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', width: 168 }}>{it.t}</Text>
                                <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.d}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>23 / 31</Text>
    </Box>
</Slide>
