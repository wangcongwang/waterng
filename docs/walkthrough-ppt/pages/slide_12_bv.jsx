<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>BV 归谁：一条容易讲错的规则</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            这是下单流程里唯一的"推荐优惠"，而它给的不是折扣，是 BV 归属
        </Text>
    </Box>

    {/* ===== B 区 内容区（巨型数字 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 22 }}>
        {/* 巨型数字区 */}
        <Box style={{ height: 234, flexDirection: 'row', gap: 26 }}>
            <Box style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 22, background: 'rgba(242,135,183,0.12)', borderLeft: '6px solid #F287B7', borderRadius: 10, padding: '22px 26px' }}>
                <Text style={{ fontSize: 96, fontWeight: 'bold', color: '#F287B7', lineHeight: 1, letterSpacing: -4 }}>100%</Text>
                <Box style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>BV 全部上浮给推荐人</Text>
                    <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, marginTop: 8 }}>
                        被推荐人自己下单不留 BV，分享链接的会员全额拿到这笔 BV。这不是折扣，而是业绩归属。
                    </Text>
                </Box>
            </Box>

            <Box style={{ width: 330, background: '#202259', borderRadius: 10, padding: '22px 24px', flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>CONVERSION</Text>
                <Text style={{ fontSize: 46, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8, lineHeight: 1.1 }}>
                    1 BV
                    <br />
                    <span style={{ fontSize: 26, color: '#7FD3EC' }}>每 ₦1,000</span>
                </Text>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.5, marginTop: 12 }}>
                    按商品价格每满 ₦1,000 记 1 BV，向下取整，再乘以数量。
                </Text>
            </Box>
        </Box>

        {/* 归因流程 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>
                三个条件同时成立，才会把 BV 记到推荐人台账
            </Text>
            <Box style={{ flex: 1, flexDirection: 'row', gap: 14 }}>
                {[
                    { n: '1', t: '存在推荐人', d: '推荐关系来自访客点过的 ?ref=NG######## 链接。全站首次捕获，之后不再覆盖 —— 即首次点击归因。', c: '#2AA7CF' },
                    { n: '2', t: '推荐人不是自己', d: '代码里显式做了防自荐判断：ref.id 等于下单人 memberId 时直接跳过，不记账。', c: '#202259' },
                    { n: '3', t: '订单 BV 大于 0', d: '订单本身要有 BV 才谈得上归属，金额不足 ₦1,000 的订单不产生 BV。', c: '#F287B7' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '18px 18px', flexDirection: 'column' }}>
                            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                <Box style={{ width: 34, height: 34, borderRadius: 17, background: it.c, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                                </Box>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                            </Box>
                            <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5 }}>{it.d}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ flexDirection: 'row', gap: 14, marginTop: 14, alignItems: 'center', padding: '14px 18px', background: 'rgba(32,34,89,0.06)', borderRadius: 8 }}>
                <FAIcon name='check-circle' style={{ fill: '#202259', width: 22, height: 22 }} />
                <Text style={{ fontSize: 17, color: '#202259', lineHeight: 1.45 }}>
                    三个条件都成立时：订单上会多挂一个 referrerId 字段，同时往 <span style={{ fontFamily: 'Menlo, ui-monospace, monospace' }}>al.bvCredits</span> 写一条返佣流水，下单落地页会显示
                    <span style={{ fontWeight: 'bold' }}> BV credited to NG…</span>。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>12 / 25</Text>
    </Box>
</Slide>
