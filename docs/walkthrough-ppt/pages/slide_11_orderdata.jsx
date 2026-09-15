<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>第 6 步：订单怎么落库</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            订单号六位随机、字符集刻意排除了易混淆字符
        </Text>
    </Box>

    {/* ===== B 区 内容区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左侧：字段分组 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>
                一个订单对象存六组字段
            </Text>
            <Box style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {[
                    { g: '基本信息', f: 'id · date · country · currency', d: '国家与币种固定为 Nigeria / NGN' },
                    { g: '商品明细', f: 'items[] · qty · price · bv', d: '每行带图片路径与类别' },
                    { g: '权益归属', f: 'memberId · operatorId', d: '前者是权益归属人，后者是实际操作账号' },
                    { g: '客户与配送', f: 'customer{} · delivery{}', d: '配送方式与所选自提点写在这里' },
                    { g: '支付与状态', f: 'payment · payStatus · status', d: '创建时 status 一律为 pending' },
                    { g: '业务来源', f: 'source · reportingCenterId', d: '标记是复购还是自动维护订单' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ width: 282, background: i === 2 ? 'rgba(242,135,183,0.12)' : '#F4F6F8', border: i === 2 ? '1px solid #F287B7' : '1px solid #E3E6E8', borderRadius: 10, padding: '14px 16px', flexDirection: 'column', minHeight: 172 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>{it.g}</Text>
                            <Text style={{ fontSize: 15, color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace', marginTop: 8, lineHeight: 1.4 }}>{it.f}</Text>
                            <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.45, marginTop: 'auto' }}>{it.d}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>

        {/* 右侧：订单号 + 状态 */}
        <Box style={{ width: 396, flexDirection: 'column', gap: 12 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>ORDER ID</Text>
                <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10, fontFamily: 'Menlo, ui-monospace, monospace', letterSpacing: -1 }}>
                    AQ-7K2MNP
                </Text>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.5, marginTop: 12 }}>
                    固定 AQ- 前缀 + 6 位随机字符。字符集是
                    <span style={{ color: '#7FD3EC', fontFamily: 'Menlo, ui-monospace, monospace' }}> A–Z 加 2–9 </span>
                    ，刻意去掉了 I、O、0、1 四个易混字符。
                </Text>
                <Text style={{ fontSize: 15, color: '#7FD3EC', lineHeight: 1.45, marginTop: 10 }}>
                    它同时也是 shipping.html 与 order.html 的 URL 参数。
                </Text>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>状态取值怎么显示</Text>
                {[
                    { s: 'Paid', d: '余额支付成功时立即写入', c: '#1F6B3F' },
                    { s: 'Pending', d: '订单创建后的初始展示态', c: '#8A6D1F' },
                    { s: 'Unpaid', d: '其余四种支付方式的初始状态', c: '#5C646A' },
                    { s: 'Failed', d: '匹配到 fail / refund / cancel 时', c: '#B3261E' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 10, marginBottom: i === 3 ? 0 : 10, borderBottom: i === 3 ? 'none' : '1px solid #E3E6E8' }}>
                            <Box style={{ width: 84, height: 26, borderRadius: 999, background: '#FFFFFF', border: '1px solid ' + it.c, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: it.c, fontWeight: 'bold' }}>{it.s}</Text>
                            </Box>
                            <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1, lineHeight: 1.4 }}>{it.d}</Text>
                        </Box>
                    );
                })}
                <Box style={{ marginTop: 'auto', flexDirection: 'row', gap: 10, alignItems: 'center', paddingTop: 12, borderTop: '1px solid #E3E6E8' }}>
                    <FAIcon name='info-circle' style={{ fill: '#859EB3', width: 18, height: 18 }} />
                    <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.4 }}>
                        status 字段本身创建后不再变化，页面上显示的是它的全大写形式。
                    </Text>
                </Box>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>11 / 25</Text>
    </Box>
</Slide>
