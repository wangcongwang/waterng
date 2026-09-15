<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>前提：这是一个纯前端系统</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            三条路径的差异，全部由浏览器本地的几个存储键决定
        </Text>
    </Box>

    {/* ===== B 区 ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：架构结论 */}
        <Box style={{ width: 620, flexDirection: 'column', gap: 16 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '24px 26px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>ARCHITECTURE</Text>
                <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
                    <Text style={{ fontSize: 72, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1, letterSpacing: -3, fontFamily: 'Menlo, ui-monospace, monospace' }}>0</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#7FD3EC' }}>后端</Text>
                </Box>
                <Text style={{ fontSize: 17, color: '#B9C6E4', lineHeight: 1.55, marginTop: 14 }}>
                    没有服务端、没有数据库、没有接口调用。订单、会员档案、奖金流水全部写在浏览器的 localStorage 里。这决定了三件事：数据不跨设备、访客订单无法被"认领"、以及下面这个演示陷阱。
                </Text>
            </Box>

            <Box style={{ background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '18px 20px', flexDirection: 'column', flex: 1 }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <FAIcon name='exclamation-triangle' style={{ fill: '#B3528A', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#7A2F5C' }}>演示前必须知道</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.6 }}>
                    全新浏览器第一次打开站点时，系统会自动种入一个"已登录"的演示账户和一张示例订单。也就是说，你直接打开结算页，其实已经是登录状态。
                </Text>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.6, marginTop: 10 }}>
                    要演示真正的"访客下单"，必须先点一次 <span style={{ fontWeight: 'bold' }}>Sign out</span>。另外，登出只清登录态，个人资料和地址仍留在本地 —— 下单表单会被预填，这是个已知现象。
                </Text>
            </Box>
        </Box>

        {/* 右：六个键 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 12 }}>
                六个存储键，分成三个桶
            </Text>
            <Box style={{ flex: 1, flexDirection: 'column', gap: 9 }}>
                {[
                    { k: 'al.auth.user', b: '身份', d: '登录态。访客时不存在', c: '#202259' },
                    { k: 'al.memberData', b: '身份', d: '会员主档：等级、推荐人、报单中心', c: '#202259' },
                    { k: 'al.orders', b: '交易', d: '订单数组。访客单也混在里面，只是归属字段为空', c: '#2AA7CF' },
                    { k: 'al.cart', b: '交易', d: '购物车，注册时会先清空再写入所选商品', c: '#2AA7CF' },
                    { k: 'al.bvCredits', b: '资金', d: 'BV 奖金台账，推荐返佣记在这里', c: '#F287B7' },
                    { k: 'al.ecoin', b: '资金', d: 'Ecoin 台账，充值、转账、抵扣都走它', c: '#F287B7' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, background: '#F4F6F8', borderRadius: 8, padding: '0 14px', borderLeft: '4px solid ' + it.c }}>
                            <Box style={{ flexDirection: 'column', width: 156 }}>
                                <Text style={{ fontSize: 15, color: '#202259', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.k}</Text>
                            </Box>
                            <Box style={{ padding: '2px 9px', background: it.c, borderRadius: 4 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>{it.b}</Text>
                            </Box>
                            <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.d}</Text>
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>04 / 31</Text>
    </Box>
</Slide>
