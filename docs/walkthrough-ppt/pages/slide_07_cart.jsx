<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>第 1–2 步：加购与购物车</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            cart.html 是购物车里唯一能改数量的地方，结算页只做核对
        </Text>
    </Box>

    {/* ===== B 区 内容区（上大图 + 下方卡片） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 18 }}>
        {/* 上方：购物车页结构示意 */}
        <Box style={{ height: 288, background: '#F4F6F8', borderRadius: 10, padding: 16, flexDirection: 'row', gap: 16 }}>
            {/* 左：商品列表 */}
            <Box style={{ flex: 1, flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259' }}>Your cart</Text>
                    <Text style={{ fontSize: 15, color: '#5C646A' }}>3 items · 可改数量 / 可删</Text>
                </Box>
                {[
                    { n: 'Elken Spirulina', p: '₦52,000 each', q: 3 },
                    { n: 'Calmag', p: '₦38,000 each', q: 2 },
                    { n: 'Bio Pure N200', p: '₦560,000 each', q: 1 },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, background: '#FFFFFF', borderRadius: 8, padding: '9px 14px', marginBottom: 8, height: 62 }}>
                            <Box style={{ width: 40, height: 40, borderRadius: 6, background: 'rgba(42,167,207,0.16)', justifyContent: 'center', alignItems: 'center' }}>
                                <FAIcon name='flask' style={{ fill: '#2AA7CF', width: 18, height: 18 }} />
                            </Box>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259' }}>{it.n}</Text>
                                <Text style={{ fontSize: 14, color: '#5C646A' }}>{it.p}</Text>
                            </Box>
                            <Box style={{ flexDirection: 'row', alignItems: 'center', border: '1px solid #D1D8DE', borderRadius: 6, overflow: 'hidden' }}>
                                <Box style={{ width: 26, height: 26, justifyContent: 'center', alignItems: 'center', background: '#F4F6F8' }}>
                                    <Text style={{ fontSize: 15, color: '#202259', fontWeight: 'bold' }}>−</Text>
                                </Box>
                                <Box style={{ width: 32, height: 26, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#202259' }}>{it.q}</Text>
                                </Box>
                                <Box style={{ width: 26, height: 26, justifyContent: 'center', alignItems: 'center', background: '#F4F6F8' }}>
                                    <Text style={{ fontSize: 15, color: '#202259', fontWeight: 'bold' }}>+</Text>
                                </Box>
                            </Box>
                            <Text style={{ fontSize: 15, color: '#B3261E', width: 66, textAlign: 'right' }}>Remove</Text>
                        </Box>
                    );
                })}
            </Box>

            {/* 右：订单汇总 */}
            <Box style={{ width: 300, background: '#FFFFFF', borderRadius: 8, padding: '16px 18px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5C646A', letterSpacing: 1.2, marginBottom: 12 }}>SUMMARY</Text>
                {[
                    { k: 'Items', v: '6' },
                    { k: 'Subtotal', v: '₦792,000' },
                    { k: 'Shipping', v: 'Calculated at checkout' },
                ].map(function (r, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                            <Text style={{ fontSize: 16, color: '#5C646A' }}>{r.k}</Text>
                            <Text style={{ fontSize: 16, color: '#25292C', fontWeight: i === 2 ? 'normal' : 'bold' }}>{r.v}</Text>
                        </Box>
                    );
                })}
                <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #E3E6E8' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259' }}>Total</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>₦792,000</Text>
                </Box>
                <Box style={{ marginTop: 'auto', paddingTop: 14 }}>
                    <Box style={{ height: 40, background: '#202259', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Proceed to checkout</Text>
                    </Box>
                </Box>
            </Box>
        </Box>

        {/* 下方：三张说明卡 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                { icon: 'plus-circle', t: '加购规则', d: '按商品 ID 合并 —— 同一件商品重复加购只增加数量，不会新增一行。单个商品数量封顶 99，加购后右上角购物车角标实时刷新。' },
                { icon: 'edit', t: '数量与删除', d: '加减按钮和直接输入框都能改数量，范围锁在 1 到 99。Remove 删单条，Clear cart 一次清空；购物车为空时显示空态卡与 Browse products 按钮。' },
                { icon: 'calculator', t: '汇总口径', d: '只算四行：件数、商品小计、运费、总计。运费固定显示 Calculated at checkout，页面不做任何实际运费计算，总计等于小计。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 10, padding: '18px 18px', flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <FAIcon name={it.icon} style={{ fill: '#2AA7CF', width: 22, height: 22 }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.55 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>07 / 25</Text>
    </Box>
</Slide>
