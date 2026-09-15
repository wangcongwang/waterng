<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>注册订单在账户里的样子</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            看得到，但它和结算页下的单不是同一套字段形态 —— 这会带来两处可见后果
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：结论与后果 */}
        <Box style={{ width: 400, background: '#202259', borderRadius: 10, padding: '24px 22px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 1.8, fontWeight: 'bold' }}>SAME RESULT</Text>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.25, marginTop: 10 }}>
                账户里看得见
                <br />
                字段形态不一样
            </Text>
            <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.55, marginTop: 14 }}>
                注册路径的订单和结算路径的订单，是两段独立代码各自拼出来的。它们都会落进同一个订单数组，但字段名和写法不同。
            </Text>

            <Box style={{ marginTop: 18, flexDirection: 'column', gap: 10 }}>
                {[
                    { t: '地址列显示 No address provided', d: '因为账户页读的是嵌套对象里的地址字段，而注册单把地址平铺存了。' },
                    { t: '付款状态显示 Unpaid', d: '注册单的状态是 completed，不匹配已支付或待支付两个判断，最终落到默认的未支付标签。' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ background: 'rgba(242,135,183,0.18)', borderRadius: 8, padding: '12px 14px', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FBE0EE' }}>{it.t}</Text>
                            <Text style={{ fontSize: 15, color: '#E3C7D8', lineHeight: 1.45, marginTop: 4 }}>{it.d}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Text style={{ fontSize: 15, color: '#859EB3', lineHeight: 1.5, marginTop: 'auto', paddingTop: 14 }}>
                这两处都不是数据错误 —— 是两段代码没有对齐字段约定。
            </Text>
        </Box>

        {/* 右：差异对照表 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Box style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                <Box style={{ width: 158, height: 44, justifyContent: 'center', paddingLeft: 14 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5C646A' }}>字段</Text>
                </Box>
                <Box style={{ width: 262, height: 44, background: '#2AA7CF', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>注册路径下的单</Text>
                </Box>
                <Box style={{ flex: 1, height: 44, background: '#202259', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>结算页下的单</Text>
                </Box>
            </Box>

            <Box style={{ flex: 1, flexDirection: 'column', gap: 6 }}>
                {[
                    { k: '归属字段', a: '只有权益归属人，没有实际操作人', b: '两个字段都有，都是本人 ID' },
                    { k: '订单状态', a: 'completed', b: 'pending' },
                    { k: '支付状态', a: '没有这个字段', b: 'Unpaid（余额支付则 Paid）' },
                    { k: '日期类型', a: 'ISO 格式字符串', b: '时间戳数字' },
                    { k: '客户与配送', a: '平铺字段：详细地址、城市、区域', b: '嵌套对象：客户信息、配送信息' },
                    { k: '写入位置', a: '追加到订单数组末尾', b: '插到订单数组最前面' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
                            <Box style={{ width: 158, background: '#F4F6F8', borderRadius: 8, padding: '0 14px', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259' }}>{it.k}</Text>
                            </Box>
                            <Box style={{ width: 262, background: 'rgba(42,167,207,0.10)', borderRadius: 8, padding: '0 14px', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.35 }}>{it.a}</Text>
                            </Box>
                            <Box style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 8, padding: '0 14px', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.35 }}>{it.b}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>14 / 31</Text>
    </Box>
</Slide>
