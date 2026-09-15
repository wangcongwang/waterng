<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>第 5 步：订单摘要与下单按钮</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            摘要区一共只有五行，按钮放行要同时满足四类条件
        </Text>
    </Box>

    {/* ===== B 区 内容区（左摘要 + 右条件） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左侧：摘要结构 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>摘要区逐行拆解</Text>

            <Box style={{ flexDirection: 'column', gap: 9, flex: 1 }}>
                {[
                    { k: '商品行', d: '商品图 + 名称 + 单价 + 数量。单品直购模式下数量控件可改；购物车模式下显示静态 Qty n。', tag: '每件商品一行' },
                    { k: 'Edit quantities in cart', d: '当结算商品多于一件时出现，点击回到 cart.html 改数量。', tag: '条件显示' },
                    { k: 'BV rewards +N BV', d: '仅登录用户可见。按每件商品价格每满 ₦1,000 记 1 BV 折算，向下取整后乘以数量。', tag: '仅登录可见' },
                    { k: 'Method', d: '随所选支付方式实时更新，显示 Card / USSD / Bank transfer 等标签。', tag: '实时联动' },
                    { k: 'Total 与 Place order', d: '总计等于商品小计，下方一行是 VISA / MC / VERVE / USSD / COD 品牌标和条款说明。', tag: '底部锚定' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: i === 2 ? 'rgba(42,167,207,0.10)' : '#F4F6F8', borderRadius: 8, padding: '0 16px' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', width: 210 }}>{it.k}</Text>
                            <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.45, flex: 1 }}>{it.d}</Text>
                            <Box style={{ padding: '3px 10px', background: '#FFFFFF', borderRadius: 4, border: '1px solid #E3E6E8' }}>
                                <Text style={{ fontSize: 13, color: '#5C646A' }}>{it.tag}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右侧：放行条件 */}
        <Box style={{ width: 392, background: '#202259', borderRadius: 10, padding: '19px 20px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>GATE</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, lineHeight: 1.3 }}>
                按钮放行
                <br />
                要同时满足四类条件
            </Text>

            <Box style={{ flexDirection: 'column', gap: 12, marginTop: 20 }}>
                {[
                    { n: '1', t: '两类同意勾选', d: '确认电话与邮箱正确，以及已阅读服务条款与退款政策。' },
                    { n: '2', t: '配送信息完整', d: '配送模式要填完地址与联系人；自提模式免填地址，但必须选中一个网点。' },
                    { n: '3', t: '邮箱格式合法', d: '不合法时邮箱下方会直接给出 Please enter a valid email address。' },
                    { n: '4', t: '支付方式自身校验', d: '银行卡走格式校验；余额支付要求余额充足，余额不足会出警告。' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                            <Box style={{ width: 24, height: 24, borderRadius: 12, background: '#2AA7CF', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                            </Box>
                            <Box style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{it.t}</Text>
                                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.45, marginTop: 3 }}>{it.d}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.5 }}>
                    任何一项不满足，Place order 保持置灰无响应 —— 现场演示时记得先把同意项勾上。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>10 / 25</Text>
    </Box>
</Slide>
