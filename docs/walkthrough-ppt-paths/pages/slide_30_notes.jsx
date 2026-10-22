<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>讲解注意：需要对齐的十点</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            这十条不是挑毛病，是提前统一对外口径 —— 建议逐条念一遍
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：为什么 */}
        <Box style={{ width: 392, background: '#202259', borderRadius: 10, padding: '24px 22px', flexDirection: 'column' }}>
            <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>ALIGN FIRST</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.22, marginTop: 12 }}>
                先说边界
                <br />
                再谈排期
            </Text>
            <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.6, marginTop: 16 }}>
                负责人最容易把界面上的文案当成已实现能力。下面十条要么是"文案有、按钮没接"，要么是两处口径不一致 —— 提前讲，后面就不会有落差。
            </Text>

            <Box style={{ background: 'rgba(242,135,183,0.18)', borderRadius: 8, padding: '13px 15px', marginTop: 20 }}>
                <Text style={{ fontSize: 16, color: '#FBE0EE', lineHeight: 1.5 }}>
                    建议统一一句对外说法：当前是演示版本，以下能力待排期。
                </Text>
            </Box>

            <Box style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(127,211,236,0.3)' }}>
                <Text style={{ fontSize: 15, color: '#859EB3', lineHeight: 1.5 }}>
                    其中第 1、3、6 条最容易被追问，建议优先准备。
                </Text>
            </Box>
        </Box>

        {/* 右：十条 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 5 }}>
            {[
                { t: '访客订单不入账户资产', d: '进账户页时会被剔除删除，且目前没有访客订单认领机制', c: '#F287B7' },
                { t: '访客订单的推荐人字段会丢失', d: '写库发生在赋值之前，落地页那行 BV credited to 不显示', c: '#F287B7' },
                { t: '推荐人默认值写死', d: '没带推荐链接的注册，都会给 NG000000001 记一笔推荐 BV', c: '#F287B7' },
                { t: '注册订单的字段形态不一致', d: '地址列显示未提供地址，付款状态落到未支付标签', c: '#202259' },
                { t: '两条路径的写入位置不同', d: '注册追加到数组末尾，结算插到最前面，列表顺序因此不同', c: '#202259' },
                { t: '结算摘要不含运费与税费', d: '总计等于商品小计；7.5% 税率只在订单展示环节出现', c: '#202259' },
                { t: 'USSD 码写死', d: '固定显示，不随订单金额变化', c: '#202259' },
                { t: '详情页 BV 徽标口径不同', d: '无条件显示，且用价格现算，与列表页读字段的口径不一致', c: '#202259' },
                { t: '若干交互未接逻辑', d: '记住我、忘记密码、落地页的进入我的账户按钮', c: '#859EB3' },
                { t: '三个功能尚未实现', d: '取消订单、物流追踪、催发货；九类奖金无比例无条件', c: '#859EB3' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, background: '#F4F6F8', borderRadius: 8, padding: '0 16px', borderLeft: '4px solid ' + it.c }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace', width: 22 }}>{String(i + 1).padStart(2, '0')}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#202259', width: 224, lineHeight: 1.25 }}>{it.t}</Text>
                        <Text style={{ fontSize: 14, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>30 / 31</Text>
    </Box>
</Slide>
