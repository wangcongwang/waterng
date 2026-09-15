<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>三条路径的落点对比</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            这是全场最该带走的一张表 —— 差别最终都收敛到"这笔单算不算账户资产"
        </Text>
    </Box>

    {/* ===== B 区（图表 + 洞察） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 14 }}>
        {/* 主表 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
            {/* 表头 */}
            <Box style={{ flexDirection: 'row', gap: 4, height: 44 }}>
                <Box style={{ width: 200, justifyContent: 'center', paddingLeft: 16 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5C646A' }}>对比维度</Text>
                </Box>
                {[
                    { t: '路径一 · 访客下单', c: '#202259' },
                    { t: '路径二 · 注册购买', c: '#2AA7CF' },
                    { t: '路径三 · 已有账户', c: '#F287B7' },
                ].map(function (h, i) {
                    return (
                        <Box key={i} style={{ width: 316, background: h.c, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' }}>{h.t}</Text>
                        </Box>
                    );
                })}
            </Box>

            {[
                {
                    k: '订单能在账户里看到吗',
                    v: [
                        { t: '看不到，而且会被剔除删除', warn: true },
                        { t: '看得到 · My orders', warn: false },
                        { t: '看得到 · My orders', warn: false },
                    ],
                },
                {
                    k: '计入自己的奖金吗',
                    v: [
                        { t: '不计入，一分都不算', warn: true },
                        { t: '计入（自购 BV）', warn: false },
                        { t: '计入（自购 BV）', warn: false },
                    ],
                },
                {
                    k: '这笔单的 BV 归谁',
                    v: [
                        { t: '分享链接的持有者', warn: false },
                        { t: '自己', warn: false },
                        { t: '自己', warn: false },
                    ],
                },
                {
                    k: '订单类型标签',
                    v: [{ t: '—（不展示）', warn: false }, { t: 'My order', warn: false }, { t: 'My order', warn: false }],
                },
                {
                    k: '付款状态显示',
                    v: [
                        { t: '—（不展示）', warn: false },
                        { t: 'Unpaid（字段缺失导致）', warn: true },
                        { t: '显示真实状态', warn: false },
                    ],
                },
                {
                    k: '凭订单号能查到吗',
                    v: [
                        { t: '能，限本机浏览器', warn: false },
                        { t: '能', warn: false },
                        { t: '能', warn: false },
                    ],
                },
            ].map(function (row, i) {
                return (
                    <Box key={i} style={{ flexDirection: 'row', gap: 4, flex: 1 }}>
                        <Box style={{ width: 200, background: '#F4F6F8', borderRadius: 8, padding: '0 16px', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{row.k}</Text>
                        </Box>
                        {row.v.map(function (cell, j) {
                            return (
                                <Box key={j} style={{ width: 316, background: cell.warn ? 'rgba(242,135,183,0.14)' : '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 8, padding: '0 16px', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: cell.warn ? '#B3528A' : '#3F4A55', lineHeight: 1.35 }}>{cell.t}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                );
            })}
        </Box>

        {/* 洞察框 */}
        <Box style={{ height: 82, background: '#202259', borderRadius: 10, padding: '0 24px', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <FAIcon name='lightbulb' style={{ fill: '#7FD3EC', width: 28, height: 28 }} />
            <Text style={{ fontSize: 19, color: '#FFFFFF', lineHeight: 1.45, flex: 1 }}>
                三条路径的差别，收敛成一句话：<span style={{ color: '#7FD3EC', fontWeight: 'bold' }}>只有下单时带着会员身份，这笔单才会变成账户资产</span>。访客单更像一张一次性凭证 —— 能查、能分享，但不进账。
            </Text>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>18 / 31</Text>
    </Box>
</Slide>
