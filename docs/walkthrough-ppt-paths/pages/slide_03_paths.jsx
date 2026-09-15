<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>三条路径，差在四个地方</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            入口、订单归属、订单状态、账户落点 —— 记住这四行，后面每一章都在展开它们
        </Text>
    </Box>

    {/* ===== B 区 ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左侧对比表 */}
        <Box style={{ width: 756, flexDirection: 'column' }}>
            {/* 表头 */}
            <Box style={{ flexDirection: 'row', gap: 6, marginBottom: 6 }}>
                <Box style={{ width: 148, height: 50, justifyContent: 'center', paddingLeft: 12 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5C646A' }}>对比维度</Text>
                </Box>
                {[
                    { t: '路径一 · 访客', c: '#202259' },
                    { t: '路径二 · 注册', c: '#2AA7CF' },
                    { t: '路径三 · 已有账户', c: '#F287B7' },
                ].map(function (h, i) {
                    return (
                        <Box key={i} style={{ width: 198, height: 50, background: h.c, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' }}>{h.t}</Text>
                        </Box>
                    );
                })}
            </Box>

            {[
                {
                    k: '入口',
                    v: ['无需登录，直接进商品页或结算页', '注册表单内含选品与支付', '先登录，再进商品页'],
                },
                {
                    k: '下单时的会员字段',
                    v: ['memberId 与 operatorId 都是 null', 'memberId 用新生成的会员 ID', '两个字段都是自己的会员 ID'],
                },
                {
                    k: '订单状态',
                    v: ['pending / Unpaid', 'completed（无 payStatus 字段）', 'pending；余额支付则 Paid'],
                },
                {
                    k: '账户里能看到吗',
                    v: ['看不到，且会被剔除删除', '看得到 · My orders', '看得到 · My orders'],
                },
                {
                    k: '这笔单的奖金归谁',
                    v: ['自己 0 BV，全额给分享链接的人', '计入自己的奖金（自购 BV）', '计入自己的奖金（自购 BV）'],
                },
            ].map(function (row, i) {
                return (
                    <Box key={i} style={{ flexDirection: 'row', gap: 6, flex: 1, marginBottom: i === 4 ? 0 : 6 }}>
                        <Box style={{ width: 148, background: '#F4F6F8', borderRadius: 8, padding: '10px 12px', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', lineHeight: 1.35 }}>{row.k}</Text>
                        </Box>
                        {row.v.map(function (cell, j) {
                            var colors = ['#202259', '#2AA7CF', '#F287B7'];
                            var isWarn = i === 3 && j === 0;
                            return (
                                <Box key={j} style={{ width: 198, background: isWarn ? 'rgba(242,135,183,0.14)' : '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 8, padding: '10px 12px', justifyContent: 'center' }}>
                                    <Box style={{ width: 18, height: 3, background: colors[j], marginBottom: 7 }} />
                                    <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.45 }}>{cell}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                );
            })}
        </Box>

        {/* 右侧洞察 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '20px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 1.8, fontWeight: 'bold' }}>ONE LINE</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.35, marginTop: 10 }}>
                    差别只有一个：下单那一刻，有没有会员身份。
                </Text>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '18px 20px', flexDirection: 'column', gap: 12 }}>
                <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                    <FAIcon name='check-circle' style={{ fill: '#2AA7CF', width: 20, height: 20, marginTop: 2 }} />
                    <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55, flex: 1 }}>
                        <span style={{ fontWeight: 'bold', color: '#202259' }}>有身份</span>：订单落进账户，订单的 BV 计入自己的奖金。
                    </Text>
                </Box>
                <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                    <FAIcon name='times-circle' style={{ fill: '#F287B7', width: 20, height: 20, marginTop: 2 }} />
                    <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55, flex: 1 }}>
                        <span style={{ fontWeight: 'bold', color: '#202259' }}>没身份</span>：订单还能查，但进不了账户，BV 全额流向分享链接的人。
                    </Text>
                </Box>
                <Box style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                    <FAIcon name='info-circle' style={{ fill: '#859EB3', width: 20, height: 20, marginTop: 2 }} />
                    <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55, flex: 1 }}>
                        路径二和路径三在账户里的结果几乎一样，区别只在订单字段的形态 —— 第 14 页会具体讲。
                    </Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>03 / 31</Text>
    </Box>
</Slide>
