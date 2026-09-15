<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>九类奖金与资金闭环</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            九类名称齐全，但它们是展示字段；钱怎么在两本账之间流动才是可讲的部分
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：九类奖金 */}
        <Box style={{ width: 520, flexDirection: 'column', gap: 12 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>往期奖金里的九类名称</Text>

            <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {[
                    'Elite Bonus', 'Pro Elite Bonus', 'Super Elite Bonus',
                    'Stockist Bonus', 'LeaderShip Bonus', 'Welcome Bonus',
                    'Car Bonus', 'Performance Bonus', 'Builder Bonus',
                ].map(function (t, i) {
                    return (
                        <Box key={i} style={{ width: 160, height: 62, background: '#F4F6F8', borderRadius: 8, padding: '0 12px', justifyContent: 'center', borderLeft: '4px solid #2AA7CF' }}>
                            <Text style={{ fontSize: 13, color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace' }}>{String(i + 1).padStart(2, '0')}</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#202259', lineHeight: 1.25, marginTop: 2 }}>{t}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ flex: 1, background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '14px 16px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#7A2F5C', marginBottom: 8 }}>必须说清的一句</Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.55 }}>
                    这九类名称目前是展示型字段。页面上没有任何佣金比例、没有计算公式、也没有晋升条件。周期表里的数字全部来自演示数据，不是真实业务结果。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.55, marginTop: 8 }}>
                    对外统一口径建议：奖金规则由注册你的经销商线下完整说明，我们不在页面上公布任何数字承诺。
                </Text>
            </Box>
        </Box>

        {/* 右：资金闭环 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>资金闭环的四条路径</Text>

            {[
                { n: '1', t: '充值进 Bonus', d: '表单四项：金额（步进器，最小 1）、类型（目前只有现金）、支付日期、备注。提交后金额同时写进 BV 流水。', c: '#202259' },
                { n: '2', t: 'Bonus 转 Ecoin', d: '转账类型之一。可用余额取 BV 台账最后一条记录的期末余额，不足会被拦住。', c: '#2AA7CF' },
                { n: '3', t: 'Ecoin 转给其他会员', d: '另一种转账类型。按会员编码定向转出，编码必须符合会员 ID 格式，提交后两边台账各写一条流水。', c: '#2AA7CF' },
                { n: '4', t: 'Ecoin 抵扣订单', d: '就是结算页的余额支付 —— 三条路径里唯一被登录态卡住的支付方式，下单当场扣减并置为已支付。', c: '#F287B7' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16, background: '#F4F6F8', borderRadius: 8, padding: '0 18px', borderLeft: '5px solid ' + it.c }}>
                        <Box style={{ width: 34, height: 34, borderRadius: 17, background: it.c, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                        </Box>
                        <Box style={{ flexDirection: 'column', width: 168 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259', lineHeight: 1.25 }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.45 }}>{it.d}</Text>
                    </Box>
                );
            })}

            <Box style={{ background: '#202259', borderRadius: 8, padding: '13px 16px' }}>
                <Text style={{ fontSize: 15, color: '#D6E2F5', lineHeight: 1.5 }}>
                    每一次充值、转账都会在两本台账各自留下带时间、金额与备注的流水 —— 账户页的 View History 就是把它们渲染成表格。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>28 / 31</Text>
    </Box>
</Slide>
